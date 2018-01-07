import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', (value, format = 'DD.MM.YYYY HH:mm') => {
  if (value) {
    return moment(String(value)).format(format)
  }
})
