#!/bin/sh

cd "$(dirname "$0")" \
  && . ../../../.env \
  && . ../../../.env.local \
  && dotnet publish -c Release -r "$DOTNET_RUNTIME" \
  && ln -sF bin/Release/net5.0/$DOTNET_RUNTIME bin/runtime
