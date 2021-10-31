#!/bin/sh

./install__dotnet.sh \
  && ./install__jvm.sh \
  && ./install__go.sh \
  && ./install__rust.sh \
  && ./install__pcre.sh \
  && ./install__pcre2.sh
