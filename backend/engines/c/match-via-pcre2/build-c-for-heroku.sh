#!/bin/sh

cd "$(dirname "$0")" \
  && gcc -Wall -Werror -o bin/match-all-via-c \
    match-all.c \
    ../frozen/frozen.c \
    -L /usr/lib/x86_64-linux-gnu -l:libpcre2-8.so.0 \
  && bin/match-all-via-c "$1" "$2" "$3" "$4"
