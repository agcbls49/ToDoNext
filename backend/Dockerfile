FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY start.sh .

EXPOSE 4000

CMD ["sh", "start.sh"]