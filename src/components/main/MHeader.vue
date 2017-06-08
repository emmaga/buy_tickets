<template>

  <div class="navbar navbar-inverse navbar-static-top">
    <div class="container-fluid">
      <div class="navbar-header">
          <a class="navbar-brand">清鹤购票平台</a>
      </div>
      <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a> {{ userName }} </a>
          </li>
          <li>
            <a @click="changePW">修改密码</a>
          </li>
          <li>
            <a @click="exit">
              <i class="glyphicon glyphicon-lock"></i> 退出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
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
      this.$bus.$emit('changePWInit')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
