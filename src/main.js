// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/http'
import store from '@/store'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false

const config = {
  fieldsBagName: 'vee-fields'
}

Vue.use(VeeValidate, config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  http,
  store,
  template: '<App/>',
  components: { App }
})
