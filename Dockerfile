FROM node:lts

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 3333

CMD ["npm","run","build"]