#!/bin/sh

apt install -y openjdk-17-jdk \
  && backend/engines/jvm/build.sh
