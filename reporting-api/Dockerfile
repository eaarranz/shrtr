FROM node:16

WORKDIR app/
COPY package-lock.json package-lock.json
COPY package.json package.json

RUN npm ci
COPY ./src src
EXPOSE 3000
CMD ["npm", "run", "start"]