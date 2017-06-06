<template>
  <div>
    ticketlist
    <!--账户余额-->
    <div v-if="account.prePayment">当前账户余额 {{ account.paymentAmount | fenToYuan }}</div>
    <!--票列表-->
    <v-server-table url="/otauser" :columns="columns" :options="options">
    </v-server-table>
  </div>
</template>

<script>
import Vue from 'vue'
import {ServerTable} from 'vue-tables-2'
import {getParam} from '@/utils'
import {getFenToYuan} from '@/utils/filters'
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
let that
export default {
  name: 'ticket-list',
  created () {
    that = this
    this.getAccountInfo()
  },
  data () {
    return {
      account: {
        prePayment: 0,
        paymentAmount: 0
      },
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
    getAccountInfo () {
      this.axios.post('/partners', {
        action: 'GetOTADetail',
        data: {
          OTACode: getParam('OTACode')
        }
      })
      .then(function (response) {
        let data = response.data.data
        console.log(data.PrePayment)
        that.account.prePayment = data.PrePayment
        that.account.paymentAmount = data.PaymentAmount
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  filters: {
    fenToYuan: function (fen) {
      return getFenToYuan(fen)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
