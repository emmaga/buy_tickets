<template>
  <div class="modal fade in" v-show="isShow">
    <!-- 弹窗背景 -->
    <div class="modal-backdrop fade in"></div>
    <!-- 弹窗内容 -->
    <div class="modal-dialog autoscroll" >
      <div class="modal-content">
        <!--header-->
        <div class="modal-header">
          <button type="button" class="close" @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="modal-title">下单</h5>
        </div>
        <!--header end-->
        <!--body-->
        <form @submit.prevent="buy">
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-12">
                <!--价格码，产品名称，可游玩时间，售价-->
                <h3>{{ tInfo.GoodsName }}：{{ tInfo.SalePrice }}元／张</h3>
                <h5>可游玩日期 {{ visitDateStart }} - {{ visitDateEnd }}</h5>
                <h5>价格码 {{ tInfo.SaleID }} </h5>
              </div>
            </div>
            <hr>

              <div class="form-group">
                <!--订单基本信息-->
                <label class="control-label" >游玩日期</label>
                <input type="text" name="visitTime" class="form-control" />
              </div>

              <div class="form-group">
                <!--购票数量-->
                <label class="control-label" for="ticketCount">购票数量</label> 
                <p :class="{ 'control': true }">
                  <input min="1" max="50" required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('ticketCount') }" v-model="ticketCount" name="ticketCount" type="number" placeholder="请输入购票数量">
                  <i class="help" style="color:rgb(0,150,200)">
                    <small>上限：50张</small>
                  </i>
                </p>
              </div>

              <div class="form-group">
                <!--联系人信息-->
                <!--姓名-->
                <label class="control-label" for="contactsName">预订人姓名</label> 
                <p :class="{ 'control': true }">
                  <input required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('contactsName') }" v-model="contactsName" name="contactsName" type="text" placeholder="请输入预订人姓名">
                </p>
              </div>


              <div class="form-group">
                <!--手机-->
                <label class="control-label" for="contactsMobile">预订人手机号</label> 
                <p :class="{ 'control': true }">
                  <input required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('contactsMobile') }" v-model="contactsMobile" name="contactsMobile" type="text" placeholder="请输入预订人手机号">
                </p>
              </div>

              <!--证件号-->
              <div class="form-group">
                <label class="control-label" for="contactsIdNum">预订人证件号</label>
                <div class="row">
                  <!--证件类型-->
                  <div class="col-xs-3 col-condensed">
                    <select v-model="contactsIdType" class="form-control">
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
                  </div>
                  <div class="col-xs-9 col-condensed">
                    <p :class="{ 'control': true }">
                      <input required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('contactsIdNum') }" v-model="contactsIdNum" name="contactsIdNum" type="text" placeholder="请输入预订人证件号">
                    </p>
                  </div>
                </div>
              </div>


              <div v-for="(item, index) in travelerList">
                <hr>
                <!--同游人信息-->
                <div class="form-group" >
                  <!--姓名-->
                  <label class="control-label">同游人{{ index + 1 }}姓名</label>
                  <input v-model="item.name" type="text" placeholder="请输入姓名" class="form-control">
                </div>
                <div class="form-group" >
                  <!--手机-->
                  <label class="control-label">同游人{{ index + 1 }}手机号</label>
                  <input v-model="item.mobile" type="text" placeholder="请输入手机号" class="form-control">
                </div>
                <div class="form-group" >
                  <!--证件号-->
                  <label class="control-label">同游人{{ index + 1 }}证件号</label>
                  <div class="row">
                    <div class="col-xs-3 col-condensed">
                      <!--证件类型-->
                      <select v-model="item.idType" class="form-control">
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
                    </div>
                    <div class="col-xs-9 col-condensed">
                      <input v-model="item.idNum" type="text" class="form-control" placeholder="请输入证件号">
                    </div>
                  </div>
                </div>
              </div>


                
          </div>
          <!--body end-->

          <!--footer-->
          <div class="modal-footer">
            <a class="btn btn-default btn-sm" @click="close">取消</a>
            <button type="submit" :disabled="saving" class="btn btn-primary btn-sm">下单</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import $ from '@/utils/jquery-v'

let self

export default {
  name: 'm-buy-ticket',
  data () {
    return {
      isShow: false,
      tInfo: {},
      visitTime: moment(new Date()).format('YYYYMMDD') + '000000',
      ticketCount: '',
      contactsName: '',
      contactsMobile: '',
      contactsIdType: 'ID_CARD',
      contactsIdNum: '',
      travelerList: [],
      saving: false
    }
  },
  computed: {
    visitDateStart: function () {
      return moment(this.tInfo.VisitDateStart).format('YYYY-MM-DD')
    },
    visitDateEnd: function () {
      return moment(this.tInfo.VisitDateEnd).format('YYYY-MM-DD')
    }
  },
  watch: {
    ticketCount: function (newCount) {
      if (newCount > 50) {
        this.ticketCount = 50
        newCount = 50
      }
      let count = newCount
      for (let i = 0; i < count; i++) {
        this.travelerList[i] = {
          name: '',
          mobile: '',
          idType: 'ID_CARD',
          idNum: ''
        }
      }
      this.travelerList.length = count
    }
  },
  created () {
    self = this
    this.$bus.$on('buyTicketInit', event => {
      this.tInfo = event.tInfo
      this.init()
    })
  },
  methods: {
    init () {
      this.isShow = true
      this.visitTime = moment(new Date()).format('YYYYMMDD') + '000000'
      this.ticketCount = ''
      this.contactsName = ''
      this.contactsMobile = ''
      this.contactsIdType = 'ID_CARD'
      this.contactsIdNum = ''
      this.travelerList = []
      $(() => {
        $('input[name="visitTime"]').daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          minDate: moment(this.$data.tInfo.VisitDateStart).format('MM/DD/YYYY'),
          maxDate: moment(this.$data.tInfo.VisitDateEnd).format('MM/DD/YYYY'),
          locale: {
            customRangeLabel: 'Custom',
            daysOfWeek: [
              '日',
              '一',
              '二',
              '三',
              '四',
              '五',
              '六'
            ],
            monthNames: [
              '一月',
              '二月',
              '三月',
              '四月',
              '五月',
              '六月',
              '七月',
              '八月',
              '九月',
              '十月',
              '十一月',
              '十二月'
            ]
          }
        },
        function (start, end, label) {
          self.visitTime = start.format('YYYYMMDDHHmmss')
        })
      })
    },
    close () {
      this.isShow = false
    },
    buy () {
      if (this.errors.any()) {
        return
      }
      this.saving = true
      this.axios.post('/otauser', {
        action: 'OTANewOrder',
        data: {
          SaleID: this.tInfo.SaleID,
          VisitTime: this.visitTime,
          TicketCount: this.ticketCount + '',
          contacts: {
            idNum: this.contactsIdNum,
            idType: this.contactsIdType,
            mobile: this.contactsMobile,
            name: this.contactsName
          },
          TravelerList: this.travelerList
        }
      })
      .then((response) => {
        let data = response.data
        this.saving = false
        if (data.rescode === 200) {
          alert('下单成功')
          this.$router.go({
            path: '/main/ticketList',
            force: true
          })
        }
      })
      .catch((error) => {
        console.log(error)
        this.saving = false
      })
      // .finally todo
      // https://github.com/mzabriskie/axios/issues/34
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
