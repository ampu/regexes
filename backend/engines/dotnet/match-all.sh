#!/bin/sh

# cd "$(dirname "$0")" && dotnet run "$1" "$2" "$3" "$4"

cd "$(dirname "$0")" && bin/Release/net5.0/osx.10.15-x64/publish/dotnet "$1" "$2" "$3" "$4"
