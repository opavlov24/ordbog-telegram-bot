FROM node:16.3-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY app.js ./

RUN npm install

CMD [ "node", "app.js" ]
