<template>
  <div>
    <m-header></m-header>
    <m-nav></m-nav>
    <router-view></router-view>
    <m-tourist></m-tourist>
    <m-buy-ticket></m-buy-ticket>
    <m-refund></m-refund>
    <m-changePW></m-changePW>
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
<style lang="stylus">
@import '../../stylus/app'
@import '../../../bower_components/AutoPrefixCSS/lib/vendor'
</style>
