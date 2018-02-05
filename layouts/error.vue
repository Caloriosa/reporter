<template>
  <v-layout row wrap>
    <v-flex xs12 justify-start class="error-msg" :class="`${customError.color} lighten-1`">
      <v-layout column justify-center align-center class="error-container py-5">
        <div class="ma-2 display-2">
          <v-icon color="white" class="big-icon">{{ customError.emoticon }}</v-icon>
        </div>
        <h1 class="ma-2 display-4" v-text="customError.code"></h1>
        <h4 class="ma-3 headline" v-text="customError.message"></h4>
        <div class="my-4">
          <v-btn outline large color="white" :to="{name: 'index'}" nuxt>Go Home</v-btn>
          <v-btn outline large :color="`${customError.color} darken-4`" to="#" nuxt>Check status</v-btn>
        </div>
      </v-layout>
    </v-flex>
    <v-flex xs12 justify-center class="my-2">
      <v-container justify-center>
      <v-layout row wrap justify-center class="py-3">
          <v-flex column md6 lg4 justify-center>
            <v-toolbar class="elevation-0 transparent">
              <v-text-field prepend-icon="search" hide-details single-line v-model="query" @keyup.enter.native="doSearch()"></v-text-field>
            </v-toolbar>
          </v-flex>
      </v-layout>
      </v-container>
    </v-flex>
    <v-flex xs12 justify-center>
      <v-layout justify-center>
          <ul class="error-menu">
            <li><a href="#">Contact Support</a></li>
            <li><a href="#">Main Page</a></li>
            <li><a href="#">Github Issues</a></li>
          </ul>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['error'],
  data () {
    return {
      query: null
    }
  },
  computed: {
    customError () {
      let code = this.error.statusCode || this.error.status || 500
      if (!Number.isInteger(code)) code = 500
      switch (code) {
        case 503:
          return { code, color: 'pink', message: 'Rainbow lost! We\'re doing our best to get it back.', emoticon: 'mdi-looks' }
        case 500:
          return { code, color: 'red', message: 'We\'re sorry, our unicorn fallen from rainbow!', emoticon: 'mdi-emoticon-dead' }
        case 404:
          return { code, color: 'deep-purple', message: 'Doggy coud\'nt sniff you looking for', emoticon: 'mdi-paw' }
        default:
          return { code, color: 'blue-grey', message: 'Rainy days ...', emoticon: 'mdi-weather-lightning-rainy' }
      }
    }
  },
  methods: {
    doSearch () {
      if (!this.query) return
      this.$router.replace('/search/' + this.query)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .error-footer {
    margin: 6vh 0;
  }
  .error-container {
    min-height: 50vh;
  }
  ul.error-menu {
    li {
      display: inline-block;
      margin: 1.5vw;
    }
  }
  .transparent {
    background: transparent;
  }
  .big-icon {
    font-size: 1.5em;
  }
</style>
