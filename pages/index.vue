<template>
  <v-container justify-center>
    <v-layout>
      <gmap-map
        :center="center"
        :zoom="zoom"
        ref="gmap"
        map-type-id="terrain"
        style="width: 100%; height: 100%; position: absolute; left:0; top:0; z-index: 0"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :title="fetchLabels(m.devices)"
          :clickable="true"
          :draggable="false"
          @click="loadDevice(m)"
        ></gmap-marker>
      </gmap-map>

    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg6 justify-center class="ontop">
        <v-toolbar
          color="white"
          dense
          class="pa-1"
        >
          <v-progress-circular class="mr-3" v-if="loading" size="24" indeterminate color="primary"></v-progress-circular>
          <v-text-field :prepend-icon="!loading ? 'search' : ''" hide-details single-line v-model="query" @keyup.enter.native="doSearch()"></v-text-field>
          <v-btn icon @click="centerMyLocation()">
            <v-icon>my_location</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
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
import to from '@/util/to'

export default {
  components: {
    MapDeviceInfoBox,
    MapErrorBox
  },
  asyncData ({ app, error }) {
    return {
      center: {lat: 0, lng: 0},
      query: null,
      listedDevices: null,
      zoom: 8,
      error: null,
      loading: false
    }
  },
  computed: {
    selected () { return this.$store.state.map.selected },
    markers () { return this.$store.state.map.markers }
  },
  methods: {
    loadDevice (marker) {
      if (!Array.isArray(marker.devices) || !marker.devices.length) {
        this.error = {
          message: 'Error while loading device!'
        }
      } else {
        this.query = marker.devices.length > 1 ? 'loc:' + [ marker.position.lat, marker.position.lng ].join(',') : marker.devices[0].name
        this.$refs.gmap.panTo(marker.position)
        this.doSearch()
      }
    },
    loadMarkers () {
      this.$store.dispatch('map/fetchMarkers').catch(() => {
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
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    setCenter (position) {
      this.center = position
      this.$router.replace(`?loc=${position.lat},${position.lng}`)
    },
    centerMyLocation () {
      this.$refs.gmap.panTo(this.center)
    },
    async doSearch () {
      if (!this.query || !this.query.length) return
      this.clear()
      this.loading = true
      let [ err, device ] = await to(this.$store.dispatch('map/fetchDevice', this.query))
      if (!err && device && device.position) {
        this.$refs.gmap.panTo(device.position)
      } else {
        [ err ] = await to(this.$store.dispatch('map/fulltext', this.query))
        if (err) {
          this.error = err.response && err.response.status === 404
            ? { message: `Nothing found for '${this.query}'`, query: this.query }
            : { message: 'Error while fetching data!' }
        }
      }
      this.loading = false
    },
    fetchLabels (devices) {
      return devices.map(el => el.label).join('\n')
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
