<template>
  <header>
    <v-navigation-drawer v-if="menu" v-model="drawer" temporary fixed clipped light overflow app>
      <v-list>
        <v-list-tile v-for="item in menu" :key="item.title" :to="item.href" exact>
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
      <v-toolbar-side-icon v-if="menu" class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-4 ml-4">
        {{title}}
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :to="{name: 'map'}" exact>World</v-btn>
        <v-btn flat to="/cloud">Cloud</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    menu: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      drawer: false
    }
  }
}
</script>
