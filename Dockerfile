FROM node:20-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Install dependencies
RUN npm ci

COPY . .

# Rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source

EXPOSE 8080

CMD ["npm", "start"]
