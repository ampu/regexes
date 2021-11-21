#!/bin/sh

gcc -Wall -Werror -o bin/match-all-via-c match-all.c \
  ../frozen/frozen.c \
  ../pcre2-install/lib/libpcre2-8.a \
  && bin/match-all-via-c "$1" "$2" "$3" "$4"
