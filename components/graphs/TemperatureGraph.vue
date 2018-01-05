<template>
    <div class="graph graph-temperature">
      <div class="chart-container">
        <line-chart :chart-data="datacollection" :options="options" :unit="'Temperature °C'" :width="width" :height="height"></line-chart>
      </div>
      <button @click="fillData()">Randomize</button>
    </div>
</template>

<script>
import LineChart from './LineChart.js'

export default {
  components: {
    LineChart
  },
  props: ['width', 'height'],
  data () {
    return {
      datacollection: null,
      options: null
    }
  },
  mounted () {
    this.fillData()
    console.log(this.$api)
    this.$api.users.fetchUsers()
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
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
