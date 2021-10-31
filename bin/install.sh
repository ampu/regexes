#!/bin/sh

cd "$(dirname "$0")" \
  && echo '' >>../.env.local \
  && ./install-dotnet.sh \
  && ./install-jvm.sh \
  && ./install-go.sh \
  && ./install-rust.sh \
  && ./install-pcre.sh \
  && ./install-pcre2.sh
