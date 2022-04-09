FROM node:14

WORKDIR /var/app/current

COPY . .

RUN npm ci
RUN npm run build
RUN npm run build:docs

RUN rm -rf node_modules
RUN npm ci --only=production

EXPOSE 8080
CMD [ "node", "dist/cmd/http.js" ]