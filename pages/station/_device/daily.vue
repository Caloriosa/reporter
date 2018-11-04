<template>
  <v-container grid-list-md>
    <v-layout d-block>
      <v-layout row wrap>
        <v-flex column xs12>
          <h2 class="headline mb-4">Outside</h2>
          <v-card>
            <temperature-graph />
            <measure-table class="mb-4" :items="measured" unit="°C" />
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import TemperatureGraph from '@/components/graphs/TemperatureGraph'
import MeasureTable from '@/components/datatables/MeasureTable'

export default {
  components: {
    TemperatureGraph,
    MeasureTable
  }
}
</script>
