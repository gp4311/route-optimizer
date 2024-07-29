using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text.Json;
using Helpers;

namespace RouteOptimization.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Controller : ControllerBase
    {
        private readonly ApiSettings _settings;

        public Controller(IOptions<ApiSettings> settings)
        {
            _settings = settings.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Optimize([FromBody] Request request)
        {
            // Hard coded values for testing
            string start = "ChIJF3pgadlsK4gRBnXyZHb5nl0";
            string end = "ChIJk-NCqEP0K4gRCfn0UOemHgU";
            string[] stops = ["ChIJC1RM_PfzK4gRkxu3l95jxhw", "ChIJOYamPgf0K4gRiTMYrYh0wv0", "ChIJgz9Ip9BsK4gRHe2bFMlC92Q"];
            string[] avoid = ["tolls", "highways"]; // Options are tolls, highways, ferries
            DateTime departureTime = DateTime.Now;
            string mode = "driving"; // Options are driving, walking, bicycling

            // Generate route
            var helpers = new Optimizer(_settings.DistanceMatrixEndpoint, _settings.PlacesEndpoint, _settings.OutputFormat, _settings.ApiKey);
            var route = await helpers.GenerateRoute(start, end, stops, avoid, departureTime, mode);

            // Serialize the object to JSON
            var json = JsonSerializer.Serialize(route);

            // Return the JSON response
            return Content(json, "application/json");
        }
    }

    public class Request
    {
        public string Input { get; set; } = String.Empty;
    }
}
