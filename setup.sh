#!/bin/sh

yarn install
yarn run tsoa routes
yarn build
yarn start