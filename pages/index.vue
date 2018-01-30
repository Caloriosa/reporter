<template>
  <v-container justify-center>
    <v-layout>
      <gmap-map
        :center="{lat:50, lng:16}"
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
          @click="center=m.position"
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
        <v-card>
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
      markers: [{
        position: {lat: 50.2, lng: 14.372},
        label: 'MyDevice'
      }, {
        position: {lat: 50.117, lng: 14.227},
        label: 'YourDevice'
      }]
    }
  }
}
</script>
