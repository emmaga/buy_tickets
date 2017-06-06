<template>
  <header>
    header
    {{ userName }}
    <a @click="changePW">修改密码</a>
    <a @click="exit">退出</a>
  </header>
</template>

<script>
import {clearParam} from '@/utils'
export default {
  name: 'm-header',
  data () {
    return {
    }
  },
  computed: {
    userName () {
      this.$store.commit('getUserName')
      return this.$store.state.userName
    }
  },
  created () {
  },
  methods: {
    exit () {
      clearParam('clearToken')
      this.$store.commit('delUserName')
      this.$router.push('/login')
    },
    changePW () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
