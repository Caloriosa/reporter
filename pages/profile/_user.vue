<template>
  <v-layout d-block>
    <v-layout row>
      <v-flex xs12>
        <v-card tile :color="color" class="white--text">
          <v-container pa-5>
            <v-layout row justify-center>
              <v-avatar class="teal" size="80px">
                <span class="white--text headline">X</span>
              </v-avatar>
              </v-layout>
            <v-layout row justify-center>
              <v-card-title primary-title>
                <div>
                  <h2 class="display-1">{{ user.name ? user.name : user.login }}</h2>
                  <span>@{{ user.login }}</span>
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
                  <v-icon :color="color">person</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ user.name ? user.name : '-' }}</v-list-tile-title>
                  <v-list-tile-sub-title>Fullname</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action></v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>@{{ user.login }}</v-list-tile-title>
                  <v-list-tile-sub-title>Username</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider inset></v-divider>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon :color="color">date_range</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ user.createdAt | date }}</v-list-tile-title>
                  <v-list-tile-sub-title>Registered</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon :color="color">check</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ user.activated ? 'Activated' : 'Not Activated' }}</v-list-tile-title>
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
  async asyncData ({ app, params, error }) {
    try {
      let user = (await app.$axios.$get(`/users/@${encodeURIComponent(params.user)}`)).content
      let color = colorize(user.login)
      return {
        user,
        color,
        userLogin: params.user
      }
    } catch (err) {
      let statusCode = parseInt(err.response && err.response.status) || 500
      error({statusCode, message: err.message})
    }
  },
  methods: {
    colorize
  }
}
</script>
