#!/bin/sh

cd "$(dirname "$0")" \
  && echo 'LANG=en_US.utf-8' >>/etc/environment \
  && echo 'LC_ALL=en_US.utf-8' >>/etc/environment \
  && echo '' >>../.env.local \
  && ./install-dotnet.sh \
  && ./install-jvm.sh \
  && ./install-go.sh \
  && ./install-rust.sh \
  && ./install-pcre.sh \
  && ./install-pcre2.sh
