#!/bin/sh

clang++ -Wno-c++11-extensions -Wno-deprecated -o bin/match-all-via-cpp match-all.cpp \
  ../frozen/frozen.c \
  ../pcre-install/lib/libpcre.a \
  && bin/match-all-via-cpp "$1" "$2" "$3" "$4"
