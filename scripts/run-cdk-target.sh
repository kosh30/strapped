#!/bin/bash
set -e
cd "$(dirname "$0")/.."

BRANCH=$(git rev-parse --abbrev-ref HEAD)

export NX_CDK_STACK=$2
TARGET=$1

if [ "$TARGET" == "" ]; then
    echo "arg 1 should be the cdk target to run such as deploy, diff, synth etc."
    exit 1
fi

if [ "$NX_CDK_STACK" == "" ]; then
    echo "arg 2 should be the stack to deploy. use pipeline, backend or frontend"
    exit 1
fi

scripts/nx-run-with-env.sh "branch-$BRANCH" "cdk:$TARGET" "$BRANCH"
