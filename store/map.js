export const state = () => ({
  loading: false,
  selected: null,
  markers: [{
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
  }],
  fulltext: []
})

export const mutations = {
  FILL_MARKERS (state, markers) {
    if (!Array.isArray(markers)) {
      throw TypeError('Markers must be an array!')
    }
    state.markers = markers
  },
  TOGGLE_LOADING (state) {
    state.loading = !state.loading
  },
  SET_LOADING (state, loading) {
    state.loading = !!loading
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
  async fetchDevice ({ commit, state }, deviceName) {
    commit('TOGGLE_LOADING')
    let device = state.markers.find(el => el.name === deviceName)
    commit('TOGGLE_LOADING')
    if (!device) {
      let err = new Error(`'${deviceName}' not found!`)
      err.status = 404
      throw err
    }
    commit('SELECT', device)
    return device
  },
  async fulltext ({ commit }, query) {
    try {
      commit('TOGGLE_LOADING')
      let devices = await this.$axios.$get(`/search/${encodeURIComponent(query)}?scope=devices`)
      commit('TOGGLE_LOADING')
      commit('FILL_FULLTEXT', devices)
      return devices
    } catch (err) {
      commit('SET_LOADING', false)
      throw err
    }
  }
}
