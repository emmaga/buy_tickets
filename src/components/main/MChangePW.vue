<template>
  <div class="temp" v-show="isShow">
    可退数量：{{ waitingCheck }}
    <form @submit.prevent="refund">
      <div class="form-group">
        <!--退票数量-->
        <label class="control-label" for="cancelCount">退票数量</label> 
        <p :class="{ 'control': true }">
          <input min="1" :max="waitingCheck" required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('cancelCount') }" v-model="cancelCount" name="cancelCount" type="number" placeholder="请输入退票数量">
        </p>
      </div>
      <button type="submit" :disabled="refunding">退票</button>
      <a @click="close">取消</a>
    </form>
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
  },
  methods: {
    init () {
      this.isShow = true
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
.temp {
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: white;
}
.has-error {
  border: 1px solid red;
}
</style>
