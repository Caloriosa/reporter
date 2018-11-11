# !!! This is docker image for development image! Please don't use it in production !!!
FROM node:11.1.0-alpine

RUN mkdir -p /app && \
    chown -R node /app

USER node
WORKDIR /app

ENV BUILD_ANALYZE=false
ENV DEBUG_COLORS=false
ENV DEBUG_HIDE_DATE=true
ENV NODE_ENV="development"
ENV HOST="0.0.0.0"
ENV PORT=3000
ENV API_URL="http://localhost:6060"
ENV API_PROXY_LOGLEVEL="debug"

EXPOSE 3000

CMD [ "echo", "Please mount your repository dir into /app in container and then run `yarn dev`."]
# docker run -ti <your-image> -v $(pwd):/app -p 3000:3000  "yarn dev"
