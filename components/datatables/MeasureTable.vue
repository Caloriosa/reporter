<template>
  <v-data-table
    v-bind:headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.date }}</td>
      <td class="text-xs-right">{{ props.item.min }}{{ unit }}</td>
      <td class="text-xs-right">{{ props.item.max }}{{ unit }}</td>
      <td class="text-xs-right">{{ props.item.average }}{{ unit }}</td>
      <td class="text-xs-right">{{ props.item.count }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Date',
          align: 'left',
          value: 'date'
        },
        { text: 'Min', value: 'min' },
        { text: 'Max', value: 'max' },
        { text: 'Average', value: 'average' },
        { text: 'Measures', value: 'count' }
      ]
    }
  }
}
</script>
