using System.Text.Json.Serialization;

namespace Helpers.Google_Maps_API
{
    public class DistanceMatrixResponse
    {
        [JsonPropertyName("destination_addresses")]
        public List<string> DestinationAddresses { get; set; }

        [JsonPropertyName("origin_addresses")]
        public List<string> OriginAddresses { get; set; }

        [JsonPropertyName("rows")]
        public List<DistanceMatrixRow> Rows { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("error_message")]
        public string ErrorMessage { get; set; }
    }

    public class DistanceMatrixRow
    {
        [JsonPropertyName("elements")]
        public List<DistanceMatrixElement> Elements { get; set; }
    }

    public class DistanceMatrixElement
    {
        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("distance")]
        public TextValueObject Distance { get; set; }

        [JsonPropertyName("duration")]
        public TextValueObject Duration { get; set; }

        [JsonPropertyName("duration_in_traffic")]
        public TextValueObject DurationInTraffic { get; set; }
    }

    public class TextValueObject
    {
        [JsonPropertyName("text")]
        public string Text { get; set; }

        [JsonPropertyName("value")]
        public double Value { get; set; }
    }
}
