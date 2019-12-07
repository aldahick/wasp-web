FROM node:12.13.1-alpine

EXPOSE 5000

WORKDIR /app

COPY .eslintrc.json /app/.eslintrc.json
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY tsconfig.json /app/tsconfig.json

COPY public /app/public
COPY src /app/src

RUN yarn install
RUN yarn lint
# building here for verification in CI
RUN yarn compile
# and promptly removing the output
RUN yarn clean

# building here so that appropriate env variables can be inserted outside of CI
CMD ["yarn", "start:prod"]
