export default function ({ $axios, redirect }) {
  $axios.setHeader('X-Dto-Client', process.env.API_CLIENT_ID)
  $axios.setHeader('X-Application', process.env.API_APP_SIGNATURE || null)
  $axios.setHeader('X-Agent-Type', 'user')

  $axios.onResponse(res => {
    if (process.server) console.dir(res.data)
  })
  $axios.onError(err => {
    if (!process.server) return
    if (err.response && err.response.data && err.response.data.error) {
      let dError = err.response.data.error
      console.dir(err.response.data)
      console.error(`[axios] Error: ${dError.status} ${dError.type} - ${dError.message}`)
    }
    console.error(`[axios] ${err.stack}`)
  }
  )
}
