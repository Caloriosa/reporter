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
          <v-progress-circular class="mr-2" v-if="loading" small indeterminate color="primary"></v-progress-circular>
          <v-text-field :prepend-icon="!loading ? 'search' : ''" hide-details single-line v-model="query" @keyup.enter.native="doSearch()"></v-text-field>
          <v-btn icon @click="centerMyLocation()">
            <v-icon>my_location</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card v-if="selected" class="my-1">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="clearDevice()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-title>
            <div>
              <v-icon color="indigo" large>toys</v-icon>
            </div>
            <div class="px-4">
              <div class="headline">{{ selected.label }}</div>
              <span class="grey--text">{{ selected.name }}</span>
            </div>
          </v-card-title>
          <v-list two-line>
            <v-list-tile :to="`/profile/${selected.owner}`">
              <v-list-tile-action>
                <v-icon color="indigo">person</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ selected.owner }}</v-list-tile-title>
                <v-list-tile-sub-title>Owner</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">date_range</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ selected.created }}</v-list-tile-title>
                <v-list-tile-sub-title>Created</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">location_on</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Prague</v-list-tile-title>
                <v-list-tile-sub-title>Lat: {{ selected.position.lat }}, Lng: {{ selected.position.lng }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="indigo" :to="selected.name" nuxt>View details</v-btn>
          </v-card-actions>
          <!-- <h1 class="display-2">Welcome</h1>
          <nuxt-link to="/profile/Ashleynka">Ashleynka</nuxt-link>
          <nuxt-link to="/profile/Ashley">Ashley</nuxt-link> -->
        </v-card>
        <v-card v-if="error" class="my-1">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="error = null">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-title>
          <div>
            <v-icon large color="red darken-3">error</v-icon>
          </div>
          <div class="px-4">
            <div class="headline">{{ error }}</div>
            <span class="grey--text">Please check our query or contact support.</span>
          </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="red darken-3" to="#" nuxt>Contact support</v-btn>
            <v-btn flat color="red darken-3" :to="`search/${this.query}`" nuxt>Search in fulltext</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
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
