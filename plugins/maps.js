import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'

export default function registerMap ({ app }) {
  Vue.use(VueGoogleMaps, {
    load: {
      key: app.$env.MAP_API_KEY,
      libraries: 'places' // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)
    }
  })
}
