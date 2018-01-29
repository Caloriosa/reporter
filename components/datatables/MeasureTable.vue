<template>
  <v-data-table
    v-bind:headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.date }}</td>
      <td class="text-xs-right">{{ props.item.value }}{{ unit }}</td>
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
          text: 'Date & Time',
          align: 'left',
          value: 'date'
        },
        { text: 'Value', value: 'value' }
      ]
    }
  }
}
</script>
