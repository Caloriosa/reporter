<template>
  <h2>Hello, {{ deviceName }}</h2>
</template>

<<script>
export default {
  asyncData({ params }) {
    return {
      deviceName: params.device
    }
  }
}
</script>
