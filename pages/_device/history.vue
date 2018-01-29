<template>
  <v-container grid-list-md>
    <v-layout d-block>
  <v-layout row wrap>
    <v-flex column md2>
      <v-date-picker v-model="picker"></v-date-picker>
    </v-flex>
    <v-flex column md10>
      <v-card>
        <temperature-graph />
      </v-card>
      <summary-table :items="history" unit="°C" />
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
  data () {
    return {
      picker: null,
      history: [
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
    }
  }
}
</script>
