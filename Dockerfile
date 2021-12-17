FROM node:12.13.0-alpine3.10 as base
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .

FROM base as test
ENTRYPOINT [ "yarn" ]

FROM base as build
ARG BUILD_ENV
RUN yarn build:${BUILD_ENV}

FROM nginx:stable-alpine as deploy
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
