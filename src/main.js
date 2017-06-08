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

/*
 * By extending the Vue prototype with a new '$bus' property
 * we can easily access our global event bus from any child component.
 */
Object.defineProperty( Vue.prototype, '$bus', {
  get() {
    return this.$root.bus
  }
})

// This empty Vue model will serve as our event bus.
var bus = new Vue({})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    bus: bus // Here we bind our event bus to our $root Vue model.
  },
  router,
  http,
  store,
  template: '<App/>',
  components: { App }
})
