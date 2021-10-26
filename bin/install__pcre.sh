#!/bin/sh

C_HOME="$(realpath "$(dirname "$0")/../backend/engines/c")"

cd "$C_HOME/pcre-8.45" \
  && apt install -y automake clang \
  && ./configure --prefix="$C_HOME/pcre-install" \
  && make \
  && make install \
  && cd "../match-via-pcre" \
  && ./build.sh
