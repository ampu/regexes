package main

import (
    "encoding/json"
    "fmt"
    "os"
    "regexp"
)

type match struct {
  Index int `json:"index"`
  Substring string `json:"substring"`
}

type matchResponse struct {
    EngineValue string `json:"engineValue"`
    Matches []match `json:"matches"`
}

type error struct {
  Message string `json:"message"`
}

type errorResponse struct {
    EngineValue string `json:"engineValue"`
    Error error `json:"error"`
}

func exitWithError(engineValue string, errorMessage string) {
    var response = &errorResponse {
        EngineValue: engineValue,
        Error: error {
          Message: errorMessage,
        },
    }
    var json, _ = json.MarshalIndent(response, "", "  ")
    fmt.Println(string(json))

    os.Exit(1)
}

func exitWithMatch(engineValue string, matches []match) {
    var response = &matchResponse {
        EngineValue: engineValue,
        Matches: matches,
    }
    var json, _ = json.MarshalIndent(response, "", "  ")
    fmt.Println(string(json))

    os.Exit(0)
}

func main() {
   var engineValue = ""
   if len(os.Args) > 1 {
       engineValue = os.Args[1]
   }

    var text = ""
    if len(os.Args) > 2 {
        text = os.Args[2]
    }

    var patternValue = ""
    if len(os.Args) > 3 {
        patternValue = os.Args[3]
    }

    var flagsValue = ""
    if len(os.Args) > 4 {
        flagsValue = os.Args[4]
    }

    defer func() {
        if err := recover(); err != nil {
            exitWithError(engineValue, fmt.Sprint(err))
        }
    }()

//     var patternFlagsRegexp, _ = regexp.Compile("^/(.*)/(.*)$")
//     var patternFlagsMatch = patternFlagsRegexp.FindStringSubmatch(regex)
//     if patternFlagsMatch != nil {
//         if patternFlagsMatch[2] == "" {
//             regex = patternFlagsMatch[1]
//         } else {
//             regex = "(?" + patternFlagsMatch[2] + ")" + patternFlagsMatch[1]
//         }
//     }

    var pattern = patternValue
    if flagsValue != "" {
        pattern = "(?" + flagsValue + ")" + patternValue
    }

    var regexpObject, err = regexp.Compile(pattern)
    if err != nil {
      exitWithError(engineValue, fmt.Sprint(err))
    }

    var indices = regexpObject.FindAllStringIndex(text, -1)
    var matches = []match{}
    if indices != nil {
        matches = make([]match, len(indices))
        for i := 0; i < len(indices); i++ {
            matches[i] = match{
              Index: indices[i][0],
              Substring: text[indices[i][0]:indices[i][1]],
           }
        }
    }
    exitWithMatch(engineValue, matches)
}

