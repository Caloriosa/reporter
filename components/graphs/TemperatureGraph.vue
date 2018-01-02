<template>
    <div class="graph graph-temperature">
      <line-chart :chart-data="datacollection" :options="options" :unit="'Temperature °C'" :width="width" :height="height"></line-chart>
      <button @click="fillData()">Randomize</button>
    </div>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  components: {
    LineChart
  },
  props: ['width', 'height'],
  data() {
    return {
      datacollection: null,
      options: null
    };
  },
  mounted() {
    this.fillData();
    console.log(console.log(this.$store.app.$api));
  },
  methods: {
    generateLabels(count, unit = ":00") {
      let labels = [];
      for (let i = 0; i < count; i++) {
        labels.push(`${i}${unit}`);
      }
      return labels;
    },
    fillData() {
      this.datacollection = {
        labels: this.generateLabels(24),
        datasets: [
          {
            label: "Outside",
            backgroundColor: "#f87979",
            borderColor: "#f87979",
            fill: false,
            data: this.getRandomInts(24, 22, 35)
          },
          {
            label: "Inside",
            backgroundColor: "#2d4f60",
            borderColor: "#2d4f60",
            fill: false,
            data: this.getRandomInts(24, 25, 33)
          }
        ]
      };
    },
    getRandomInts(count, min, max) {
      let ints = [];
      for (let i = 0; i < count; i++) {
        ints.push(Math.floor(Math.random() * (max - min + 1)) + min)
      }
      return ints
    }
  }
};
</script>

<style lang="scss">
.graph {
  .graph-temperature {
    max-width: 1000px;
    overflow: auto;
  }
}
</style>
