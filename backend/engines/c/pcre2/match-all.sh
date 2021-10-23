#!/bin/sh

clang++ -Wno-c++11-extensions -Wno-deprecated \
  -o match-all \
  match-all.cpp \
  ../frozen/frozen.c \
  libpcre2-8.a \
  && ./match-all "$1" "$2" "$3" "$4"
