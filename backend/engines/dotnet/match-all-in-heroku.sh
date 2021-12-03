#!/bin/sh

# cd "$(dirname "$0")" && dotnet run "$1" "$2" "$3" "$4"
cd "$(dirname "$0")" \
  && . ../../../.env \
  && . ../../../.env.heroku \
  && bin/Release/net5.0/$DOTNET_RUNTIME/publish/dotnet "$1" "$2" "$3" "$4"
