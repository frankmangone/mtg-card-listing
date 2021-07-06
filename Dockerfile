FROM node:lts-alpine3.13

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN yarn add

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]