<template>
  <div class="hello">
    orderlist
    <v-server-table url="/otauser" :columns="columns" :options="options">
    </v-server-table>
  </div>
</template>

<script>
import Vue from 'vue'
import {ServerTable} from 'vue-tables-2'
Vue.use(ServerTable)
Vue.component('odl_tourist', {
  template: '<a class="fa fa-edit" href="javascript:void(0);" @click="show_tourist">游客</a>',
  methods: {
    show_tourist () {
      console.log(this.data.orderId)
    }
  },
  props: ['data']
})
// let that
export default {
  name: 'order-list',
  created () {
    // that = this
    // this.init()
  },
  data () {
    return {
      columns: ['orderId', 'partnerName', 'orderCreateTime', 'returnedTickets', 'isExpired', 'bookMobile', 'visitDateStart', 'bookPerson', 'parterOrderId', 'totalTickets', 'price', 'bookerID', 'checkStatus', 'checkedTickets', 'visitDateEnd', 'goodsName', 'userOrderId', 'bookerIDType', 'waitingTickets', 'operate'],
      options: {
        perPage: 2,
        templates: {
          operate: 'odl_tourist'
        },
        params: {
          action: 'GetOTAOrderListByPage',
          sortBy: 'OrderCreateTime',
          orderBy: 'desc',
          count: 2, // 一页显示数量
          search: {
            orderId: '',
            parterOrderId: '',
            bookPerson: '',
            bookMobile: '',
            bookerIDType: '',
            bookerID: '',
            goodsName: '',
            checkStatus: 'all',
            partnerName: '',
            orderCreateDateStart: '',
            orderCreateDateEnd: '',
            visitDateStart: '',
            visitDateEnd: '',
            checkDateStart: '',
            checkDateEnd: '',
            isExpired: 'all',
            orderTicketCode: ''
          }
        },
        responseAdapter: function (resp) {
          return {
            data: resp.data.orders.lists,
            count: resp.data.orders.totalCount
          }
        },
        headings: {
          orderId: '订单号',
          partnerName: '分销商',
          orderCreateTime: '下单时间',
          returnedTickets: '已退',
          isExpired: '过期',
          bookMobile: '手机号',
          visitDateStart: '游玩开始日期',
          bookPerson: '预订人',
          parterOrderId: '分销商订单号',
          totalTickets: '数量',
          price: '单价',
          bookerID: 'bookerID',
          checkStatus: '状态',
          checkedTickets: '已检',
          visitDateEnd: '游玩结束日期',
          goodsName: '票名',
          userOrderId: 'userOrderId',
          bookerIDType: 'bookerIDType',
          waitingTickets: '待检',
          operate: '操作'
        }
      }
    }
  },
  methods: {
    // init () {
    //   // this.getTicketsList()
    // }
    // getTicketsList () {
    //   this.axios.post('/otauser', {
    //     action: 'GetOTAProducts'
    //   })
    //   .then(function (response) {
    //     let data = response.data
    //     console.log(data)
    //     that.tableData = data.ProductList
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
    // }
  },
  components: {
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
