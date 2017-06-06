<template>
  <div class="col-sm-3 col-left">
    <a class="font-bold no-underline cursor-default">
      <i class="glyphicon glyphicon-barcode"></i> 订单中心
      <i class="glyphicon glyphicon-chevron-down pull-right margin-right-15"></i>
    </a>
    <ul class="nav nav-stacked collapse in">
      <hr>
      <li class="nav-header">
        <router-link to="ticketList">手动下单</router-link>
      </li>
      <li class="nav-header">
        <router-link to="orderList">订单查询</router-link>
      </li>
    </ul>
    <!--<router-link to="statement">已导出报表</router-link>-->
  </div class="">
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
