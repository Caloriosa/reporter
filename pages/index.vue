<template>
  <v-layout justify-center>
    <h1 class="display-2">Welcome</h1>
    <nuxt-link to="/profile/Ashleynka">Ashleynka</nuxt-link>
    <nuxt-link to="/profile/Ashley">Ashley</nuxt-link>
  </v-layout>
</template>

<script>
export default {
  asyncData ({ app, error }) {
    app.$axios.$get('/users').catch(err => {
      console.log(err.stack)
      error({statusCode: Number.isInteger(err.status) || 500, message: err.message})
    })
  }
}
</script>
