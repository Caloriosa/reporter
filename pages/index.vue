<template>
  <section class="container">
    <div class="small">
      <line-chart :chart-data="datacollection" :options="options" :width="1000"></line-chart>
      <button @click="fillData()">Randomize</button>
    </div>
  </section>
</template>

<script>
import LineChart from '@/components/LineChart.js'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: null,
      options: {
        responsive: false,
        maintainAspectRatio: false}
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    generateLabels (count, unit = 'h') {
      let labels = []
      for (let i = 0; i < count; i++) {
        labels.push(`${i} ${unit}`)
      }
      return labels
    },
    fillData () {
      this.datacollection = {
        labels: this.generateLabels(24),
        datasets: [
          {
            label: 'Outside',
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            fill: false,
            data: this.getRandomInts(24, -10, 10)
          },
          {
            label: 'Inside',
            backgroundColor: '#2d4f60',
            borderColor: '#2d4f60',
            fill: false,
            data: this.getRandomInts(24, 10, 25)
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
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.small {
    max-width: 1200px;
    margin:  150px auto;
  }
</style>
