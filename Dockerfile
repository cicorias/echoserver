FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
COPY package.json /usr/src/app/
RUN npm install

RUN pwd
RUN ls -alt

EXPOSE 8111

CMD [ "npm", "start" ]
