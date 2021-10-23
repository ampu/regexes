#define PCRE2_CODE_UNIT_WIDTH 8
#define PCRE_STATIC
#include "pcre2.h"
#include "../frozen/frozen.h"

#include <iostream>
#include <vector>
#include <string>

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
    int errorCode = 0;
    size_t errorOffset = 0;

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

    errorCode = 0;
    errorOffset = 0;
    pcre2_code* patternFlagsRe = pcre2_compile(PCRE2_SPTR(PATTERN_FLAGS_REGEXP), PCRE2_ZERO_TERMINATED, 0, &errorCode, &errorOffset, NULL);
    if (!patternFlagsRe) {
        exit_with_error(engineValue, ERROR_RUNTIME);
    }

    std::string pattern = flagsValue == NULL || flagsValue[0] == 0
        ? patternValue
        : std::string("(?") + flagsValue + ")" + patternValue;

//    std::string pattern;
//    pcre2_match_data* patternFlagsMatchData = pcre2_match_data_create_from_pattern(patternFlagsRe, NULL);
//    int patternFlagsGroupCount = pcre2_match(patternFlagsRe, PCRE2_SPTR(patternValue), strlen(patternValue), 0, 0, patternFlagsMatchData, NULL);
//    if (patternFlagsGroupCount == PCRE2_ERROR_NOMATCH) {
//        if (flagsValue == NULL || flagsValue[0] == 0) {
//            pattern = patternValue;
//        }
//        else {
//            pattern = std::string("(?") + flagsValue + ")" + patternValue;
//        }
//    }
//    else {
//        if (patternFlagsGroupCount <= 0) {
//            exit_with_error(engineValue, ERROR_RUNTIME);
//        }
//        else {
//            PCRE2_SIZE* patternFlagsOvector = pcre2_get_ovector_pointer(patternFlagsMatchData);
//
//            std::string localPattern = std::string(pattern.c_str() + patternFlagsOvector[2 * 1], pattern.c_str() + patternFlagsOvector[2 * 1 + 1]);
//            std::string localFlags = std::string(pattern.c_str() + patternFlagsOvector[2 * 2], pattern.c_str() + patternFlagsOvector[2 * 2 + 1]);
//
//            if (localFlags.empty()) {
//                pattern = localPattern;
//            }
//            else {
//                pattern = std::string("(?") + localFlags + ")" + localPattern;
//            }
//        }
//    }

    errorCode = 0;
    errorOffset = 0;
    pcre2_code* re = pcre2_compile(PCRE2_SPTR(pattern.c_str()), PCRE2_ZERO_TERMINATED, 0, &errorCode, &errorOffset, NULL);
    if (!re) {
        exit_with_error(engineValue, ERROR_INVALID_REGEXP);
    }

    std::vector<match> matches;

    size_t textLength = strlen(text);
    for (size_t offset = 0; offset < textLength; ) {
      pcre2_match_data* matchData = pcre2_match_data_create_from_pattern(re, NULL);
      int groupCount = pcre2_match(re, PCRE2_SPTR(text), textLength, offset, 0, matchData, NULL);
      if (groupCount == PCRE2_ERROR_NOMATCH) {
        break;
      }
      if (groupCount <= 0) {
          exit_with_error(engineValue, ERROR_RUNTIME);
      }

      PCRE2_SIZE* ovector = pcre2_get_ovector_pointer(matchData);
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
