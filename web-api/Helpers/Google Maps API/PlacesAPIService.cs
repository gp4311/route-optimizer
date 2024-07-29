using System.Net;
using System.Text.Json;

namespace Helpers.Google_Maps_API
{
    public class PlacesAPIService(string endpoint, string outputFormat, string apiKey)
    {
        public async Task<string> GetPlaceId(string address)
        {
            var data = new PlacesResponse();

            var formattedAddress = address.Replace(" ", "%20");
            formattedAddress = formattedAddress.Replace(",", "");

            // Create URL
            var request = $"{endpoint}findplacefromtext/{outputFormat}?fields=place_id&input={formattedAddress}&inputtype=textquery&key={apiKey}";

            // Send Request
            var response = await SendRequest(request);

            data = JsonSerializer.Deserialize<PlacesResponse>(response);

            return data.Candidates[0].PlaceId;
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
    }
}
