<template>
    <div class="graph graph-temperature">
      <div class="chart-container">
        <vue-highcharts :options="options" ref="lineChart"></vue-highcharts>
      </div>
      <div class="text-xs-center">
        <v-btn color="primary" @click="fillData()">Randomize</v-btn>
      </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['width', 'height'],
  data () {
    return {
      datacollection: null,
      options: {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Temperature'
        },
        subtitle: {
          text: 'Last 24 hours'
        },
        series: [],
        xAxis: {
          type: 'datetime'
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
    clearData () {
      let chart = this.$refs.lineChart
      if (!chart.series) return
      for (let i = 0; i < chart.series.length; i++) {
        chart.series[i].remove()
      }
    },
    fillData () {
      let chart = this.$refs.lineChart
      chart.removeSeries()
      chart.addSeries({
        name: 'Outside',
        data: this.getRandoms(23, -2, 7),
        tooltip: {
          valueSuffix: '°C',
          valueDecimals: 2
        }
      })
      chart.addSeries({
        name: 'Inside',
        data: this.getRandoms(23, 16, 25),
        tooltip: {
          valueSuffix: '°C',
          valueDecimals: 2
        }
      })
    },
    getRandoms (count, min, max) {
      let ints = []
      for (let i = 0; i < count; i++) {
        ints.push([moment(new Date('2017-01-26')).add(i, 'hours').valueOf(), Math.random() * (max - min + 1) + min])
      }
      return ints
    }
  }
}
</script>
