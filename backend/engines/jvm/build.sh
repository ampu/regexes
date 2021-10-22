#!/bin/sh

cd "$(dirname "$0")" && ./gradlew clean build uberJar
