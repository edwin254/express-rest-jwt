FROM node:16.1.0-buster
EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm ci

COPY . /usr/src/app

# RUN npm start

CMD [ "node", "index.js" ]
# CMD ./scripts/start.sh