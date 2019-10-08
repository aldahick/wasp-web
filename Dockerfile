ARG REACT_APP_API_URL

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
RUN yarn build

CMD ["yarn", "start:prod"]
