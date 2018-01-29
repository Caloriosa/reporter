<template>
  <v-container grid-list-md>
    <v-layout d-block>
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

