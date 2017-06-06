<template>
  <div>
    <m-header></m-header>
    <m-nav></m-nav>
    <router-view></router-view>
    <m-tourist ref="tourist"></m-tourist>
    <m-buy-ticket ref="buyTicket"></m-buy-ticket>
    <m-refund ref="refund"></m-refund>
  </div>
</template>

<script>
import MHeader from './MHeader'
import MNav from './MNav'
import MTourist from './MTourist'
import MBuyTicket from './MBuyTicket'
import MRefund from './MRefund'
export default {
  name: 'main-frame',
  data () {
    return {
    }
  },
  components: {
    MHeader, MNav, MTourist, MBuyTicket, MRefund
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
