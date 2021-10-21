#!python3

import sys
import json
import re

def exitWithResponse(response):
    print(json.dumps(response, indent=2))
    exit(1 if 'error' in response else 0)

def main():
    engineValue = sys.argv[1] if len(sys.argv) > 1 else ''
    text = sys.argv[2] if len(sys.argv) > 2 else None
    patternValue = sys.argv[3] if len(sys.argv) > 3 else None
    flagsValue = sys.argv[4] if len(sys.argv) > 4 else ''

    if not isinstance(patternValue, str):
        exitWithResponse({'engineValue': engineValue, 'error': {'message': 'invalid pattern'}})

    if not isinstance(text, str):
        exitWithResponse({'engineValue': engineValue, 'error': {'message': 'invalid text'}})

    patternFlagsMatch = re.search(r'^\/(.*)\/(.*)$', patternValue, re.DOTALL)
    pattern = patternFlagsMatch.group(1) if patternFlagsMatch else patternValue
    flags = patternFlagsMatch.group(2) if patternFlagsMatch else ''

    patternWithFlags = ('(?' + flags + ')' if flags else '') + pattern
    try:
      matches = [{'index': match.start(0), 'substring': match[0]} for match in re.finditer(patternWithFlags, text)]
      exitWithResponse({'engineValue': engineValue, 'matches': matches})
    except Exception as e:
      exitWithResponse({'engineValue': engineValue, 'error': {'message': str(e)}})

if __name__ == '__main__':
    main()
