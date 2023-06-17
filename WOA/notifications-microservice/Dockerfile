FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

ENV SMTP_AUTH_USER=$SMTP_AUTH_USER
ENV SMTP_AUTH_PASS=$SMTP_AUTH_PASS

CMD ["npm", "start"]

