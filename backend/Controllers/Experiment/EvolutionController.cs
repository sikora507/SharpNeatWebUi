using System.Reflection;
using System.Text.Json;
using backend.Hubs;
using Dawn;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using SharpNeat.EvolutionAlgorithm.Runner;
using SharpNeat.Experiments;
using SharpNeat.Neat;
using SharpNeat.Neat.EvolutionAlgorithm;
using SharpNeat.Neat.Genome;

namespace backend.Controllers.Experiments
{
    [ApiController]
    [Route("experiment")]
    public class EvolutionController : Controller
    {
        private readonly IHubContext<ExperimentStatusHub> _hubcontext;
        private static NeatPopulation<double> _neatPop;
        private static EvolutionAlgorithmRunner _eaRunner;
        private static string _experimentId;
        private static object _lock = new Object();

        public EvolutionController(IHubContext<ExperimentStatusHub> hubcontext)
        {
            _hubcontext = hubcontext;
        }

        [HttpPost("create-random-population")]
        public IActionResult CreateRandomPotulation([FromBody] ExperimentConfig config)
        {
            lock (_lock)
            {
                if (_eaRunner != null)
                    Guard.Argument(_eaRunner.RunState).Equals(RunState.Ready);
                
                var neatExperiment = CreateAndConfigureExperiment(config);
                _experimentId = config.Id;
                MetaNeatGenome<double> metaNeatGenome = NeatUtils.CreateMetaNeatGenome(neatExperiment);

                // Create an initial population of genomes.
                _neatPop = NeatPopulationFactory<double>.CreatePopulation(
                    metaNeatGenome,
                    connectionsProportion: neatExperiment.InitialInterconnectionsProportion,
                    popSize: neatExperiment.PopulationSize);

                // Create evolution algorithm and runner.
                NeatEvolutionAlgorithm<double> ea = NeatUtils.CreateNeatEvolutionAlgorithm(neatExperiment, _neatPop);
                ea.Initialise();

                _eaRunner = new EvolutionAlgorithmRunner(ea, UpdateScheme.CreateTimeSpanUpdateScheme(TimeSpan.FromSeconds(1)));

                // Attach event listeners.
                _eaRunner.UpdateEvent += UpdateHubContext;

                return Ok();
            }
        }

        [HttpPost("start")]
        public IActionResult Start()
        {
            lock (_lock)
            {
                Guard.Argument(_eaRunner).NotNull();
                Guard.Argument(_eaRunner.RunState).In(new[] { RunState.Ready, RunState.Paused });

                _eaRunner.StartOrResume();

                return Ok();
            }
        }

        [HttpPost("stop")]
        public IActionResult Stop()
        {
            lock (_lock)
            {
                Guard.Argument(_eaRunner.RunState).Equals(RunState.Running);
                Guard.Argument(_eaRunner).NotNull();

                _eaRunner.RequestPauseAndWait();

                return Ok();
            }
        }

        [HttpPost("reset")]
        public IActionResult Reset()
        {
            lock (_lock)
            {
                if (_eaRunner is not null)
                {
                    // Note. Dispose here will wait for the termination of the background thread use to run the EA.
                    _eaRunner.Dispose();
                    _eaRunner = null;
                }
                _neatPop = null;
                _experimentId = null;
                // Take the opportunity to clean-up the heap.
                GC.Collect(GC.MaxGeneration, GCCollectionMode.Forced, true, true);
                return Ok();
            }
        }

        [HttpGet("status")]
        public IActionResult Status()
        {
            if (_eaRunner == null)
            {
                return Ok(new StatusResponse
                {
                    State = "No experiment loaded",
                    PopulationCount = 0,
                    ExperimentId = _experimentId
                });
            }
            return Ok(new StatusResponse
            {
                State = _eaRunner.RunState.ToString(),
                PopulationCount = _neatPop.PopulationSize,
                ExperimentId = _experimentId
            });
        }

        private record StatusResponse
        {
            public string State { get; init; }
            public int PopulationCount { get; init; }
            public string ExperimentId { get; init; }
        }

        private void UpdateHubContext(object? sender, EventArgs e)
        {
            _hubcontext.Clients.All.SendAsync("UpdateEvent", new { _eaRunner.EA.Stats, _neatPop.NeatPopulationStats, bestGenome = _neatPop.BestGenome.ConnectionGenes.GetConnectionInfo() });
        }

        private INeatExperiment<double>? CreateAndConfigureExperiment(ExperimentConfig config)
        {
            var sharpNeatTasksAssemblyPath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "SharpNeat.Tasks.dll");
            var sampleAssembly = Assembly.LoadFrom(sharpNeatTasksAssemblyPath);
            var iNeatExperimentFactoryInterface = typeof(INeatExperimentFactory);
            var types = sampleAssembly.GetTypes()
                .Where(p => iNeatExperimentFactoryInterface.IsAssignableFrom(p) && !p.IsInterface);
            var factories = types.Select(t => Activator.CreateInstance(t) as INeatExperimentFactory).ToArray();
            var factory = factories.Single(x => x.Id == config.Id);

            var configJson = JsonDocument.Parse(JsonConvert.SerializeObject(config));

            var experiment = factory.CreateExperiment(configJson.RootElement);

            return experiment;
        }
    }
}