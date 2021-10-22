using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.Linq;

class Program
{
    class Result {
      [JsonPropertyName("index")]
      public int Index { get; set; }

      [JsonPropertyName("substring")]
      public string? Substring { get; set; }
    }

    private static void exitWithError(string engineValue, string error)
    {
        Console.WriteLine(JsonSerializer.Serialize(
            new Dictionary<string, object>
            {
                {"engineValue", engineValue},
                {"error", error},
            },
            new JsonSerializerOptions
            {
                WriteIndented = true,
            }));

        Environment.Exit(1);
    }

    private static void exitWithMatch(string engineValue, MatchCollection matches)
    {
        Console.WriteLine(JsonSerializer.Serialize(
            new Dictionary<string, object>
            {
                {"engineValue", engineValue},
                {"matches", matches
                  .Select((match) => new Result {
                    Index = match.Index,
                    Substring = match.Value,
                  })
                  .ToList()},
            },
            new JsonSerializerOptions
            {
                WriteIndented = true,
            }));

        Environment.Exit(0);
    }

    static void Main(string[] args)
    {
        var engineValue = args.Length > 0 ? args[0] : "";
        var text = args.Length > 1 ? args[1] : null;
        var patternValue = args.Length > 2 ? args[2] : null;
        var flagsValue = args.Length > 3 ? args[3] : null;

        if (patternValue == null) {
            exitWithError(engineValue, "invalid pattern");
        }

        if (text == null) {
            exitWithError(engineValue, "invalid input");
        }

        var patternFlagsMatch = Regex.Match(patternValue!, "^/(.*)/(.*)$", RegexOptions.Singleline);
        var pattern = patternFlagsMatch == Match.Empty ? patternValue! : patternFlagsMatch.Groups[1].Value;
        var flags = patternFlagsMatch == Match.Empty ? null : patternFlagsMatch.Groups[2].Value;

        pattern = flags == null ? pattern : ("(?" + flags + ")" + pattern);

        var matches = Regex.Matches(text!, pattern);
        exitWithMatch(engineValue, matches);
    }
}
