const APP_ID = 'calorisa/reporter'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | Caloriosa World',
    title: 'Explore our world!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: 'Explore devices, view statistics, graphs and measurement reports' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Barlow:400,600|Roboto:400,500,700|Material+Icons&subset=latin-ext' },
      { rel: 'stylesheet', href: '//cdn.materialdesignicons.com/2.1.19/css/materialdesignicons.min.css' }
    ]
  },
  css: [
    '@/assets/styl/main.styl'
  ],
  router: {
    middleware: [
      'dto'
    ],
    extendRoutes (routes, resolve) {
      routes.unshift({
        name: 'index', path: '/', redirect: { name: 'map' }
      })
    }
  },
  env: {
    APP_ID: APP_ID,
    MAP_API_KEY: process.env.MAP_API_KEY || ''
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#2196F3' },
  /*
  ** Build configuration
  */
  build: {
    analyze: (process.env.BUILD_ANALYZE === 'true'),
    extractCSS: true,
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
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
    debug: process.env.NODE_ENV === 'development'
  },
  proxy: {
    '/api': {
      target: process.env.API_URL || 'http://localhost:6060',
      pathRewrite: {'^/api': ''},
      logLevel: process.env.API_PROXY_LOGLEVEL || 'info'
    },
    onProxyReq (proxyReq) {
      proxyReq.setHeader('X-Application', APP_ID)
      proxyReq.setHeader('Via', `HTTP/1.1 nuxt, 1.0 ${APP_ID}`)
    }
  },
  plugins: [
    'plugins/axios',
    'plugins/filters',
    'plugins/highcharts',
    'plugins/maps',
    'plugins/vuetify'
  ]
}
