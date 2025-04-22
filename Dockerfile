FROM node:18-alpine

RUN npm install -g pm2

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build && yarn migration:run 

CMD ["node", "dist/main.js"]