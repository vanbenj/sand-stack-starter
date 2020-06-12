FROM node:12-alpine

RUN mkdir -p /app
WORKDIR /app

ARG SAPPER_APP_GRAPHQL_URI
ARG NODE_ENV

# set build time environment
ENV SAPPER_APP_GRAPHQL_URI $SAPPER_APP_GRAPHQL_URI
ENV NODE_ENV $NODE_ENV

COPY package.json .
COPY package-lock.json .
# we need --production=false so dev dependencies are installed for Sapper build
RUN npm --production=false install
COPY . .
RUN export NODE_OPTIONS=--max_old_space_size=2048 \
    && export SAPPER_APP_TIMESTAMP=$(date +%s%3N) \
    && npm run build

EXPOSE 3000

CMD ["node", "__sapper__/build"]
