FROM node:18-alpine as base

# setup
WORKDIR /src/docs-builder
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

# copy source
COPY ./api ./api
COPY ./docs ./docs
COPY ./dev ./dev

FROM node:18-alpine as builder

# copy sources
COPY --from=base /src ./src
WORKDIR /src/docs-builder

# build
RUN yarn docs:build
RUN yarn api:build
RUN yarn dev:build

### Production Stage
FROM nginx:stable-alpine as prod
COPY --from=builder /src/docs-builder/docs/.vitepress/dist /app/docs
COPY --from=builder /src/docs-builder/api/.vitepress/dist /app/docs/api
COPY --from=builder /src/docs-builder/dev/.vitepress/dist /app/docs/dev
COPY ./nginx.conf /etc/nginx/
