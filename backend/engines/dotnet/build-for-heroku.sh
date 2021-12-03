#!/bin/sh

cd "$(dirname "$0")" \
  && . ../../../.env \
  && . ../../../.env.heroku \
  && dotnet publish -c Release -r "$DOTNET_RUNTIME"
