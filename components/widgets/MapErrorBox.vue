<template>
  <v-card v-if="visible" class="my-1">
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="close()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-title>
    <v-flex column hidden-xs-only sm1 class="text-xs-center">
      <v-icon x-large color="red darken-3">error</v-icon>
    </v-flex>
    <v-flex column xs12 sm11 class="px-3">
      <div class="headline">{{ error.message }}</div>
      <span class="grey--text">
        Please check our query, service status, try reload this page or <nuxt-link to="#">contact support.</nuxt-link>
      </span>
    </v-flex>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="red darken-3" to="#" nuxt>Check Status</v-btn>
      <v-btn v-if="error.query" flat color="red darken-3" :to="`search/${error.query}`" nuxt>Search all</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
  props: ['error'],
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
    error (newError) {
      this.visible = !!newError
    }
  }
}
</script>
