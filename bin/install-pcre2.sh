#!/bin/sh

C_HOME="$(realpath "$(dirname "$0")/../backend/engines/c")"

cd "$C_HOME/pcre2-10.38" \
  && apt install -y automake clang \
  && ./configure --prefix="$C_HOME/pcre2-install" \
  && make \
  && make install \
  && cd "../match-via-pcre2" \
  && ./build.sh
