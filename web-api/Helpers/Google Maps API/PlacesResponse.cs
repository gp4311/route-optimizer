using System.Text.Json.Serialization;

namespace Helpers.Google_Maps_API
{
    public class PlacesResponse
    {
        [JsonPropertyName("candidates")]
        public List<Place> Candidates { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; }
    }

    public class Place
    {
        [JsonPropertyName("place_id")]
        public string PlaceId { get; set; }
    }
}
