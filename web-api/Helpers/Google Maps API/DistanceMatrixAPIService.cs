using System.Net;
using System.Text.Json;

namespace Helpers.Google_Maps_API
{
    public class DistanceMatrixAPIService (string endpoint, string outputFormat, string apiKey)
    {
        public async Task<DistanceMatrixResponse> GetData(string[] origins, string[] destinations, string[] avoid, DateTime departureTime, string mode)
        {
            var data = new DistanceMatrixResponse();

            // Create URL
            var request = CreateUrl(origins, destinations, avoid, departureTime, mode);

            // Send Request
            var response = await SendRequest(request);

            data = JsonSerializer.Deserialize<DistanceMatrixResponse>(response);

            return data;
        }

        private async Task<string> SendRequest(string request)
        {
            // Send Http Request and Get Response
            string responseData = String.Empty;

            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    responseData = await response.Content.ReadAsStringAsync();
                }
                else
                {
                    Console.WriteLine($"Error: {response.StatusCode}");
                }
            }

            return responseData;
        }

        private string CreateUrl(string[] origins, string[] destinations, string[] avoid, DateTime departureTime, string mode)
        {
            // Create URL
            string requestUrl = $"{endpoint}{outputFormat}?";

            requestUrl += $"origins={GetArrayString(origins, true)}&";

            requestUrl += $"destinations={GetArrayString(destinations, true)}&";

            if (avoid.Length > 0)
            {
                requestUrl += $"avoid={GetArrayString(avoid)}&";
            }

            if (departureTime != DateTime.MinValue)
            {
                long timeOffset = new DateTimeOffset(departureTime).ToUnixTimeMilliseconds();
                string time = timeOffset.ToString();
                requestUrl += $"departure_time={time}&";
            }
            else
            {
                requestUrl += $"departure_time=now&";
            }

            requestUrl += $"mode={mode}&";

            requestUrl += $"key={apiKey}&";

            return requestUrl;
        }

        private string GetArrayString(string[] array, bool placeIdSuffix = false)
        {
            string arrayString = "";

            for (int i = 0; i < array.Length; i++)
            {
                if (placeIdSuffix)
                {
                    arrayString += "place_id:"; 
                }
                
                arrayString += array[i];

                if (i != array.Length - 1)
                {
                    arrayString += "|";
                }
            }

            return arrayString;
        }
    }
}
