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
    <v-toolbar dark clipped-left fixed app>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-4 ml-4">
        <v-icon>mdi-thermometer-lines</v-icon>
        {{title}}
      </v-toolbar-title>
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
