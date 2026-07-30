#!/bin/sh

npx drizzle-kit migrate

npm run db:seed

exec npm start