#!/bin/bash
set -e
cd "$(dirname "$0")"

SRC_DIR=../../dist/packages/frontend
BUILD_FOLDER=$SRC_DIR/serverless
NEXT_DIR=$BUILD_FOLDER/dist/packages/frontend

rm -rf $BUILD_FOLDER
cp -r $SRC_DIR/.next/standalone/ $BUILD_FOLDER
cp -r $SRC_DIR/.next/static $NEXT_DIR/.next
cp -r $SRC_DIR/public $NEXT_DIR/

SERVER_FILE=$BUILD_FOLDER/packages/frontend/server.js
mv $SERVER_FILE $BUILD_FOLDER/packages/frontend/node-server.js
cp ./serverless-server.js $SERVER_FILE


echo "Serverless output -> $(realpath $BUILD_FOLDER)"
