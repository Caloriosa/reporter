<template>
  <v-container grid-list-md>
    <v-layout d-block row wrap class="pt-2 pb-2">
      <h1 class="display-3">{{ device.title }}</h1>
      <span class="ml-2 subheading grey--text">{{ device.name }}</span>
    </v-layout>
    <v-layout row wrap>
      <v-flex column xs12 lg9 align-center class="mt-4">
        <v-layout row wrap class="mt-2 mb-2">
          <v-flex xs6 md4 lg3 xl2 v-for="(m, i) in current" :key="i">
            <summary-card :measure="m" :color="colors[i]" />
          </v-flex>
        </v-layout>
        <v-layout>
          <div class="tags">
            <v-chip label color="pink" text-color="white">
              <v-icon left>label</v-icon>Tags
            </v-chip>
            <v-chip label color="green" text-color="white">
              <v-icon left>label</v-icon>Placed
            </v-chip>
            <v-chip label color="yellow" text-color="black">
              <v-icon left>label</v-icon>Here
            </v-chip>
          </div>
        </v-layout>
      </v-flex>
      <v-flex column md12 lg3>
        <v-card>
            <v-list two-line>
              <v-list-tile :to="{name: 'profile-user', params: {user: device.user.login}}">
                <v-list-tile-action>
                  <v-icon>person</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ device.user.login }}</v-list-tile-title>
                  <v-list-tile-sub-title>Owner</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action></v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Prague</v-list-tile-title>
                  <v-list-tile-sub-title>Location</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>date_range</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ device.created | date }}</v-list-tile-title>
                  <v-list-tile-sub-title>Created</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
          <v-tabs :scrollable="false" class="mt-2 mb-3">
            <v-tabs-bar>
              <v-tabs-slider color="primary"></v-tabs-slider>
              <v-tabs-item nuxt :to="{name: 'device', params: {device: device.name}}" exact>Overview</v-tabs-item>
              <v-tabs-item nuxt :to="{name: 'device-daily', params: {device: device.name}}" exact>Daily</v-tabs-item>
              <v-tabs-item nuxt :to="{name: 'device-monthly', params: {device: device.name}}" exact>Monthly</v-tabs-item>
              <v-tabs-item nuxt :to="{name: 'device-yearly', params: {device: device.name}}" exact>Yearly</v-tabs-item>
              <v-tabs-item nuxt :to="{name: 'device-history', params: {device: device.name}}" exact>History</v-tabs-item>
            </v-tabs-bar>
          </v-tabs>
        </v-layout>
    <v-layout row wrap>
      <nuxt-child />
    </v-layout>
  </v-container>
</template>

<script>
import SummaryCard from '@/components/widgets/SummaryCard'
import to from '@/util/to'

export default {
  components: {
    SummaryCard
  },
  head () {
    return {
      title: this.device.title
    }
  },
  async asyncData ({ app, params, error }) {
    let [ err, device ] = await to(app.$axios.$get('/devices/@' + encodeURIComponent(params.device)))
    if (err) {
      return error({ statusCode: err.response ? err.response.status : 500, message: err.message })
    }
    return {
      device,
      current: [
        {
          value: 25.1,
          title: 'Outside',
          type: 'TEMPERATURE'
        },
        {
          value: 23.5,
          title: 'Inside',
          type: 'TEMPERATURE'
        },
        {
          value: 0.65,
          title: 'Outside humidity',
          type: 'HUMIDITY'
        },
        {
          value: 0.52,
          title: 'Inside humidity',
          type: 'HUMIDITY'
        },
        {
          value: 6.7,
          title: 'Wind speed',
          type: 'WIND_SPEED'
        },
        {
          value: 6.7,
          title: 'Wind speed',
          type: 'WIND_SPEED'
        }
      ],
      colors: [ 'primary', 'secondary', 'green', 'red', 'cyan', 'purple', 'orange' ]
    }
  }
}
</script>
