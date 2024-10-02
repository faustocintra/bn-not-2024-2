FROM node:18-alpine

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

WORKDIR /app

CMD ["npm", "start"]