<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed clipped light overflow app>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.href">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark clipped-left fixed app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon medium>mdi-thermometer-lines</v-icon>
      </v-btn>
      <v-toolbar-title class="mr-4 ml-4">{{title}}</v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/" exact>World</v-btn>
        <v-btn flat to="/cloud" exact>Cloud</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content app>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <nuxt />
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app>
      Footer
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      title: 'Caloriosa Reporter',
      items: [
        { title: 'Home', icon: 'dashboard', href: '//caloriosa.com' },
        { title: 'World', icon: 'world', href: '/' },
        { title: 'Cloud', icon: 'cloud', href: '/cloud' }
      ]
    }),
    props: {
      source: String
    }
  }
</script>
