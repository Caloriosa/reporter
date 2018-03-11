FROM node:8.10.0-alpine

RUN mkdir -p /app

COPY . /app

WORKDIR /app

ENV BUILD_ANALYZE=false
ENV DEBUG_COLORS=false
ENV DEBUG_HIDE_DATE=true
ENV NODE_ENV="production"

RUN yarn install --production=false --non-interactive && \
    yarn build && \
    yarn install --production=true --non-interactive

ENV HOST="0.0.0.0"
ENV PORT=3000
ENV API_URL="http://localhost:6060"
ENV API_PROXY_LOGLEVEL="debug"

EXPOSE 3000

CMD [ "yarn", "start" ]
