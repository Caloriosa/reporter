FROM node:8.9.4-alpine

RUN mkdir -p /app

COPY . /app

WORKDIR /app

ENV BUILD_ANALYZE=false
ENV DEBUG_COLORS=false
ENV DEBUG_HIDE_DATE=true

RUN yarn install --non-interactive && \
    yarn build && \
    NODE_ENV="production" yarn install --production --non-interactive

ENV NODE_ENV="production"
ENV HOST="0.0.0.0"
ENV PORT=3000
ENV API_URL="http://localhost:6060"
ENV API_PROXY_LOGLEVEL="debug"

EXPOSE 3000

CMD [ "yarn", "start" ]
