<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary fixed clipped light overflow app>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.href" exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <Header :title="title" />
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
  import Header from '@/components/Header.vue'
  export default {
    components: {
      Header
    },
    data: () => ({
      drawer: false,
      title: 'Caloriosa World',
      items: [
        { title: 'World map', icon: 'mdi-earth', href: '/' },
        { title: 'Tag cloud', icon: 'cloud', href: '/cloud' },
        { title: 'Popular', icon: 'star', href: '/popular' }
      ]
    }),
    props: {
      source: String
    }
  }
</script>
