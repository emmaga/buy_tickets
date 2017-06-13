<template>
  <div  class="modal fade in" v-show="isShow">
  <div class="modal-backdrop fade in"></div>
    <div class="modal-dialog autoscroll" >
      <div class="modal-content">
        <!--header-->
        <div class="modal-header">
          <button type="button" class="close"  @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="modal-title" >修改密码</h5>
        </div>

        <form @submit.prevent="changePW">

          <!--body-->
          <div class="modal-body">
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
          </div>

          <!--footer-->
          <div class="modal-footer">
            <a class="btn btn-default btn-sm" @click="close">取消</a>
            <button type="submit" :disabled="changing" class="btn btn-primary btn-sm">修改</button>
          </div>


        </form>
      </div>  
    </div>
  </div>
</template>

<script>
import {md5} from '@/utils'
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
    this.$bus.$on('changePWInit', event => {
      this.init()
    })
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
      .then((response) => {
        let data = response.data
        if (data.rescode === 200) {
          alert('修改成功')
          this.close()
        }
        this.changing = false
      })
      .catch((error) => {
        console.log(error)
        this.changing = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
