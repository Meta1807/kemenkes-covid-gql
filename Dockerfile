FROM node:14.16-alpine

WORKDIR /app/

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install --silent

CMD [ -d "node_modules" ] && npm run start || npm ci && npm run start