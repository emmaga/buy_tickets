import Vue from 'vue'
import Vuex from 'vuex'
import {setParam, getParam, clearParam} from '@/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName: ''
  },
  mutations: {
    setUserName (state, name) {
      setParam('userName', name)
      state.userName = name
    },
    getUserName (state) {
      state.userName = getParam('userName')
    },
    delUserName (state) {
      clearParam('userName')
      state.userName = null
    }
  }
})

export default store
