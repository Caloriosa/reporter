<template>
  <v-app class="pink">
    <v-container class="error" fluid fill-height>
      <v-layout justify-center align-center>
        <v-layout column align-center justify-center>
          <h1 class="ma-2 display-4" v-text="error.statusCode"></h1>
          <h4 class="ma-3 headline" v-if="error.statusCode === 404">We're sorry, we could'nt find you looking for</h4>
          <h4 class="ma-3 headline" v-else>An error occured</h4>
          <v-btn class="ma-4" outline large color="white" to="/">Go Home</v-btn>
        </v-layout>
      </v-layout>
    </v-container>
    <v-layout row justify-center class="white bottom-side">
      
    </v-layout>
  </v-app>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style lang="stylus" scoped>
  .bottom-side {
    height 5em;
  }
  .error {
    max-height 60vh;
  }
</style>
