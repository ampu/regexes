use std::env;
use regex::Regex;

extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;

#[derive(Debug, Deserialize, Serialize)]
struct Match {
    index: usize,
    substring: String,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct MatchResponse {
    engine_value: String,
    matches: Vec<Match>,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct ErrorResponse {
    engine_value: String,
    error: String,
}

#[allow(dead_code)]
fn exit_with_error(engine_value: &str, error: &str) {
    let response = ErrorResponse {
        engine_value: engine_value.to_string(),
        error: error.to_string(),
    };
    println!("{}", serde_json::to_string_pretty(&response).unwrap());
    std::process::exit(1);
}

fn exit_with_match(engine_value: &str, regex_matches: regex::Matches) {
    let mut matches = Vec::new();

    for regex_match in regex_matches {
        matches.push(Match {
          index: regex_match.start(),
          substring: regex_match.as_str().to_string(),
        });
    }

    let response = MatchResponse {
        engine_value: engine_value.to_string(),
        matches: matches,
    };
    println!("{}", serde_json::to_string_pretty(&response).unwrap());
    std::process::exit(0);
}

fn main() {
    let engine_value = env::args().nth(1).unwrap_or_default();
    let text = env::args().nth(2).unwrap_or_default();
    let pattern_value = env::args().nth(3).unwrap_or_default();
    let flags_value = env::args().nth(4).unwrap_or_default();

//     let pattern_flags_captures_option = Regex::new("^(?s)/(.*)/(.*)$").unwrap().captures(&regexp);
//     if !pattern_flags_captures_option.is_none() {
//         let pattern_flags_captures = pattern_flags_captures_option.unwrap();
//         let pattern = pattern_flags_captures.get(1).unwrap().as_str();
//         let flags = pattern_flags_captures.get(2).unwrap().as_str();
//
//         if flags.is_empty() {
//             regexp = pattern.to_string();
//         } else {
//             regexp = format!("(?{}){}", flags, pattern);
//         }
//     }

    let mut pattern = pattern_value;
    if !flags_value.is_empty() {
      pattern = format!("(?{}){}", flags_value, pattern);
    }

    let regexp_object = Regex::new(&pattern).unwrap();
    let regex_matches = regexp_object.find_iter(&text);
    exit_with_match(&engine_value, regex_matches);
}
