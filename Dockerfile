FROM node:20

WORKDIR /usr/src/signup-api 

COPY ./package.json .
RUN npm install --only=prod