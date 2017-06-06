<template>
  <nav>
    订单中心
    <router-link to="ticketList">手动下单</router-link>
    <router-link to="orderList">订单查询</router-link>
    <!--<router-link to="statement">已导出报表</router-link>-->
  </nav>
</template>

<script>
export default {
  name: 'm-nav',
  data: function () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
