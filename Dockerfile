FROM node:12-alpine

EXPOSE 5000

WORKDIR /app

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json

COPY public /app/public
COPY src /app/src

RUN yarn install
RUN yarn lint
# building here for verification in CI
RUN yarn build

# building here so that appropriate env variables can be inserted outside of CI
CMD ["yarn", "start:prod"]
