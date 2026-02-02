#!/usr/bin/env bash

mv dist/index.js old
npm run build
if cmp --silent -- old dist/index.js; then
    exit 0
else
    exit 1
fi
