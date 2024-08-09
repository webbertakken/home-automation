#!/bin/sh
npx tsc
cp package.json ./build
cd build || exit 1
touch yarn.lock
yarn install
cp ../.env .
yarn workspaces focus --production
