FROM node:latest

WORKDIR /app
COPY package.json package*.json ./
ENV PORT=8080

RUN npm install

EXPOSE 8080

COPY . .

CMD [ "npm", "run", "dev" ]
