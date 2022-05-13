using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backend.Controllers.Experiments
{
    [ApiController]
    [Route("experiments")]
    public class GetController : Controller
    {
        private readonly IHelpers _helpers;

        public GetController(IHelpers helpers)
        {
            _helpers = helpers;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var rootPath = _helpers.GetRootPath();
            var configsPath = "config/experiments-config";
            var fullPach = Path.Combine(rootPath, configsPath);

            var files = Directory.GetFiles(fullPach, "*.json");

            var output = new List<ExperimentConfig>();

            foreach (var file in files)
            {
                var config = JsonConvert.DeserializeObject<ExperimentConfig>(System.IO.File.ReadAllText(file));
                if (config != null)
                {
                    config.Id = Path.GetFileName(file).Replace(".config.json", "");
                    output.Add(config);
                }
            }

            return Ok(output);
        }
    }
}
