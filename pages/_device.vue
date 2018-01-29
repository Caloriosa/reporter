<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex column align-center class="mt-4 mb-4">
        <h1 class="display-3">{{ deviceName }}</h1>
      </v-flex>
    </v-layout>
    <v-layout v-if="current" row wrap>
      <v-flex lg2 v-for="(m, i) in current" :key="i">
        <v-card :color="`${colors[i]} darken-2`" class="white--text">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs9>
                <div>
                  <div class="caption">{{m.type}}</div>
                  <div class="mt-2 mb-2 display-1">{{ m.value }}°C</div>
                  <div class="caption">{{ m.title }}</div>
                </div>
              </v-flex>
              <v-flex xs3 hidden-md-and-down text-xs-center pt-4>
                <v-icon color="white" x-large>{{tIcon(m.type)}}</v-icon>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
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
  },
  methods: {
    tIcon (type) {
      switch (type) {
        case 'TEMPERATURE':
          return 'mdi-thermometer'
        case 'HUMIDITY':
          return 'mdi-water-percent'
        case 'WIND_SPEED':
          return 'mdi-weather-windy'
        default:
          return 'mdi-help'
      }
    }
  }
}
</script>
