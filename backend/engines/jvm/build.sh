#!/bin/sh

cd "$(dirname "$0")" && ./gradlew build uberJar
