FROM node:22-alpine

WORKDIR /src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 7001

CMD [ "yarn", "start" ]