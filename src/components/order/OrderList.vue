<template>
  <div class="hello">
    <!--检票状态-->
    <select v-model="checkStatus">
      <option value="all">全部检票状态</option>
      <option value="checked">已检票</option>
      <option value="checking">检票中</option>
      <option value="waiting">待检票</option>
    </select>
    <!--是否过期-->
    <select v-model="isExpired">
      <option value="all">已过期及未过期</option>
      <option value="yes">已过期</option>
      <option value="no">未过期</option>
    </select>
    <!--成交时间范围-->
    成交时间范围 <input id="orderCreateDateRange" type="text" name="daterange" />
    <!--游玩时间范围-->
    游玩时间范围 <input id="visitDateRange" type="text" name="daterange" />
    <!--检票时间范围-->
    检票时间范围 <input id="checkDateRange" type="text" name="daterange" />
    <!--预订人姓名-->
    <input v-model="bookPerson" placeholder="预订人姓名">
    <!--预订人手机号-->
    <input v-model="bookMobile" placeholder="预订人手机号">
    <!--辅助码-->
    <input v-model="orderTicketCode" placeholder="辅助码">
    <!--分销商订单号-->
    <input v-model="parterOrderId" placeholder="分销商订单号">
    <!--景区订单号-->
    <input v-model="orderId" placeholder="景区订单号">
    <!--商品名-->
    <input v-model="goodsName" placeholder="商品名">
    <!--证件类型-->
    <select v-model="bookerIDType">
      <option value="ID_CARD">身份证</option>
      <option value="ERTONG">儿童无证件</option>
      <option value="GANGAO">港澳通行证</option>
      <option value="HUZHAO">护照</option>
      <option value="SHIBING">士兵证</option>
      <option value="JUNGUAN">军官证</option>
      <option value="HUKOUBO">户口薄</option>
      <option value="CHUSHENGZHENGMING">出生证明</option>
      <option value="TAIBAO">台湾通行证</option>
      <option value="TAIBAOZHENG">台胞证</option>
      <option value="OTHER">其他</option>
    </select>
    <!--证件号-->
    <input v-model="bookerID" placeholder="证件号">
    <!--搜索按钮-->
    <a @click="this.search">search</a>
    <!--订单列表-->
    <v-server-table ref="table" url="/otauser" :columns="columns" :options="options">
    </v-server-table>
  </div>
</template>

