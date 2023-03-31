FROM node:16-bullseye-slim

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src
ADD package.json /src/package.json
RUN npm install

#ADD app/nodemon.json /src/nodemon.json

EXPOSE 4600

CMD npm start