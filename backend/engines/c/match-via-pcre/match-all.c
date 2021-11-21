#define PCRE_STATIC
#include "pcre.h"
#include "../frozen/frozen.h"

#include <string.h>

#define TEXT_CAPACITY 1024
#define PATTERN_CAPACITY 1024
#define OVECTOR_CAPACITY 1024
#define MATCHES_CAPACITY 1024

const char* const DEFAULT_ENGINE_VALUE = "pcre1";
const char* const EMPTY_STRING = "";

const char* const FLAGS_GROUP_PREFIX = "(?";
const char* const FLAGS_GROUP_POSTFIX = ")";

const char* const ERROR_INVALID_REGEXP = "invalid regexp";
const char* const ERROR_INVALID_INPUT = "invalid input";
const char* const ERROR_RUNTIME = "runtime error";

struct match {
  int index;
  char substring[TEXT_CAPACITY];
};

void exit_with_error(const char* engineValue, const char* error) {
    struct json_out output = JSON_OUT_FILE(stdout);
    json_printf(&output, "{engineValue: %Q, error: %Q}", engineValue, error);
    exit(1);
}

void exit_with_match(const char* engineValue, struct match* matches, int matchesCount) {
    struct json_out output = JSON_OUT_FILE(stdout);
    json_printf(&output, "{engineValue: %Q, matches: [", engineValue);
    for (int i = 0; i < matchesCount; i++) {
        if (i > 0) {
            json_printf(&output, ", ");
        }
        json_printf(&output, "{index: %d, substring: %Q}", matches[i].index, matches[i].substring);
    }
    json_printf(&output, "]}");
    exit(0);
}

int main(int argc, char** argv) {
    char pattern[PATTERN_CAPACITY] = {0};
    int ovector[OVECTOR_CAPACITY] = {0};

    const char* engineValue = argc > 1 ? argv[1] : DEFAULT_ENGINE_VALUE;

    const char* text = argc > 2 ? argv[2] : EMPTY_STRING;
    int textLength = strlen(text);

    const char* patternValue = argc > 3 ? argv[3] : EMPTY_STRING;
    const char* flagsValue = argc > 4 ? argv[4] : EMPTY_STRING;

    int patternLength = 0;
    if (flagsValue[0] == 0) {
      patternLength = snprintf(pattern, PATTERN_CAPACITY, "%s", patternValue);
    }
    else {
      patternLength = snprintf(pattern, PATTERN_CAPACITY, "%s%s%s%s", FLAGS_GROUP_PREFIX, flagsValue, FLAGS_GROUP_POSTFIX, patternValue);
    }
    if (patternLength >= PATTERN_CAPACITY) {
      exit_with_error(engineValue, ERROR_INVALID_REGEXP);
    }

    const char* error = NULL;
    int errorOffset = 0;
    pcre* re = pcre_compile(pattern, 0, &error, &errorOffset, NULL);
    if (!re) {
        exit_with_error(engineValue, ERROR_INVALID_REGEXP);
    }

    struct match matches[MATCHES_CAPACITY] = {0};
    int matchesCount = 0;

    for (size_t offset = 0; offset < textLength; ) {
      int groupCount = pcre_exec(re, NULL, text, textLength, offset, 0, ovector, OVECTOR_CAPACITY);
      if (groupCount == PCRE_ERROR_NOMATCH) {
        break;
      }
      if (groupCount <= 0) {
        exit_with_error(engineValue, ERROR_RUNTIME);
      }

      if (matchesCount >= MATCHES_CAPACITY) {
        exit_with_error(engineValue, ERROR_RUNTIME);
      }

      int substringLength = ovector[1] - ovector[0];
      if (substringLength >= TEXT_CAPACITY) {
        exit_with_error(engineValue, ERROR_RUNTIME);
      }

      struct match* match = &matches[matchesCount++];
      match->index = ovector[0];
      snprintf(match->substring, substringLength + 1, "%s", text + ovector[0]);

      offset = ovector[1];
    }
    exit_with_match(engineValue, matches, matchesCount);
    return 0;
}
