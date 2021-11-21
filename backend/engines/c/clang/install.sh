#!/bin/sh
set -ue

BUILD_DIR="$(realpath "$(dirname "$0")")"

curl -L --max-redirs 5 \
  'https://github.com/llvm/llvm-project/releases/download/llvmorg-13.0.0/clang+llvm-13.0.0-x86_64-linux-gnu-ubuntu-20.04.tar.xz' \
  >llvm.tar.xz \
  && tar xf llvm.tar.xz --xform='s/^[^\/]*/llvm-install/' \
  && rm llvm.tar.xz
