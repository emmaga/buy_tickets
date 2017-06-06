<template>
  <!-- container -->
  <div class="bg-gray full-screen">

    <!-- header -->
    <div id="top-nav" class="navbar navbar-inverse navbar-static-top">
      <div class="container-fluid">
          <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand">清云购票平台</a>
          </div>
      </div>
    </div>
    <!-- header -->

    <hr class="break-space-double">
    <hr class="break-space-double">
    <hr class="break-space-double">
    <hr class="break-space-double">
    <hr class="break-space-double">
    <hr class="break-space-double">

    <!-- login -->
    <div class="">
      <div class="center-block fixed-width-5">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">登录</h3>
          </div>
          <div class="panel-body">

            <form @submit.prevent="login" class="form-group">
              <!--账号-->
              <label class="control-label" for="account">账号</label> 
              <p :class="{ 'control': true }">
                <input required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('account') }" v-model="account" name="account" type="text" placeholder="请输入账号">
              </p>
              <!--密码-->
              <label class="control-label" for="password">密码</label> 
              <p :class="{ 'control': true }">
                <input required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('password') }" v-model="password" name="password" type="password" placeholder="请输入密码">
              </p>
              <!--分销商code-->
              <label class="control-label" for="OTACode">分销商code</label> 
              <p :class="{ 'control': true }">
                <input required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('OTACode') }" v-model="OTACode" name="OTACode" type="text" placeholder="请输入分销商code">
              </p>
              <!--登陆按钮-->
              <hr class="break-space"> 
              <div class="control-group">
                <button :disabled="logining" type="submit" class="btn btn-primary btn-block">登录</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</div>
  </div>
</template>

<script>
import {setParam, md5} from '@/utils'
let that
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: '',
      OTACode: '',
      logining: false
    }
  },
  created () {
    that = this
  },
  methods: {
    login () {
      if (this.errors.any()) {
        return
      }
      this.logining = true
      this.axios.post('/loginOTA', {
        action: 'GetToken',
        projectName: 'xitangdev',
        OTACode: this.OTACode,
        account: this.account,
        // password: 'd0970714757783e6cf17b26fb8e2298f'
        password: md5()(this.password)
      })
      .then(function (response) {
        let data = response.data
        setParam('clearToken', data.token)
        setParam('OTACode', data.OTACode)
        setParam('account', data.account)
        setParam('projectName', data.projectName)
        that.$store.commit('setUserName', data.userName)
        that.$router.push('main/ticketList')
        that.logining = false
      })
      .catch(function (error) {
        console.log(error)
        that.logining = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.has-error {
  border: 1px solid red;
}
</style>
