const deepmerge = require('deepmerge')
const fs = require('fs')
const path = require('path')

let custom = {}

if (fs.existsSync('nuxt.custom.config.js')) {
  custom = require('nuxt.custom.config.js')
}

module.exports = deepmerge({
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | Caloriosa World',
    title: 'Explore our world!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Barlow:400,600|Roboto:400,700|Material+Icons&subset=latin-ext' },
      { rel: 'stylesheet', href: '//cdn.materialdesignicons.com/2.1.19/css/materialdesignicons.min.css' }
    ]
  },
  css: [
    '@/assets/styl/main.styl'
  ],
  router: {
    middleware: [
      'dto'
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#2196F3' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true,
    prefix: '/api',
    // proxyHeaders: false
  },
  proxy: {
    '/api': {
      target: process.env.APIURL || 'http://10.0.0.143:8080',
      pathRewrite: {'^/api': ''},
      logLevel: 'debug'
    }
  },
  plugins: [
    'plugins/vuetify',
    'plugins/filters',
    'plugins/maps'
  ]
}, custom)
