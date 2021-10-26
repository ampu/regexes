#!/bin/sh

clang++ -Wno-c++11-extensions -Wno-deprecated \
  -o bin/match-all \
  match-all.cpp \
  ../frozen/frozen.c \
  ../pcre2-install/lib/libpcre2-8.a \
  && bin/match-all "$1" "$2" "$3" "$4"
