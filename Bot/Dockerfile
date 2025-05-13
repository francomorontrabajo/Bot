FROM node

RUN apt-get update

WORKDIR /BOT

COPY . .

RUN npm install && npx tsc

CMD ["node", "bot.js"]