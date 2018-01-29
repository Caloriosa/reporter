<template>
  <v-container grid-list-md>
    <v-layout d-block>
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
      <v-layout row wrap>
        <v-flex column md6>
          <v-card>
            <temperature-graph />
          </v-card>
        </v-flex>
        <v-flex column md6>
          <v-card>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>person</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Home</v-list-tile-title>
                  <v-list-tile-sub-title>Device title</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action></v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Prague</v-list-tile-title>
                  <v-list-tile-sub-title>Location</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>date_range</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>26.1.2016</v-list-tile-title>
                  <v-list-tile-sub-title>Created</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>check</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>6</v-list-tile-title>
                  <v-list-tile-sub-title>Count of sensors</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
          <h3 class="mt-4 mb-2">Temperature</h3>
          <summary-table :items="summary.items" unit="°C" />
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import TemperatureGraph from '@/components/graphs/TemperatureGraph'
import SummaryTable from '@/components/datatables/SummaryTable'

export default {
  components: {
    TemperatureGraph,
    SummaryTable
  },
  asyncData ({ params }) {
    return {
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
      summary: {
        items: [
          {
            title: 'Outside',
            min: -2.2,
            max: 7.6,
            average: 4.4
          },
          {
            title: 'Inside',
            min: 17.6,
            max: 24.7,
            average: 20.1
          }
        ]
      },
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

