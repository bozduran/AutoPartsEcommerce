
FROM node:18.19.0-alpine

WORKDIR /app

RUN npm install -g @angular/cli@18

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0", "--ssl", "--ssl-key", "./ssl-localhost/localhost.key", "--ssl-cert", "./ssl-localhost/localhost.crt"]


