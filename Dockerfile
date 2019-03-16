FROM        node:latest

RUN         mkdir -p /usr/src/app

WORKDIR     /usr/src/app

COPY        . .
ADD         https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN         chmod +x /wait

EXPOSE      3000

CMD         npm install && /wait && npm start
