#!/bin/sh

# -P - PCRE-mode
# jc
# jq
grep -oE -bn "$2" <<<"$1"
