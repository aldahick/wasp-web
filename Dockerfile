FROM node:10

EXPOSE 5000

WORKDIR /app

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json

COPY node_modules /app/node_modules
COPY public /app/public
COPY src /app/src

# building here so that appropriate env variables can be inserted outside of CI
CMD ["yarn", "start:prod"]
