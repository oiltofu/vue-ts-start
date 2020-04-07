<template>
  <div class="home"
    @click="login">
    home
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  created () {
    this.login()
  }

  login () {
    this.$api.get('/booking/reservation/rate_categories').then(data => {
      console.log(data)
    })
  }
}
</script>
