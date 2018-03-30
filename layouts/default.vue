<template>
  <v-app>
    <Header :title="title" :menu="items" />
    <v-content app>
        <nuxt />
    </v-content>
    <v-footer app class="pa-4">
      <span>Powered by <a href="#">Caloriosa Reporter</a></span>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} Caloriosa</div>
      <ul class="footer-menu">
        <li><a href="#">Terms</a></li>
        <li><a href="#">Status</a></li>
        <li><a href="#">Homepage</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Github</a></li>
      </ul>
    </v-footer>
  </v-app>
</template>

<script>
  import Header from '@/components/Header'
  
  export default {
    components: {
      Header
    },
    data () {
      return {
        title: 'Caloriosa World',
        items: [
          { title: 'World', description: 'World map', icon: 'mdi-earth', href: '/' },
          { title: 'Cloud', description: 'Tag cloud', icon: 'cloud', href: '/cloud' }
        ]
      }
    },
    props: {
      source: String
    }
  }
</script>
