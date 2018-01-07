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
    console.log(app.$api)
    app.$api.users.fetchUsers().catch(err => {
      console.log('error')
      error({statusCode: Number.isInteger(err.status) || 500, message: err.message})
    })
  }
}
</script>
