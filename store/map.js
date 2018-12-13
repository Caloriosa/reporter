import * as api from '@/api/index.js'

export const state = () => ({
  selected: null,
  markers: [],
  fulltext: [],
  loading: false
})

export const mutations = {
  FILL_MARKERS (state, markers) {
    if (!Array.isArray(markers)) {
      throw TypeError('Markers must be an array!')
    }
    state.markers = markers
  },
  SELECT (state, device) {
    state.selected = device
  },
  FILL_FULLTEXT (state, found) {
    if (!Array.isArray(found)) {
      throw TypeError('Found devices must be an array!')
    }
    state.fulltext = found
  },
  CLEAR_SELECT (state) {
    state.selected = null
  },
  CLEAR_MARKERS (state) {
    state.markers = []
  },
  CLEAR_FULLTEXT (state) {
    state.fulltext = []
  },
  SET_LOADING (state, isLoading = true) {
    state.loading = isLoading
  }
}

export const actions = {
  async fetchMarkers ({ commit }) {
    commit('SET_LOADING')
    try {
      let markers = await this.$axios.$get('/devices/map')
      commit('FILL_MARKERS', markers)
      return markers
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async fetchDevice ({ commit, state }, deviceName) {
    commit('SET_LOADING')
    try {
      let device = await this.$axios.$get(api.deviceByName(deviceName))
      if (!device) {
        let err = new Error(`'${deviceName}' not found!`)
        err.status = 404
        throw err
      }
      commit('SELECT', device)
      return device
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async fulltext ({ commit }, query) {
    commit('SET_LOADING')
    try {
      let devices = await this.$axios.$get(api.searchInScope(query, 'devices'))
      commit('FILL_FULLTEXT', devices)
      return devices
    } finally {
      commit('SET_LOADING', false)
    }
  }
}
