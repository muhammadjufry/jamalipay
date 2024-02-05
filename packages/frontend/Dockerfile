FROM node:latest

WORKDIR /app
COPY package.json package*.json ./

RUN yarn set version stable
RUN yarn install

EXPOSE 3000

COPY . .

CMD [ "yarn", "dev" ]
