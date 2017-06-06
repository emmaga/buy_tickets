<template>
  <div class="temp" v-show="isShow">
    <form @submit.prevent="changePW">
      <div class="form-group">
        <!--原密码-->
        <label class="control-label" for="oldPassword">原密码</label> 
        <p :class="{ 'control': true }">
          <input required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('oldPassword') }" v-model="oldPassword" name="oldPassword" type="password" placeholder="请输入原密码">
        </p>
        <!--新密码-->
        <label class="control-label" for="newPassword">新密码</label> 
        <p :class="{ 'control': true }">
          <input required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('newPassword') }" v-model="newPassword" name="newPassword" type="password" placeholder="请输入新密码">
        </p>
        <!--新密码确认-->
        <label class="control-label" for="confirmPassword">确认新密码</label> 
        <p :class="{ 'control': true }">
          <input required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('confirmPassword') }" v-model="confirmPassword" name="confirmPassword" type="password" placeholder="请再次输入新密码">
        </p>
      </div>
      <button type="submit" :disabled="changing">修改</button>
      <a @click="close">取消</a>
    </form>
  </div>
</template>

<script>
import {md5} from '@/utils'
let that
export default {
  name: 'm-changePW',
  data () {
    return {
      isShow: false,
      changing: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  created () {
    that = this
  },
  methods: {
    init () {
      this.isShow = true
      this.oldPassword = ''
      this.confirmPassword = ''
      this.newPassword = ''
    },
    close () {
      this.isShow = false
    },
    changePW () {
      this.changing = true
      this.axios.post('/otauser', {
        action: 'ResetOTAUserPassword',
        oldPassword: md5()(this.oldPassword),
        confirmPassword: md5()(this.confirmPassword),
        newPassword: md5()(this.newPassword)
      })
      .then(function (response) {
        let data = response.data
        if (data.rescode === 200) {
          alert('修改成功')
          that.close()
        }
        that.changing = false
      })
      .catch(function (error) {
        console.log(error)
        that.changing = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.temp {
  position: fixed;
  z-index: 9999999;
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
