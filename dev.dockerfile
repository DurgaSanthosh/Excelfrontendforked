FROM node:12

WORKDIR /excelplay-frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn

EXPOSE 3000

CMD ["yarn","start"]