FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=build-stage /app .

EXPOSE 3000

CMD ["npm", "start"]
