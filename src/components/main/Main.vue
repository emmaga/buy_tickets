<template>
  <div>
    <m-header></m-header>
    <div class="test">hi</div>
    <m-nav></m-nav>
    <router-view></router-view>
    <m-tourist ref="tourist"></m-tourist>
    <m-buy-ticket ref="buyTicket"></m-buy-ticket>
    <m-refund ref="refund"></m-refund>
    <m-changePW ref="changePW"></m-changePW>
  </div>
</template>

<script>

import MHeader from './MHeader'
import MNav from './MNav'
import MTourist from './MTourist'
import MBuyTicket from './MBuyTicket'
import MRefund from './MRefund'
import MChangePW from './MChangePW'
export default {
  name: 'main-frame',
  data () {
    return {
    }
  },
  components: {
    MHeader, MNav, MTourist, MBuyTicket, MRefund, MChangePW
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../stylus/app'
// .test
//   color: red
a {
  color: #42b983;
}
</style>
