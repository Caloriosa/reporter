<template>
  <v-app>
    <v-layout justify-start>
      <v-layout class="error-msg" :class="`${customError.color} lighten-1`" column justify-center align-center>
        <h3 class="ma-2 display-2" v-text="customError.emoticon"></h3>
        <h1 class="ma-2 display-4" v-text="customError.code"></h1>
        <h4 class="ma-3 headline" v-text="customError.message"></h4>
        <div class="ma-4">
          <v-btn outline large color="white" to="/">Go Home</v-btn>
          <v-btn outline large :color="`${customError.color} darken-4`" to="/">Check status</v-btn>
        </div>
      </v-layout>
    </v-layout>
    <v-layout row justify-center class="white">
      fsdsdf
    </v-layout>
  </v-app>
</template>

<script>
export default {
  props: ['error'],
  computed: {
    customError () {
      let code = this.error.statusCode
      switch (code) {
        case 503:
          return { code, color: 'pink', message: 'Rainbow lost! We\'re doing our best to get it back.', emoticon: '(T.T)' }
        case 500:
          return { code, color: 'red', message: 'We\'re sorry, our unicorn fallen from rainbow!', emoticon: '(-_-)' }
        case 404:
          return { code, color: 'deep-purple', message: 'Doggy coud\'nt sniff you looking for', emoticon: '<(,-,)~' }
        default:
          return { code, color: 'grey', message: 'Rainy days ...', emoticon: '(///)' }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .error-msg {
    max-height 60vh;
  }
</style>
