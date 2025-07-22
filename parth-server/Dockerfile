FROM node:18

WORKDIR  /main

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD  ["nodemon","index.js"]   


