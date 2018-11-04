export default function ({ app, $axios }) {
  if (process.client && !app.$env.USE_PROXY) {
    $axios.defaults.baseURL = app.$env.API_URL
  }

  // General Caloriosa API REST headers
  $axios.setHeader('X-Application', 'caloriosa/reporter')
  $axios.setHeader('X-Agent-Type', 'user')
  $axios.setHeader('Content-Type', 'application/json', ['post', 'put', 'patch'])
}
