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
        <div class="headline">{{ device.label }}</div>
        <span class="grey--text">{{ device.name }}</span>
      </div>
    </v-card-title>
    <v-list two-line>
      <v-list-tile :to="`/profile/${device.owner}`">
        <v-list-tile-action>
          <v-icon color="indigo">person</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ device.owner }}</v-list-tile-title>
          <v-list-tile-sub-title>Owner</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="indigo">date_range</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ device.created }}</v-list-tile-title>
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
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat icon color="indigo" @click="$emit('locate', device.position)">
        <v-icon>pin_drop</v-icon>
      </v-btn>
      <v-btn flat color="indigo" :to="device.name" nuxt>View details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['device'],
  data () {
    return {
      visible: false
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
