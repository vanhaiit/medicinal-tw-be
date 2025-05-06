FROM node:20

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

# Create uploads directory at the correct location (two levels up from dist/src)
RUN mkdir -p uploads && chmod 777 uploads

RUN yarn build

EXPOSE 3000

CMD ["sh", "-c", "yarn migration:run && yarn start:prod"]