<template>
  <v-layout row wrap>
    <v-flex xs12 justify-start class="error-msg" :class="`${customError.color} lighten-1`">
      <v-layout column justify-center align-center class="error-container py-5">
        <h3 class="ma-2 display-2" v-text="customError.emoticon"></h3>
        <h1 class="ma-2 display-4" v-text="customError.code"></h1>
        <h4 class="ma-3 headline" v-text="customError.message"></h4>
        <div class="my-4">
          <v-btn outline large color="white" :to="{name: 'index'}" nuxt>Go Home</v-btn>
          <v-btn outline large :color="`${customError.color} darken-4`" to="#" nuxt>Check status</v-btn>
        </div>
      </v-layout>
    </v-flex>
    <v-flex xs12 class="error-footer">
      <v-layout justify-center >
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
  computed: {
    customError () {
      let code = this.error.statusCode || this.error.status || 500
      if (!Number.isInteger(code)) code = 500
      switch (code) {
        case 503:
          return { code, color: 'pink', message: 'Rainbow lost! We\'re doing our best to get it back.', emoticon: '(T.T)' }
        case 500:
          return { code, color: 'red', message: 'We\'re sorry, our unicorn fallen from rainbow!', emoticon: '(-_-)' }
        case 404:
          return { code, color: 'deep-purple', message: 'Doggy coud\'nt sniff you looking for', emoticon: '<(,-,)~' }
        default:
          return { code, color: 'blue-grey', message: 'Rainy days ...', emoticon: '(///)' }
      }
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
</style>
