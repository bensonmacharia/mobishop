# FROM node:21
FROM --platform=linux/amd64 node:21

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD npm start