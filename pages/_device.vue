<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex column align-center class="mt-4 mb-4">
        <h1 class="display-3">{{ deviceName }}</h1>
      </v-flex>
    </v-layout>
      <v-tabs>
        <v-tabs-bar>
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tabs-item nuxt-link router :to="`/${deviceName}`" exact>Overview</v-tabs-item>
          <v-tabs-item nuxt-link router :to="`/${deviceName}/history`" exact>History</v-tabs-item>
        </v-tabs-bar>
      </v-tabs>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  asyncData ({ params }) {
    return {
      deviceName: params.device
    }
  }
}
</script>
