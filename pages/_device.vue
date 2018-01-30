<template>
  <v-container grid-list-md>
    <v-layout d-block row wrap class="pt-2 pb-2">
      <h1 class="display-3">{{ deviceName }}</h1>
      <span class="ml-2 subheading grey--text">Any device</span>
    </v-layout>
    <v-layout row wrap>
      <v-flex column xs12 lg9 order-xs2 order-lg1 align-center class="mt-4">
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
        <v-layout row wrap>
          <v-tabs class="mt-2 mb-3">
            <v-tabs-bar>
              <v-tabs-slider color="primary"></v-tabs-slider>
              <v-tabs-item nuxt :to="`/${deviceName}`" exact>Overview</v-tabs-item>
              <v-tabs-item nuxt :to="`/${deviceName}/daily`" exact>Daily</v-tabs-item>
              <v-tabs-item nuxt :to="`/${deviceName}/monthly`" exact>Monthly</v-tabs-item>
              <v-tabs-item nuxt :to="`/${deviceName}/yearly`" exact>Yearly</v-tabs-item>
              <v-tabs-item nuxt :to="`/${deviceName}/history`" exact>History</v-tabs-item>
            </v-tabs-bar>
          </v-tabs>
        </v-layout>
      </v-flex>
      <v-flex column md12 lg3 order-xs1 order-lg2>
        <v-card>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>person</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Home</v-list-tile-title>
                  <v-list-tile-sub-title>Device title</v-list-tile-sub-title>
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
                  <v-list-tile-title>26.1.2016</v-list-tile-title>
                  <v-list-tile-sub-title>Created</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <nuxt-child />
    </v-layout>
  </v-container>
</template>

<script>
import SummaryCard from '@/components/widgets/SummaryCard'

export default {
  components: {
    SummaryCard
  },
  head () {
    return {
      title: this.deviceName
    }
  },
  asyncData ({ params }) {
    return {
      deviceName: params.device,
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
