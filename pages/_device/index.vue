<template>
  <v-container grid-list-md>
    <v-layout d-block>
      <h1 class="display-3 mt-4 mb-4">{{ deviceName }}</h1>
      <v-layout row wrap>
        <v-flex v-if="current" lg2 v-for="(m, i) in current" :key="i">
          <v-card :color="`${colors[i]} darken-2`" class="white--text">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs9>
                  <div>
                    <small>{{m.type}}</small>
                    <div class="display-1">{{ m.value }}°C</div>
                    <div class="mt-3">{{ m.title }}</div>
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
      <v-layout row wrap>
        <v-flex column md6>
          <temperature-graph />
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import TemperatureGraph from '@/components/graphs/TemperatureGraph'

export default {
  components: {
    TemperatureGraph
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

<style lang="stylus" scoped>
.container.top {
  margin: 0 auto;
}
</style>

