<template>
  <v-layout row wrap>
    <v-flex column md12 lg4>
      <v-date-picker v-model="picker"></v-date-picker>
    </v-flex>
    <v-flex column md12 lg8>
      {{ picker }}
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      picker: null
    }
  }
}
</script>
