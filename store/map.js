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
    let markers = [{
      position: {lat: 50.2, lng: 14.372},
      name: 'XvFbd4rdej0',
      label: 'MyDevice',
      created: '26.1.2018',
      owner: 'PurrplingCat'
    }, {
      position: {lat: 50.117, lng: 14.227},
      label: 'YourDevice',
      name: 'DdFGB012erz',
      created: '30.1.2018',
      owner: 'CallMeFoxie'
    }, {
      position: {lat: 49.235, lng: 16.743},
      label: 'Another',
      name: 'FGfhVb3301f',
      created: '31.1.2018',
      owner: 'Elise Bauman'
    }]
    commit('FILL_MARKERS', markers)
    return markers
  },
  async fetchDevice ({ commit, state }, deviceName) {
    let device = state.markers.find(el => el.name === deviceName)
    if (!device) {
      let err = new Error(`'${deviceName}' not found!`)
      err.status = 404
      throw err
    }
    commit('SELECT', device)
    return device
  },
  async fulltext ({ commit }, query) {
    let devices = await this.$axios.$get(`/search/${encodeURIComponent(query)}?scope=devices`)
    commit('FILL_FULLTEXT', devices)
    return devices
  }
}
