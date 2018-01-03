const deepmerge = require('deepmerge')
const fs = require('fs')
const path = require('path')

let custom = {};

if (fs.existsSync('nuxt.custom.config.js')) {
  custom = require('nuxt.custom.config.js')
}

module.exports = deepmerge({
  /*
  ** Headers of the page
  */
  head: {
    title: 'my-site',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/scss/style.scss'
  ],
  router: {

  },
  env: {
    indexRedirect: process.env.INDEX_REDIRECT || false,
    indexRedirectUrl: process.env.INDEX_REDIRECT_URL || "http://caloriosa.com/",
    devicesFilter: null
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join('node_modules/@caloriosa/rest-dto')]
      })
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
    [ '@nuxtjs/bootstrap-vue', { css: false } ]
  ],
  plugins: [
    'plugins/dto'
  ],
}, custom)
