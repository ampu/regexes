#!/bin/sh

cd "$(dirname "$0")" \
  && apt install -y cargo \
  && cargo build --release && ./target/release/match-all
