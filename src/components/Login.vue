<template>
  <div class="hello">
    <h2>login</h2>
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
      <!--项目code-->
      <label class="control-label" for="projectName">项目code</label> 
      <p :class="{ 'control': true }">
        <input required v-validate="'required'" :class="{'form-control': true, 'has-error': errors.has('projectName') }" v-model="projectName" name="projectName" type="text" placeholder="请输入项目code">
      </p>
      <!--登陆按钮-->
      <button :disabled="logining" type="submit">登录</button>
    </form>
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
      projectName: '',
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
        projectName: this.projectName,
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

.has-error {
  border: 1px solid red;
}
</style>
