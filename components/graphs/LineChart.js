// LineChart.js
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  props: ['options'],
  mixins: [reactiveProp],
  created() {
    this.defaultOptions = {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
