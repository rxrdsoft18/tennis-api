FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/backoffice apps/backoffice
COPY libs libs

RUN npm install

RUN npm run build backoffice


FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/backoffice/main"]
