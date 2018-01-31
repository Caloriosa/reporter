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
        <map-device-info-box :device="selected" @close="clearDevice()" />
        <map-error-box :error="error" :query="query" @close="error = null" />
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
    /* app.$axios.$get('/users').catch(err => {
      console.log(err.stack)
      error({statusCode: Number.isInteger(err.status) || 500, message: err.message})
    }) */
    return {
      center: {lat: 0, lng: 0},
      selected: null,
      query: null,
      zoom: 8,
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
      loading: false,
      error: null
    }
  },
  methods: {
    loadDevice (marker) {
      this.error = null
      this.query = marker.label
      this.selected = marker
      this.$refs.gmap.panTo(marker.position)
    },
    clearDevice () {
      this.selected = null
      this.query = null
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
    doSearch () {
      this.error = null
      this.loading = true
      setTimeout(() => {
        this.selected = null
        this.error = `'${this.query}' not found!`
        this.loading = false
      }, 600)
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
