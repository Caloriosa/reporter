<template>
  <v-card v-if="visible" class="my-1 fade">
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="close()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-title>
      <div>
        <v-icon color="indigo" large>toys</v-icon>
      </div>
      <div class="px-4">
        <div class="headline">{{ device.title }}</div>
        <span class="grey--text">{{ device.name }}</span>
      </div>
    </v-card-title>
    <v-list two-line>
      <v-list-tile :to="{name: 'profile-user', params: {user: device.user.login}}">
        <v-list-tile-action>
          <v-icon color="indigo">person</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ device.user.login }}</v-list-tile-title>
          <v-list-tile-sub-title>Owner</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="indigo">date_range</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ device.created | date }}</v-list-tile-title>
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
          <v-list-tile-sub-title>Lat: {{ device.position.lat }}, Lng: {{ device.position.lng }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-flex v-if="showLink" column xs12 class="px-4">
      <v-text-field
              name="link"
              label="Device's map link"
              single-line
              readonly
              prepend-icon="link"
              v-model="link"
              @focus="$event.target.select()"
            ></v-text-field>
    </v-flex>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat icon :color="showLink ? 'pink darken-2' :'indigo'" @click="showLink = !showLink">
        <v-icon>link</v-icon>
      </v-btn>
      <v-btn flat icon color="indigo" @click="$emit('locate', device.position)">
        <v-icon>pin_drop</v-icon>
      </v-btn>
      <v-btn flat color="indigo" :to="{name: 'device', params: {device: device.name}}" nuxt>View details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['device'],
  data () {
    return {
      visible: false,
      showLink: false
    }
  },
  computed: {
    link () {
      let url = location ? [location.protocol, '//', location.host, location.pathname].join('') : null
      return `${url}?q=${this.device.name}&loc=${this.device.position.lat},${this.device.position.lng}`
    }
  },
  methods: {
    close () {
      this.visible = false
      this.$emit('close')
    }
  },
  watch: {
    device (newDevice) {
      this.visible = !!newDevice
    }
  }
}
</script>
