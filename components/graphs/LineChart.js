// LineChart.js
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  props: ['options', 'title', 'xLabel', 'yLabel'],
  mixins: [reactiveProp],
  created() {
    this.defaultOptions = {
      responsive: false,
      maintainAspectRatio: false,
      title: {
        text: this.title
      },
      scales: {
        xAxes: {
          scaleLabel: {
            display: true,
            labelString: this.yLabel || ''
          }
        },
        yAxes: [
          {
            ticks: {
              beginAtZero: false
            },
            scaleLabel: {
              display: true,
              labelString: this.yLabel || ''
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
