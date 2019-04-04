FROM node:11-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . .

#RUN npm install -g nodemon

USER node

RUN npm i mocha
RUN npm test

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "index.js" ]
