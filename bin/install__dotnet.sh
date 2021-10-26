#!/bin/sh

wget https://packages.microsoft.com/config/ubuntu/21.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
  && dpkg -i packages-microsoft-prod.deb \
  && rm packages-microsoft-prod.deb \
  && apt install -y dotnet-sdk-5.0 \
  && backend/engines/dotnet/build.sh
