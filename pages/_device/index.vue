<template>
  <section class="container">
    <h2>Hello, {{ deviceName }}</h2>
    <temperature-graph :width="800" />
  </section>
</template>

<script>
import TemperatureGraph from '@/components/graphs/TemperatureGraph'

export default {
  components: {
    TemperatureGraph
  },
  validate ({ params }) {
    return params.device.startsWith('D')
  },
  asyncData ({ params }) {
    return {
      deviceName: params.device
    }
  }
}
</script>
