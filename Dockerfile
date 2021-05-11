FROM node:lts

RUN apt update -y

RUN apt install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release -y

RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

RUN echo \
    "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

RUN apt update -y && apt install docker-ce docker-ce-cli containerd.io -y

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 3333

CMD ["npm","run","build"]