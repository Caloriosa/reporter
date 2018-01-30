<template>
  <v-container justify-center>
    <v-layout>
      <gmap-map
        :center="center"
        :zoom="8"
        map-type-id="terrain"
        style="width: 100%; height: 100%; position: absolute; left:0; top:0; z-index: 0"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :title="m.label"
          :clickable="true"
          :draggable="true"
          @click="selected = m"
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
          <v-text-field prepend-icon="search" hide-details single-line></v-text-field>
          <v-btn icon>
            <v-icon>my_location</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card v-if="selected" class="my-2">
          <v-layout column justify-end>
            <v-card-title>
              <div>
                <div class="headline">{{ selected.label }}</div>
                <span class="grey--text">{{ selected.name }}</span>
              </div>
              <v-spacer></v-spacer>
              <v-btn icon @click="selected = null">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>
          </v-layout>
          <v-list two-line>
            <v-list-tile>
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
            <v-list-tile @click="center = selected.position">
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
      center: {lat: 50, lng: 16},
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
      }]
    }
  }
}
</script>
