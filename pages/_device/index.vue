<template>
  <v-container grid-list-md>
    <v-layout d-block>
      <v-layout row wrap>
        <v-flex column xs12 lg7>
          <v-card>
            <temperature-graph />
          </v-card>
        </v-flex>
        <v-flex column xs 12 lg5>
          <summary-table class="mb-4" :items="summary.items" unit="°C" />
          <measure-table class="mb-4" :items="measured" unit="°C" />
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import TemperatureGraph from '@/components/graphs/TemperatureGraph'
import SummaryTable from '@/components/datatables/SummaryTable'
import MeasureTable from '@/components/datatables/MeasureTable'

export default {
  components: {
    TemperatureGraph,
    SummaryTable,
    MeasureTable
  },
  asyncData ({ params }) {
    return {
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

