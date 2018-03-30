<template>
  <v-toolbar dark clipped-left fixed app>
    <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="mr-4 ml-4">
      {{title}}
    </v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{name: 'index'}" exact>World</v-btn>
      <v-btn flat to="/cloud">Cloud</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
