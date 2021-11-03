#!/bin/sh

cd "$(dirname "$0")" \
  && . ../../../.env \
  && . ../../../.env.local \
  && dotnet publish -c Release -r "$DOTNET_RUNTIME"
