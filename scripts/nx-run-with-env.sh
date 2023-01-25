#!/bin/bash
set -e
cd "$(dirname "$0")/.."


ENV=$1
RUN=$2
MATCH_BRANCH=$3
CLEAR=$4

echo "SHSH_: ${MATCH_BRANCH}"

if [ "$CLEAR" == "1" ]; then
    npx nx reset
fi

if [ "$MATCH_BRANCH" == "1" ]; then
    export NX_BRANCH=''
fi

if [ -f "./.env.$ENV" ]; then
    set -o allexport
    source "./.env.$ENV"
    set +o allexport
fi

if [ "$MATCH_BRANCH" == "1" ]; then
    if [ "$NX_BRANCH" != "$(git rev-parse --abbrev-ref HEAD)" ]; then
        echo "NX_BRANCH does not match current git branch"
        # exit 1
    fi
elif [[ "$MATCH_BRANCH" != "" &&  "$MATCH_BRANCH" != "$NX_BRANCH" ]]; then
    echo "NX_BRANCH does not match the specified branch of $MATCH_BRANCH"
    # exit 1
fi

npx nx run "$RUN"
