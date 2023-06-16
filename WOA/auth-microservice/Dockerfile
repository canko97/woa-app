FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

# Set environment variable to production
ENV ENVIRONMENT=production

CMD ["npm", "start"]
