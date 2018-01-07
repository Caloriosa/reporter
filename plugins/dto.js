import { createApiClient } from '@caloriosa/rest-dto'

const TOKEN_KEY = 'JSESSIONID'

function getCookie (cookieName, stringCookie) {
  let regexCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie)
  let strCookie = regexCookie ? regexCookie[0] : null
  return strCookie ? unescape(strCookie ? strCookie.toString().replace(/^[^=]+./, '') : '') : null
}

export default ({ app, req, error }, inject) => {
  let api = createApiClient({
    url: process.env.api.url
  })
  api.token = getCookie(TOKEN_KEY, req ? req.headers.cookie : document.cookie)
  inject('api', api)
}
