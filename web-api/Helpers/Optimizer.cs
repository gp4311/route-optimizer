using Helpers.Google_Maps_API;

namespace Helpers
{
    public class Optimizer(string endpoint, string placesEndpoint, string outputFormat, string apiKey)
    {
        // Use the Branch and Bound Algorithm to solve the Travelling Salesman Problem
        public async Task<Route> GenerateRoute(string start, string end, string[] stops, string[] avoid, DateTime departureTime, string mode)
        {
            var apiService = new DistanceMatrixAPIService(endpoint, outputFormat, apiKey);
            var placesApiService = new PlacesAPIService(placesEndpoint, outputFormat, apiKey);
            var unvisited = new List<string>();
            var route = new Route();

            // Create a list of all unvisited and visited stops
            foreach (var stop in stops)
            {
                unvisited.Add(stop);
            }
            
            route.Stops.Add(start);

            while (unvisited.Count > 0)
            {
                // Get API Response
                var apiResponse = await apiService.GetData(new[] { route.Stops.Last() }, unvisited.ToArray(), avoid, departureTime, mode);

                // Iterate through each element to find shortest distance
                int indexOfMin = 0;
                double minDistance = double.MaxValue;
                double minDuration = 0;

                for (int i = 0; i < apiResponse.Rows[0].Elements.Count; i++)
                {
                    double distance = apiResponse.Rows[0].Elements[i].Distance.Value;
                    double duration = apiResponse.Rows[0].Elements[i].Duration.Value;

                    if (distance < minDistance)
                    {
                        minDistance = distance;
                        minDuration = duration;
                        indexOfMin = i;
                    }
                }

                // Add destination with the shortest distance to visited list and remove from unvisited list
                var placeId = await placesApiService.GetPlaceId(apiResponse.DestinationAddresses[indexOfMin]);

                route.Stops.Add(placeId);
                unvisited.Remove(placeId);

                // Add distance and time to the route object
                route.Distance += minDistance;
                route.Time += minDuration;

                // Change departure time
                departureTime = departureTime.AddSeconds(minDuration);
            }

            // Get distance and duration from last visited stop to end
            var apiResponseEnd = await apiService.GetData(new[] { route.Stops.Last() }, new[] { end }, avoid, departureTime, mode);
            double distanceToEnd = apiResponseEnd.Rows[0].Elements[0].Distance.Value;
            double durationToEnd = apiResponseEnd.Rows[0].Elements[0].Duration.Value;

            // Add distance and time to the route object
            route.Distance += distanceToEnd;
            route.Time += durationToEnd;

            return route;
        }
    }

    public class Route
    {
        public List<string> Stops { get; set; } = new List<string>();
        public double Time { get; set; } = 0;
        public double Distance { get; set; } = 0;
    }
}
