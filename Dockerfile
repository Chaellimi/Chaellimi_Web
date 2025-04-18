FROM node:22-alpine

WORKDIR /src/app

# Define build arguments
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXTAUTH_SECRET

RUN echo "DB_HOST=$DB_HOST" >> .env && \
    echo "DB_PORT=$DB_PORT" >> .env && \
    echo "DB_USER=$DB_USER" >> .env && \
    echo "DB_PASSWORD=$DB_PASSWORD" >> .env && \
    echo "DB_NAME=$DB_NAME" >> .env && \
    echo "GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID" >> .env && \
    echo "GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET" >> .env && \
    echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET" >> .env

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start", "-H", "0.0.0.0"]