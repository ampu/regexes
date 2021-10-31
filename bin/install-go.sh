#!/bin/sh

cd "$(dirname "$0")" \
  && apt install -y golang \
  && ../backend/engines/go/build.sh
