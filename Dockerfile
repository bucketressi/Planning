FROM node:12.2.0-alpine

WORKDIR /app

COPY /source/frontend/src /app/src
COPY /source/frontend/public /app/public
COPY /source/frontend/package.json /app/package.json
RUN npm install

CMD ["npm", "start"]
