<template>
  <section class="container">
    <h1>Welcome</h1>
  </section>
</template>

<script>
export default {
  asyncData ({ app }) {
    console.log(app.$api)
    app.$api.users.fetchUsers()
  }
}
</script>
