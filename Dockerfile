FROM node:24.1.0-slim

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]