<script>
import $ from '@/utils/jquery-v'
import Vue from 'vue'
import {ServerTable} from 'vue-tables-2'
import moment from 'moment'
Vue.use(ServerTable)
Vue.component('odl-tourist', {
  template: '<a class="fa fa-edit" href="javascript:void(0);" @click="showTourist">游客</a>',
  methods: {
    showTourist () {
      var tm = this.$parent.$parent.$parent.$refs.tourist
      tm.orderId = this.data.orderId
      tm.init()
    }
  },
  props: ['data']
})
Vue.component('odl-refund', {
  template: '<button :disabled="disabled" class="fa fa-edit" href="javascript:void(0);" @click="showRefund">退票</button>',
  methods: {
    showRefund () {
      var rm = this.$parent.$parent.$parent.$refs.refund
      rm.orderId = this.data.orderId
      rm.waitingCheck = this.data.waitingTickets
      rm.init()
    }
  },
  computed: {
    disabled () {
      return this.data.waitingTickets === 0
    }
  },
  props: ['data']
})
let that
let initStartCreateTime = new Date().getTime()
let initEndCreateTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).getTime()
export default {
  name: 'order-list',
  created () {
    that = this
    // this.init()
    $(function () {
      // orderCreateDateRange
      $('input[id="orderCreateDateRange"]').daterangepicker({
        locale: {
          format: 'YYYY-MM-DD',
          applyLabel: '确定',
          cancelLabel: '清空'
        },
        startDate: moment(initStartCreateTime).format('YYYY-MM-DD'),
        endDate: moment(initEndCreateTime).format('YYYY-MM-DD')
      },
      function (start, end, label) {
        that.$data.orderCreateDateStart = new Date(start._d).getTime()
        that.$data.orderCreateDateEnd = new Date(end._d).getTime()
        // alert('A new date range was chosen: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'))
      })
      $('input[id="orderCreateDateRange"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('')
        that.$data.orderCreateDateStart = ''
        that.$data.orderCreateDateEnd = ''
      })

      // visitDateRange
      $('input[id="visitDateRange"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
          format: 'YYYY-MM-DD',
          applyLabel: '确定',
          cancelLabel: '清空'
        }
      },
      function (start, end, label) {
        that.$data.visitDateStart = new Date(start._d).getTime()
        that.$data.visitDateEnd = new Date(end._d).getTime()
        // alert('A new date range was chosen: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'))
      })
      $('input[id="visitDateRange"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('')
        that.$data.visitDateStart = ''
        that.$data.visitDateEnd = ''
      })
      $('input[id="visitDateRange"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'))
      })

      // checkDateRange
      $('input[id="checkDateRange"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
          format: 'YYYY-MM-DD',
          applyLabel: '确定',
          cancelLabel: '清空'
        }
      },
      function (start, end, label) {
        that.$data.checkDateStart = new Date(start._d).getTime()
        that.$data.checkDateEnd = new Date(end._d).getTime()
        // alert('A new date range was chosen: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'))
      })
      $('input[id="checkDateRange"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('')
        that.$data.checkDateStart = ''
        that.$data.checkDateEnd = ''
      })
      $('input[id="checkDateRange"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'))
      })
    })
  },
  mounted () {
    // $('input').val(2)
  },
  data () {
    return {
      checkStatus: 'all',
      isExpired: 'all',
      bookMobile: '',
      bookPerson: '',
      orderCreateDateStart: initStartCreateTime,
      orderCreateDateEnd: initEndCreateTime,
      visitDateStart: '',
      visitDateEnd: '',
      checkDateStart: '',
      checkDateEnd: '',
      orderTicketCode: '',
      parterOrderId: '',
      orderId: '',
      goodsName: '',
      bookerIDType: 'ID_CARD',
      bookerID: '',
      columns: ['orderId', 'partnerName', 'orderCreateTime', 'returnedTickets', 'isExpired', 'bookMobile', 'visitDateStart', 'bookPerson', 'parterOrderId', 'totalTickets', 'price', 'bookerID', 'checkStatus', 'checkedTickets', 'visitDateEnd', 'goodsName', 'userOrderId', 'bookerIDType', 'waitingTickets', 'touristBtn', 'refundBtn'],
      options: {
        filterable: false,
        perPage: 2,
        templates: {
          touristBtn: 'odl-tourist',
          refundBtn: 'odl-refund'
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
            orderCreateDateStart: initStartCreateTime,
            orderCreateDateEnd: initEndCreateTime,
            visitDateStart: '',
            visitDateEnd: '',
            checkDateStart: '',
            checkDateEnd: '',
            isExpired: 'all',
            orderTicketCode: ''
          }
        },
        responseAdapter: function (resp) {
          let data = resp.data.orders.lists
          data.map(function (item, index, input) {
            item.orderCreateTime = moment(new Date(item.orderCreateTime - 0)).format('YYYY-MM-DD HH:mm:ss')
            item.visitDateStart = moment(new Date(item.visitDateStart - 0)).format('YYYY-MM-DD HH:mm:ss')
            item.visitDateEnd = moment(new Date(item.visitDateEnd - 0)).format('YYYY-MM-DD HH:mm:ss')
            return item
          })
          return {
            data: data,
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
          bookerID: '证件号',
          checkStatus: '状态',
          checkedTickets: '已检',
          visitDateEnd: '游玩结束日期',
          goodsName: '票名',
          userOrderId: '用户订单号',
          bookerIDType: '证件类型',
          waitingTickets: '待检',
          touristBtn: '游客',
          refundBtn: '退票'
        }
      }
    }
  },
  methods: {
    search () {
      this.$refs.table.customQueries = {
        search: {
          checkStatus: this.checkStatus,
          isExpired: this.isExpired,
          orderCreateDateStart: this.orderCreateDateStart,
          orderCreateDateEnd: this.orderCreateDateEnd,
          visitDateStart: this.visitDateStart,
          visitDateEnd: this.visitDateEnd,
          checkDateStart: this.checkDateStart,
          checkDateEnd: this.checkDateEnd,
          bookMobile: this.bookMobile,
          bookPerson: this.bookPerson,
          orderTicketCode: this.orderTicketCode,
          parterOrderId: this.parterOrderId,
          orderId: this.orderId,
          goodsName: this.goodsName,
          bookerIDType: this.bookerIDType,
          bookerID: this.bookerID
        }
      }
      this.$refs.table.refresh()
    }
    // getTicketsList () {
    //   this.axios.post('/otauser', {
    //     action: 'GetOTAProducts',
    //     projectName: 'xitangdev',
    //     OTACode: 'Lvmama'
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
