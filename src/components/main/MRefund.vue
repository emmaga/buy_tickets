<template>
  <div class="modal fade in" v-show="isShow">
    <div class="modal-backdrop fade in"></div>
    <div class="modal-dialog autoscroll" >
      <div class="modal-content">
        <!--header-->
        <div class="modal-header">
          <button type="button" class="close"  @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="modal-title" >退票</h5>
        </div>
        <!--body-->
          <form @submit.prevent="refund">
        <div class="modal-body">

          <h3>可退数量：{{ waitingCheck }}</h3>
          <hr>
            <div class="form-group">
              <!--退票数量-->
              <label class="control-label" for="cancelCount">退票数量</label> 
              <p :class="{ 'control': true }">
                <input min="1" :max="waitingCheck" required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('cancelCount') }" v-model="cancelCount" name="cancelCount" type="number" placeholder="请输入退票数量">
              </p>
            </div>
        </div>
        <!--footer-->
        <div class="modal-footer">
          <a class="btn btn-default btn-sm" @click="close">取消</a>
          <button class="btn btn-sm btn-primary"  type="submit" :disabled="refunding">退票</button>
        </div>       
          </form>

      </div>
    </div>




  </div>
</template>

<script>
let that
export default {
  name: 'm-refund',
  data () {
    return {
      isShow: false,
      orderId: 0,
      waitingCheck: 0,
      cancelCount: '',
      refunding: false
    }
  },
  created () {
    that = this
    this.$bus.$on('refundInit', event => {
      this.orderId = event.orderId
      this.waitingCheck = event.waitingCheck
      this.init()
    })
  },
  methods: {
    init () {
      this.isShow = true
      this.cancelCount = ''
    },
    close () {
      this.isShow = false
    },
    refund () {
      this.refunding = true
      this.axios.post('/otauser', {
        action: 'OTACancelOrder',
        orderId: this.orderId - 0,
        cancelSerial: new Date().getTime() + '' + Math.floor(Math.random(100)*100),
        cancelCount: this.cancelCount
      })
      .then(function (response) {
        let data = response.data
        if (data.rescode === 200) {
          alert('退票已成功')
          that.$router.go({
            path: '/main/orderList',
            force: true
          })
        }
        that.refunding = false
      })
      .catch(function (error) {
        console.log(error)
        that.refunding = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
