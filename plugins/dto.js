import { Client } from '@caloriosa/rest-client'

const TOKEN_KEY = 'JSESSIONID'

function getCookie (cookieName, stringCookie) {
  let regexCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie)
  let strCookie = regexCookie ? regexCookie[0] : null
  return strCookie ? unescape(strCookie ? strCookie.toString().replace(/^[^=]+./, '') : '') : null
}

export default ({ app, req, error }, inject) => {
  let client = new Client({
    url: process.env.api.url
  })
  client.token = getCookie(TOKEN_KEY, req ? req.headers.cookie : document.cookie)
  inject('caloriosa', client)
}
