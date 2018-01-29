<template>
  <v-tooltip bottom>
  <v-card :color="color" class="white--text" slot="activator">
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex column>
          <div>
            <div class="caption">{{measure.type}}</div>
            <div class="mt-2 mb-2 headline">{{ tValue(measure) }}</div>
            <div class="caption">{{ measure.title }}</div>
          </div>
        </v-flex>
        <v-flex column hidden-sm-and-down text-xs-center pt-4 d-inline-flex>
          <v-icon color="white" x-large>{{tIcon(measure.type)}}</v-icon>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
  <span>Last measured: xxx</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    unit: {
      type: String
    },
    measure: {
      type: Object,
      required: true
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
    },
    tValue (measure) {
      switch (measure.type) {
        case 'TEMPERATURE':
          return `${measure.value} ${this.unit || '°C'}`
        case 'HUMIDITY':
          return (measure.value * 100) + '%'
        case 'WIND_SPEED':
          return `${measure.value} ${this.unit || 'm/s'}`
        default:
          return measure.value
      }
    }
  }
}
</script>
