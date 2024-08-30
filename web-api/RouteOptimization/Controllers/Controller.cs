using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Text.Json;
using Helpers;

namespace RouteOptimization.Controllers
{
    [ApiController]
    [Route("api/v1/optimize")]
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
            // Sample Request
            /*
            {
                "start": "ChIJF3pgadlsK4gRBnXyZHb5nl0",
                "end": "ChIJk-NCqEP0K4gRCfn0UOemHgU",
                "stops": ["ChIJC1RM_PfzK4gRkxu3l95jxhw", "ChIJOYamPgf0K4gRiTMYrYh0wv0", "ChIJgz9Ip9BsK4gRHe2bFMlC92Q"],
                "avoid": ["tolls", "highways"],
                "departureTime": "2024-07-29T04:35:11.751Z",
                "mode": "driving"
            }
            */

            // Generate route
            var helpers = new Optimizer(_settings.DistanceMatrixEndpoint, _settings.PlacesEndpoint, _settings.OutputFormat, _settings.ApiKey);
            var route = await helpers.GenerateRoute(request.Start, request.End, request.Stops, request.Avoid, request.DepartureTime, request.Mode);

            // Return the JSON response
            var response = new Response()
            {
                Stops = route.Stops.ToArray(),
                Time = route.Time,
                Distance = route.Distance
            };
            
            return Ok(response);
        }
    }

    public class Request
    {
        public string Start { get; set; } = String.Empty;
        public string End { get; set; } = String.Empty;
        public string[] Stops {  get; set; } = new string[0];

        public string[] Avoid { get; set; } = new string[0];
        public DateTime DepartureTime { get; set; } = DateTime.MinValue;
        public string Mode { get; set; } = String.Empty;
    }

    public class Response
    {
        public string[] Stops { get; set; } = new string[0];
        public double Time { get; set; } = 0;
        public double Distance { get; set; } = 0;
    }
}
