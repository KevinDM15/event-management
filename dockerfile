FROM node:20.16
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn", "tsx", "src/index.ts"]
