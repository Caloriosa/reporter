export default function ({ $axios, redirect }) {
  // General Caloriosa API REST headers
  $axios.setHeader('X-Dto-Client', process.env.API_CLIENT_ID)
  $axios.setHeader('X-Application', process.env.API_APP_SIGNATURE || null)
  $axios.setHeader('X-Agent-Type', 'user')
  $axios.setHeader('Content-Type', 'application/json', ['post', 'put', 'patch'])

  // Logging on request, response and error (only SSR)
  $axios.onRequest(req => {
    if (process.server) console.log(`[axios] Request: ${req.method.toUpperCase()} ${req.baseURL || ''}${req.url}`)
  })
  $axios.onResponse(res => {
    if (!process.server) return
    console.log(`[axios] Response status: ${res.status} ${res.statusText} Path: ${res.config.url}`)
    if (process.env.NODE_ENV === 'development') console.dir(res.data)
  })
  $axios.onError(err => {
    if (!process.server) return
    if (err.response && err.response.data && err.response.data.error) {
      let dError = err.response.data.error
      if (process.env.NODE_ENV === 'development') console.dir(err.response.data)
      console.error(`[axios] Error: ${dError.status} ${dError.type} - ${dError.message}`)
    }
    console.error(`[axios] ${err.stack}`)
  }
  )
}
