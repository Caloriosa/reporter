<template>
    <div class="graph graph-temperature">
      <div class="chart-container">
        <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
      </div>
      <button @click="fillData()">Randomize</button>
    </div>
</template>

<script>
import VueHighcharts from 'vue2-highcharts'

export default {
  components: {
    VueHighcharts
  },
  props: ['width', 'height'],
  data () {
    return {
      datacollection: null,
      options: {
        series: [
          {
            name: 'Outside',
            data: [
              29.9,
              71.5,
              106.4,
              129.2,
              144.0,
              176.0,
              135.6,
              148.5,
              216.4,
              194.1,
              95.6,
              54.4
            ]
          }
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  align: 'center',
                  verticalAlign: 'bottom',
                  layout: 'horizontal'
                },
                yAxis: {
                  labels: {
                    align: 'left',
                    x: 0,
                    y: -5
                  },
                  title: {
                    text: null
                  }
                },
                subtitle: {
                  text: null
                },
                credits: {
                  enabled: false
                }
              }
            }
          ]
        }
      }
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    generateLabels (count, unit = ':00') {
      let labels = []
      for (let i = 0; i < count; i++) {
        labels.push(`${i}${unit}`)
      }
      return labels
    },
    fillData () {
      this.datacollection = {
        labels: this.generateLabels(24),
        datasets: [
          {
            label: 'Outside',
            backgroundColor: '#1976D2',
            borderColor: '#1976D2',
            fill: false,
            data: this.getRandomInts(24, 22, 35)
          },
          {
            label: 'Inside',
            backgroundColor: '#424242',
            borderColor: '#424242',
            fill: false,
            data: this.getRandomInts(24, 25, 33)
          }
        ]
      }
    },
    getRandomInts (count, min, max) {
      let ints = []
      for (let i = 0; i < count; i++) {
        ints.push(Math.floor(Math.random() * (max - min + 1)) + min)
      }
      return ints
    }
  }
}
</script>

<style lang="scss">
.chart-container {
}
</style>
