export default function ({ $axios }) {
  // General Caloriosa API REST headers
  $axios.setHeader('X-Application', 'caloriosa/reporter')
  $axios.setHeader('X-Agent-Type', 'user')
  $axios.setHeader('Content-Type', 'application/json', ['post', 'put', 'patch'])
}
