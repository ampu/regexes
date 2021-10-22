#!/bin/sh

# cd "$(dirname "$0")" && ./gradlew -q -a --offline run --args="'$1' '$2' '$3' '$4'"

cd "$(dirname "$0")" && java -jar app/build/libs/app-uber.jar "$1" "$2" "$3" "$4"
