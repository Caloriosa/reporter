<template>
  <v-container justify-center fluid style="position: relative; height: 100%">
    <v-layout class="map-container">
      <no-ssr>
        <l-map
          style="width: 100%; height: 100%"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          @update:zoom="zoom = $event"
          @update:center="center = $event"
        >
         <l-control-zoom position="topright"></l-control-zoom>
         <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
         <l-marker :lat-lng="[47.413220, -1.219482]"></l-marker>
        </l-map>
      </no-ssr>

    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 lg3 class="ontop">
        <v-toolbar
          color="white"
          dense
          class="pa-1"
        >
          <v-text-field hide-details single-line v-model="query" @keyup.enter.native="doSearch()"></v-text-field>
          <v-btn icon @click="fetchMyLocation()">
            <v-icon>my_location</v-icon>
          </v-btn>
          <v-btn icon @click="doSearch()">
            <v-icon v-if="!loading">search</v-icon>
            <v-progress-circular v-if="loading" size="24" indeterminate color="primary"></v-progress-circular>
          </v-btn>
        </v-toolbar>
        <map-device-info-box :device="selected" @locate="setCenter" @close="clear(true)" />
        <map-error-box :error="error" @close="clear(true)" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MapDeviceInfoBox from '@/components/widgets/MapDeviceInfoBox'
import MapErrorBox from '@/components/widgets/MapErrorBox'

export default {
  components: {
    MapDeviceInfoBox,
    MapErrorBox
  },
  asyncData ({ app, error }) {
    return {
      mapOptions: {zoomControl: false},
      center: {lat: 0, lng: 0},
      query: null,
      listedDevices: null,
      zoom: 10,
      error: null
    }
  },
  computed: {
    selected () { return this.$store.state.map.selected },
    markers () { return this.$store.state.map.markers },
    loading () { return this.$store.state.map.loading }
  },
  methods: {
    loadDevice (marker) {
      if (!Array.isArray(marker.devices) || !marker.devices.length) {
        this.error = {
          message: 'Error while loading device!'
        }
      } else {
        this.query = marker.devices.length > 1 ? 'loc:' + [ marker.position.lat, marker.position.lng ].join(',') : marker.devices[0].name
        this.center = marker.position
        this.doSearch()
      }
    },
    loadMarkers () {
      this.$store.dispatch('map/fetchMarkers')
        .catch(() => {
          this.error = {
            message: 'Error while loading markers!'
          }
        })
    },
    clear (purge = false) {
      if (purge) {
        this.query = null
      }
      this.$store.commit('map/CLEAR_SELECT')
      this.$store.commit('map/CLEAR_FULLTEXT')
      this.error = null
    },
    fetchMyLocation () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = [
          position.coords.latitude,
          position.coords.longitude
        ]
        setTimeout(() => { this.zoom = 8 }, 250)
      })
    },
    setCenter (position) {
      this.center = position
      this.$router.replace(`?loc=${position.lat},${position.lng}`)
    },
    async doSearch () {
      if (!this.query || !this.query.length) return
      this.clear()
      try {
        let device = await this.$store.dispatch('map/fetchDevice', this.query)
        if (device && device.position) {
          this.center = device.position
        }
      } catch (err) {
        try {
          await this.$store.dispatch('map/fulltext', this.query)
        } catch (err) {
          this.error = err.response && err.response.status === 404
            ? {message: `Nothing found for '${this.query}'`, query: this.query}
            : {message: 'Error while fetching data!'}
        }
      }
    },
    fetchLabels (devices) {
      return devices.map(el => el.title).join('\n')
    }
  },
  mounted () {
    this.loadMarkers() // Load markers first

    // Parse search query and/or location from url params
    let loc = this.$route.query.loc
    let query = this.$route.query.q
    if (loc) {
      let [ lat, lng ] = loc.split(',')
      this.center = { lat: parseFloat(lat), lng: parseFloat(lng) }
    } else {
      this.fetchMyLocation() // Fallback: load my home position
    }
    if (query) {
      this.query = query
      this.doSearch()
    }
  }
}
</script>
