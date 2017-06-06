<template>
  <div class="col-sm-9 col-right page">
    <a>
      <strong>
        <i class="glyphicon glyphicon-barcode"></i>
        订单中心
        <i class="glyphicon glyphicon-chevron-right"></i>
        手动下单
      </strong>
    </a>
    <hr>

    <!--账户余额-->
    <div class="row" v-if="account.prePayment">
      <div class="col-xs-4">
        <div class="panel panel-warning scoreboard">
            <div class="panel-heading">当前账户余额</div>
            <div class="panel-body">¥ {{ account.paymentAmount | fenToYuan }}</div>
        </div>
      </div>
    </div>

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
  template: '<a class="btn btn-sm btn-primary" href="javascript:void(0);" @click="showBuyTicket">下单</a>',
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
      columns: ['GoodsName', 'SalePrice', 'VisitDateStart', 'VisitDateEnd', 'OTACode', 'GoodsID', 'SaleID', 'TwoDBarCodeOn', 'operate'],
      options: {
        filterable: false,
        perPage: 2,
        templates: {
          operate: 'odl-buy-ticket'
        },
        sortIcon: {
          up:'',
          down:''
        },
        params: {
          action: 'GetOTAProducts',
          count: 99999999999999 // 一页显示数量，不分页
        },
        responseAdapter: function (resp) {
          let data = resp.data.ProductList
          data.map(function (item, index, input) {
            item.TwoDBarCodeOn = item.TwoDBarCodeOn ? '否' : '是'
            return item
          })
          return {
            data: data,
            count: data.length
          }
        },
        headings: {
          OTACode: '分销商码',
          VisitDateStart: '游玩开始时间',
          GoodsID: '商品码',
          TwoDBarCodeOn: '启用二维码',
          SalePrice: '单价',
          VisitDateEnd: '游玩结束时间',
          SaleID: '销售码',
          GoodsName: '商品名',
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
