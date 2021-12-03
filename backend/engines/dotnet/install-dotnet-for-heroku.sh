#!/bin/sh

#wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
#  && dpkg -i packages-microsoft-prod.deb \
#  && rm packages-microsoft-prod.deb

DOTNET_SDK_VERSION=6.0.100
DOTNET_SDK_DOWNLOAD_URL=https://dotnetcli.blob.core.windows.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-x64.tar.gz
wget "$DOTNET_SDK_DOWNLOAD_URL"
