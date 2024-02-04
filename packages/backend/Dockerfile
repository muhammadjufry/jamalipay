FROM node:latest

WORKDIR /app
COPY package.json package*.json ./
ENV PORT=8080

RUN npm install

EXPOSE 8080

# RUN adduser -ms /bin/bash -u 1001 app
# USER app
COPY . .

CMD [ "npm", "run", "dev" ]
