<template>
  <div>
    ticketlist
    <v-server-table url="/otauser" :columns="columns" :options="options">
    </v-server-table>
  </div>
</template>

<script>
import Vue from 'vue'
import {ServerTable} from 'vue-tables-2'
Vue.use(ServerTable)
Vue.component('odl-buy-ticket', {
  template: '<a class="fa fa-edit" href="javascript:void(0);" @click="showBuyTicket">下单</a>',
  methods: {
    showBuyTicket () {
      var bm = this.$parent.$parent.$parent.$refs.buyTicket
      bm.tInfo = this.data
      bm.init()
    }
  },
  props: ['data']
})
export default {
  name: 'ticket-list',
  created () {
  },
  data () {
    return {
      columns: ['OTACode', 'VisitDateStart', 'GoodsID', 'TwoDBarCodeOn', 'SalePrice', 'VisitDateEnd', 'SaleID', 'GoodsName', 'operate'],
      options: {
        filterable: false,
        perPage: 2,
        templates: {
          operate: 'odl-buy-ticket'
        },
        params: {
          action: 'GetOTAProducts',
          count: 99999999999999 // 一页显示数量，不分页
        },
        responseAdapter: function (resp) {
          return {
            data: resp.data.ProductList,
            count: resp.data.ProductList.length
          }
        },
        headings: {
          OTACode: 'OTACode',
          VisitDateStart: 'VisitDateStart',
          GoodsID: 'GoodsID',
          TwoDBarCodeOn: 'TwoDBarCodeOn',
          SalePrice: 'SalePrice',
          VisitDateEnd: 'VisitDateEnd',
          SaleID: 'SaleID',
          GoodsName: 'GoodsName',
          operate: '操作'
        }
      }
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
