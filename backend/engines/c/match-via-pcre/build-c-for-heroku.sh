#!/bin/sh

cd "$(dirname "$0")" \
  && gcc -Wall -Werror -o bin/match-all-via-c \
    match-all.c \
    ../frozen/frozen.c \
    -L /lib/x86_64-linux-gnu -l:libpcre.so.3 \
  && bin/match-all-via-c "$1" "$2" "$3" "$4"
