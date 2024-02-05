FROM node:latest

WORKDIR /app
COPY package.json package*.json ./
ENV PORT=8080

RUN yarn set version stable
RUN yarn install

EXPOSE 8080

COPY . .

CMD [ "yarn", "dev" ]
