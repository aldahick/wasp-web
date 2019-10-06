FROM node:10-alpine

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
RUN yarn build

CMD ["yarn", "start:prod"]