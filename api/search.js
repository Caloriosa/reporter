export function searchInScope (query, scope) {
  return `/search/${encodeURIComponent(query)}?scope=${scope}`
}
