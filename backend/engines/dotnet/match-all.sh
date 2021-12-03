#!/bin/sh

# "$(readlink "$(dirname "$0")/bin/runtime")/dotnet" "$1" "$2" "$3" "$4"

cd "$(dirname "$0")" \
  && bin/Release/net5.0/*/publish/dotnet "$1" "$2" "$3" "$4"
