<template>
  <v-layout d-block>
    <v-layout row>
      <v-flex xs12>
        <v-card tile :color="colorize(userLogin)" class="white--text">
          <v-container pa-5>
            <v-layout row justify-center>
              <v-avatar class="teal" size="80px">
                <span class="white--text headline">{{ userLogin[0].toUpperCase() }}</span>
              </v-avatar>
              </v-layout>
            <v-layout row justify-center>
              <v-card-title primary-title>
                <div>
                  <h2 class="display-1">{{ userLogin }}</h2>
                  <span>@{{ userLogin }}</span>
                </div>
              </v-card-title>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 md8>
          sjfhsdkjfgsdglkjkljl
        </v-flex>
        <v-flex xs12 md4>
          <v-card>
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon :color="colorize(userLogin)">person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Foo Bar</v-list-tile-title>
              <v-list-tile-sub-title>Fullname</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>@{{ userLogin }}</v-list-tile-title>
              <v-list-tile-sub-title>Username</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon :color="colorize(userLogin)">date_range</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>7.1.2018 15:45</v-list-tile-title>
              <v-list-tile-sub-title>Registered</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon :color="colorize(userLogin)">check</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Activated</v-list-tile-title>
              <v-list-tile-sub-title>Is account activated?</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import colorize from '@/util/colorize'

export default {
  asyncData ({ params }) {
    return {
      userLogin: params.user
    }
  },
  methods: {
    colorize
  }
}
</script>
