<template>
  <v-card v-if="visible" class="my-1">
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
      <div class="headline">{{ error.message }}</div>
      <span class="grey--text">Please check our query or contact support.</span>
    </div>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="red darken-3" to="#" nuxt>Contact support</v-btn>
      <v-btn v-if="error.query" flat color="red darken-3" :to="`search/${error.query}`" nuxt>Search in fulltext</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
  props: ['error', 'query'],
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
