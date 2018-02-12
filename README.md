# Caloriosa Reporter

> Explore devices, view statistics, graphs and measurement reports

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# build production docker image and run container
$ docker build . -t caloriosa/reporter
$ docker run -p 3000:3000 -e API_URL="https://api.myrestsrv.tld" caloriosa/reporter
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
