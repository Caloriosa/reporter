export default function ({ $axios, redirect }) {
  $axios.setHeader('X-Dto-Client', process.env.API_CLIENT_ID)
  $axios.setHeader('X-Application', process.env.API_APP_SIGNATURE)
  $axios.setHeader('X-Agent-Type', 'user')
}
