FROM node:10-alpine
# alpine is so much better

EXPOSE 5000

WORKDIR /app

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY tslint.json /app/tslint.json
COPY yarn.lock /app/yarn.lock

COPY public /app/public
COPY src /app/src

RUN yarn install
RUN yarn lint
# building here for CI verification
RUN yarn build
RUN rm -rf build

# building here so that appropriate env variables can be inserted outside of CI
CMD ["yarn", "start:prod"]
