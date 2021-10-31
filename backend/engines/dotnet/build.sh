#!/bin/sh

cd "$(dirname "$0")" \
  && . ../../../.env.local \
  && . ../../../.env \
  && dotnet publish -c Release -r "$DOTNET_RUNTIME"
