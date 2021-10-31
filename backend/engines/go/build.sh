#!/bin/sh

cd "$(dirname "$0")" && go build -o bin/match-all src/match-all.go && bin/match-all
