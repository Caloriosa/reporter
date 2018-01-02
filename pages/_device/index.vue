<template>
  <h2>Hello, {{ deviceName }}</h2>
</template>

<script>
export default {
  validate ({ params }) {
    return params.device.startsWith("D");
  },
  asyncData({ params }) {
    return {
      deviceName: params.device
    }
  },
  created() {
    console.log(this.$nuxt)
  }
}
</script>
