FROM node:12-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY src ./src
COPY .env .

EXPOSE 4001

CMD ["npm", "start"]
