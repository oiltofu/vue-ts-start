<template>
  <div class="home"
    @click="test">
    home
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue } from 'vue-property-decorator'
import HttpService from '../http'
export default class Home extends Vue {
  created () {
    console.log('home created')
  }

  test () {
    const httpService = new HttpService()
    httpService.init()
  }
}
</script>
