FROM node:21-slim

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/notification-service

CMD ["tail", "-f", "/dev/null"]

