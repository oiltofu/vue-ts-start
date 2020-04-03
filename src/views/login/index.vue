<template>
  <div>login</div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
export default class extends Vue {
  created () {
    this.login()
  }

  login () {
    const params = {
      username: 'h5',
      password: 's'
    }
    this.$api.post('/api/user/login', params)
  }
}
</script>
