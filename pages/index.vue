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
          :title="m.label"
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
        <map-device-info-box :device="selected" @close="query = null" />
        <map-error-box :error="error" :query="query" @close="query = null" />
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
      center: {lat: 0, lng: 0},
      query: null,
      zoom: 8,
      error: null
    }
  },
  fetch ({store, error}) {
    return store.dispatch('map/fetchMarkers').catch(err => {
      error({ statusCode: err.status || 500, message: err.message })
    })
  },
  computed: {
    selected () { return this.$store.state.map.selected },
    markers () { return this.$store.state.map.markers },
    loading () { return this.$store.state.map.loading }
  },
  methods: {
    loadDevice (marker) {
      this.query = marker.name
      this.clear()
      this.$store.dispatch('map/fetchDevice', marker.name)
        .then(device => {
          this.$refs.gmap.panTo(device.position)
        })
        .catch(err => {
          this.error = {
            message: err.status === 404 ? `Device '${marker.name}' not found` : 'Error while fetching data!'
          }
        })
    },
    clear () {
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
    centerMyLocation () {
      this.$refs.gmap.panTo(this.center)
    },
    async doSearch () {
      try {
        if (!this.query || !this.query.length) return
        this.clear()
        await this.$store.dispatch('map/fetchDevice', this.query)
      } catch (err) {
        try {
          await this.$store.dispatch('map/fulltext', this.query)
        } catch (err) {
          this.error = {
            message: err.status === 404 ? `Nothing found for '${this.query}'` : 'Error while fetching data!',
            query: err.status === 404 ? this.query : null
          }
        }
      }
    }
  },
  mounted () {
    let loc = this.$route.query.loc
    let query = this.$route.query.q
    if (loc) {
      let [ lat, lng ] = loc.split(',')
      this.center = { lat: parseFloat(lat), lng: parseFloat(lng) }
    } else {
      this.fetchMyLocation()
    }
    if (query) {
      this.query = query
      this.doSearch()
    }
  }
}
</script>
