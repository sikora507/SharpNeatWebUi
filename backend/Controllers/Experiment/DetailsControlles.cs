using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backend.Controllers.Experiment
{
    [ApiController]
    [Route("experiment")]
    public class DetailsControlles : Controller
    {
        private readonly IHelpers _helpers;

        public DetailsControlles(IHelpers helpers)
        {
            _helpers = helpers;
        }

        [HttpGet("{experimentId}")]
        public IActionResult Details(string experimentId)
        {
            var rootPath = _helpers.GetRootPath();
            var descriptionPath = Path.Combine(rootPath, "config/experiments-descriptions", $"{experimentId}.txt");
            var configPath = Path.Combine(rootPath, "config/experiments-config", $"{experimentId}.config.json");

            var config = JsonConvert.DeserializeObject<ExperimentConfig>(System.IO.File.ReadAllText(configPath));
            var description = System.IO.File.ReadAllText(descriptionPath);
            if (config != null)
            {
                config.Id = experimentId;
                if (description != null)
                {
                    config.Description = description;
                }
                return Ok(config);
            }

            return NotFound();
        }
    }
}
