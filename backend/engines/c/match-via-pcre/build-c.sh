#!/bin/sh

gcc -Wall -Werror -o bin/match-all-via-c match-all.c \
  ../frozen/frozen.c \
  ../pcre-install/lib/libpcre.a \
  && bin/match-all-via-c "$1" "$2" "$3" "$4"
