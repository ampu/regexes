#!/bin/sh

# cd "$(dirname "$0")" && cargo run -- "$1" "$2" "$3" "$4"
cd "$(dirname "$0")" && target/release/match-all "$1" "$2" "$3" "$4"
