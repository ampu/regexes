#define PCRE_STATIC
#include "pcre.h"
#include "../frozen/frozen.h"

#include <iostream>
#include <vector>
#include <string>

#define OVECTOR_LENGTH 1024

const char* const EMPTY_STRING = "";

const char* const ERROR_INVALID_REGEXP = "invalid regexp";
const char* const ERROR_INVALID_INPUT = "invalid input";
const char* const ERROR_RUNTIME = "runtime error";

const char* const PATTERN_FLAGS_REGEXP = "^/([\\s\\S]*)/([\\s\\S]*)$";

struct match {
  size_t index;
  std::string substring;
};

void exit_with_error(const char* engineValue, const char* error) {
    struct json_out output = JSON_OUT_FILE(stdout);
    json_printf(&output, "{engineValue: %Q, error: %Q}", engineValue, error);
    exit(1);
}

void exit_with_match(const char* engineValue, std::vector<match>& match) {
    struct json_out output = JSON_OUT_FILE(stdout);
    json_printf(&output, "{engineValue: %Q, matches: [", engineValue);
    for (auto it = match.begin(); it != match.end(); it++) {
        if (it != match.begin()) {
            json_printf(&output, ", ");
        }
        json_printf(&output, "{index: %lu, substring: %Q}", it->index, it->substring.c_str());
    }
    json_printf(&output, "]}");
    exit(0);
}

int main(int argc, char** argv) {
    const char* error = NULL;
    int errorOffset = 0;
    int ovector[OVECTOR_LENGTH];
    int groupCount = 0;

    const char* engineValue = argc > 1 ? argv[1] : EMPTY_STRING;
    const char* text = argc > 2 ? argv[2] : NULL;
    const char* patternValue = argc > 3 ? argv[3] : NULL;
    const char* flagsValue = argc > 4 ? argv[4] : NULL;

    if (patternValue == NULL) {
        exit_with_error(engineValue, ERROR_INVALID_REGEXP);
    }

    if (text == NULL) {
        exit_with_error(engineValue, ERROR_INVALID_INPUT);
    }

    error = NULL;
    errorOffset = 0;
    pcre* patternFlagsRe = pcre_compile(PATTERN_FLAGS_REGEXP, 0, &error, &errorOffset, NULL);
    if (!patternFlagsRe) {
        exit_with_error(engineValue, ERROR_RUNTIME);
    }

    std::string pattern = flagsValue == NULL || flagsValue[0] == 0
        ? patternValue
        : std::string("(?") + flagsValue + ")" + patternValue;

//    groupCount = pcre_exec(patternFlagsRe, NULL, patternValue, strlen(patternValue), 0, 0, ovector, OVECTOR_LENGTH);
//    if (groupCount == PCRE_ERROR_NOMATCH) {
//        if (flagsValue == NULL || flagsValue[0] == 0) {
//            pattern = patternValue;
//        }
//        else {
//            pattern = std::string("(?") + flagsValue + ")" + patternValue;
//        }
//    }
//    else {
//        if (groupCount <= 0) {
//            exit_with_error(engineValue, ERROR_RUNTIME);
//        }
//        else {
//            std::string localPattern = std::string(pattern.c_str() + ovector[2 * 1], pattern.c_str() + ovector[2 * 1 + 1]);
//            std::string localFlags = std::string(pattern.c_str() + ovector[2 * 2], pattern.c_str() + ovector[2 * 2 + 1]);
//
//            if (localFlags.empty()) {
//                pattern = localPattern;
//            }
//            else {
//                pattern = std::string("(?") + localFlags + ")" + localPattern;
//            }
//        }
//    }

    error = NULL;
    errorOffset = 0;
    pcre* re = pcre_compile(pattern.c_str(), 0, &error, &errorOffset, NULL);
    if (!re) {
        exit_with_error(engineValue, ERROR_INVALID_REGEXP);
    }

    std::vector<match> matches;

    size_t textLength = strlen(text);
    for (size_t offset = 0; offset < textLength; ) {
      groupCount = pcre_exec(re, NULL, text, textLength, offset, 0, ovector, OVECTOR_LENGTH);
      if (groupCount == PCRE_ERROR_NOMATCH) {
        break;
      }
      if (groupCount <= 0) {
          exit_with_error(engineValue, ERROR_RUNTIME);
      }
      for (int i = 0; i < groupCount; i++) {
          std::string substring(
            text + ovector[2 * i],
            text + ovector[2 * i + 1]
          );
          match match = {
            ovector[2 * i],
            substring,
          };
          matches.push_back(match);
      }
      offset = ovector[1];
    }
    exit_with_match(engineValue, matches);
    return 0;
}
