FROM node:8.11.1-alpine

RUN mkdir -p /app

COPY . /app

WORKDIR /app

ENV BUILD_ANALYZE=false
ENV DEBUG_COLORS=false
ENV DEBUG_HIDE_DATE=true
ENV NODE_ENV="production"
ENV HOST="0.0.0.0"
ENV PORT=3000
ENV API_URL="http://localhost:6060"
ENV API_PROXY_LOGLEVEL="debug"

RUN yarn install --non-interactive && yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
