FROM node:18-alpine as base

# setup
WORKDIR /src/docs-builder
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

# copy source
COPY ./api ./api

FROM node:18-alpine as builder

# copy sources
COPY --from=base /src ./src
WORKDIR /src/docs-builder

# build
RUN yarn api:build

### Production Stage
FROM nginx:stable-alpine as prod
COPY --from=builder /src/docs-builder/api/.vitepress/dist /app/api
COPY ./nginx.conf /etc/nginx/
