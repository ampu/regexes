#!/bin/sh

./install__dotnet.sh \
  && ./install_jvm.sh \
  && ./install__pcre.sh \
  && ./install__pcre2.sh
