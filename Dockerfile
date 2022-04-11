FROM node:14

WORKDIR /var/app/current

COPY . .

RUN npm ci
RUN npm run build
RUN npm run build:docs

RUN rm -rf src
RUN rm -rf node_modules
RUN npm ci --only=production
RUN npm install -g pm2

EXPOSE 8080
CMD [ "pm2-runtime", "ecosystem.config.js" ]