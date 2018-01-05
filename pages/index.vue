<template>
  <section>
    <h1 class="display-2">Welcome</h1>
  </section>
</template>

<script>
export default {
  asyncData ({ app, error }) {
    console.log(app.$api)
    return app.$api.users.fetchUsers().catch(err => {
      console.log('error')
      error({statusCode: Number.isInteger(err.status) || 403, message: err.message})
    })
  }
}
</script>
