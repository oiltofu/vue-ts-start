<template>
  <div class="layout">
    <side-bar></side-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SideBar from './components/sideBar.vue'

@Component({
  components: {
    SideBar
  }
})
export default class Layout extends Vue {

}
</script>

<style lang="scss" scoped>
</style>
