<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex column align-center class="mt-4 mb-4">
        <h1 class="display-3">{{ deviceName }}</h1>
      </v-flex>
    </v-layout>
    <v-layout v-if="current" row wrap>
      <v-flex lg2 v-for="(m, i) in current" :key="i">
        <summary-card :measure="m" :color="colors[i]" />
      </v-flex>
    </v-layout>
      <v-tabs class="mt-3 mb-3">
        <v-tabs-bar>
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tabs-item nuxt-link router :to="`/${deviceName}`" exact>Overview</v-tabs-item>
          <v-tabs-item nuxt-link router :to="`/${deviceName}/daily`" exact>Daily</v-tabs-item>
          <v-tabs-item nuxt-link router :to="`/${deviceName}/monthly`" exact>Monthly</v-tabs-item>
          <v-tabs-item nuxt-link router :to="`/${deviceName}/yearly`" exact>Yearly</v-tabs-item>
          <v-tabs-item nuxt-link router :to="`/${deviceName}/history`" exact>History</v-tabs-item>
        </v-tabs-bar>
      </v-tabs>
    <nuxt-child />
  </v-container>
</template>

<script>
import SummaryCard from '@/components/widgets/SummaryCard'

export default {
  components: {
    SummaryCard
  },
  asyncData ({ params }) {
    return {
      deviceName: params.device,
      current: [
        {
          value: 25.1,
          title: 'Outside',
          type: 'TEMPERATURE'
        },
        {
          value: 23.5,
          title: 'Inside',
          type: 'TEMPERATURE'
        },
        {
          value: 0.65,
          title: 'Outside humidity',
          type: 'HUMIDITY'
        },
        {
          value: 0.52,
          title: 'Inside humidity',
          type: 'HUMIDITY'
        },
        {
          value: 6.7,
          title: 'Wind speed',
          type: 'WIND_SPEED'
        }
      ],
      colors: [ 'primary', 'secondary', 'green', 'red', 'cyan', 'purrple' ]
    }
  }
}
</script>
