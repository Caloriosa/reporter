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
        chart: {
          type: 'spline'
        },
        series: [
          {
            name: 'Outside',
            data: [
              [ Date.parse('01 Jan 2017 00:00:00 GMT'), 2.4 ],
              [ Date.parse('01 Jan 2017 01:00:00 GMT'), 2.2 ],
              [ Date.parse('01 Jan 2017 02:00:00 GMT'), 2.0 ],
              [ Date.parse('01 Jan 2017 03:00:00 GMT'), 1.6 ],
              [ Date.parse('01 Jan 2017 04:00:00 GMT'), 1.0 ],
              [ Date.parse('01 Jan 2017 05:00:00 GMT'), 0.8 ],
              [ Date.parse('01 Jan 2017 06:00:00 GMT'), 0.6 ],
              [ Date.parse('01 Jan 2017 07:00:00 GMT'), 0.2 ],
              [ Date.parse('01 Jan 2017 08:00:00 GMT'), 0.3 ],
              [ Date.parse('01 Jan 2017 09:00:00 GMT'), 0.6 ],
              [ Date.parse('01 Jan 2017 10:00:00 GMT'), 1.0 ],
              [ Date.parse('01 Jan 2017 11:00:00 GMT'), 1.5 ],
              [ Date.parse('01 Jan 2017 12:00:00 GMT'), 1.9 ],
              [ Date.parse('01 Jan 2017 13:00:00 GMT'), 2.1 ],
              [ Date.parse('01 Jan 2017 14:00:00 GMT'), 2.2 ],
              [ Date.parse('01 Jan 2017 15:00:00 GMT'), 1.8 ],
              [ Date.parse('01 Jan 2017 16:00:00 GMT'), 1.4 ],
              [ Date.parse('01 Jan 2017 18:00:00 GMT'), 1.0 ],
              [ Date.parse('01 Jan 2017 19:00:00 GMT'), 0.6 ],
              [ Date.parse('01 Jan 2017 20:00:00 GMT'), 0.2 ],
              [ Date.parse('01 Jan 2017 21:00:00 GMT'), -0.4 ],
              [ Date.parse('01 Jan 2017 22:00:00 GMT'), -0.8 ]
            ],
            tooltip: {
              valueSuffix: '°C'
            }
          }
        ],
        xAxis: {
          type: 'datetime'
          /* labels: {
            formatter: function () {
              return this.value % 24 + ':00'
            }
          } */
        },
        yAxis: {
          labels: {
            formatter: function () {
              return this.value + '°C'
            }
          }
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
