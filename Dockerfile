FROM node:lts

WORKDIR /app

ADD . /app

VOLUME /var/run/docker.sock /var/run/docker.sock

RUN npm install

EXPOSE 3333

CMD ["npm","run","build"]