#!/bin/sh

cd "$(dirname "$0")" \
  && apt install -y openjdk-17-jdk \
  && ../backend/engines/jvm/build.sh
