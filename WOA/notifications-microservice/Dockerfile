FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

ENV ENVIRONMENT=production

CMD ["npm", "start"]

