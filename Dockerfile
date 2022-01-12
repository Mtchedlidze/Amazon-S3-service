FROM node:alpine

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY ./app /app/

CMD ["node", "app"]