<template>
  <div class="modal fade in" v-show="isShow">
    <!-- 弹窗背景 -->
    <div class="modal-backdrop fade in"></div>
    <!-- 弹窗内容 -->
    <div class="modal-dialog autoscroll" >
      <div class="modal-content">
        <!--header-->
        <div class="modal-header">
          <button type="button" class="close"  @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="modal-title" >下单</h5>
        </div>
        <!--header end-->
        <!--body-->
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



          <form @submit.prevent="buy">


            <div class="form-group">
              <!--订单基本信息-->
              <label class="control-label" >游玩日期</label>
              <input type="text" name="visitTime" class="form-control" />
            </div>


            <div class="form-group">
              <!--购票数量-->
              <label class="control-label" for="ticketCount">购票数量</label> 
              <p :class="{ 'control': true }">
                <input min="1" required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('ticketCount') }" v-model="ticketCount" name="ticketCount" type="number" placeholder="请输入购票数量">
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
                <div class="col-xs-3">
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
                <div class="col-xs-9">
                  <p :class="{ 'control': true }">
                    <input required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('contactsIdNum') }" v-model="contactsIdNum" name="contactsIdNum" type="text" placeholder="请输入预订人证件号">
                  </p>
                </div>
              </div>
            </div>


            <hr>

            <div v-for="(item, index) in travelerList">
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
                  <div class="col-xs-3">
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
                  <div class="col-xs-9">
                    <input v-model="item.idNum" type="text" class="form-control" placeholder="请输入证件号">
                  </div>
                </div>
              </div>
              <hr>
            </div>


              
          </form>
        </div>
        <!--body end-->

        <!--footer-->
        <div class="modal-footer">
          <a class="btn btn-default btn-sm" @click="close">取消</a>
          <button type="submit" :disabled="saving" class="btn btn-primary btn-sm">下单</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import $ from '@/utils/jquery-v'

let that
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
      return moment(this.VisitDateStart).format('YYYY-MM-DD')
    },
    visitDateEnd: function () {
      return moment(this.VisitDateEnd).format('YYYY-MM-DD')
    }
  },
  watch: {
    ticketCount: function (newCount) {
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
    that = this
    $(function () {
      $('input[name="visitTime"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true
      },
      function (start, end, label) {
        this.visitTime = start.format('YYYYMMDDHHmmss')
      })
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
      .then(function (response) {
        let data = response.data
        console.log(data)
        that.saving = false
        if (data.rescode === 200) {
          alert('下单成功')
          that.close()
        }
      })
      .catch(function (error) {
        console.log(error)
        that.saving = false
      })
      // .finally todo
      // https://github.com/mzabriskie/axios/issues/34
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.temp {
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  /*background-color: rgba(0, 0, 0, 0.6);*/
  background-color: white;
}
.has-error {
  border: 1px solid red;
}
</style>
