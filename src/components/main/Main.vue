<template>
  <div>
    <h1>{{ msg }}</h1>
    <m-header></m-header>
    <m-nav></m-nav>
    <router-view></router-view>
    <m-tourist ref="tourist"></m-tourist>
    <m-buy-ticket ref="buyTicket"></m-buy-ticket>
  </div>
</template>

<script>
import MHeader from './MHeader'
import MNav from './MNav'
import MTourist from './MTourist'
import MBuyTicket from './MBuyTicket'
export default {
  name: 'main-frame',
  data () {
    return {
      msg: '清云购票平台'
    }
  },
  components: {
    MHeader, MNav, MTourist, MBuyTicket
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
