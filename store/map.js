import * as api from '@/api/index.js'

export const state = () => ({
  selected: null,
  markers: [],
  fulltext: []
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
  }
}

export const actions = {
  async fetchMarkers ({ commit }) {
    let markers = await this.$axios.$get('/devices/map')
    commit('FILL_MARKERS', markers)
    return markers
  },
  async fetchDevice ({ commit, state }, deviceName) {
    let device = await this.$axios.$get(api.deviceByName(deviceName))
    if (!device) {
      let err = new Error(`'${deviceName}' not found!`)
      err.status = 404
      throw err
    }
    commit('SELECT', device)
    return device
  },
  async fulltext ({ commit }, query) {
    let devices = await this.$axios.$get(api.searchInScope(query, 'devices'))
    commit('FILL_FULLTEXT', devices)
    return devices
  }
}
