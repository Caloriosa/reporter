import { createApiClient } from '@caloriosa/rest-dto'

export default function ({ app, req }) {
  let api = createApiClient()
  app.$api = api
}
