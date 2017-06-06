import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/main/Main'
import TicketList from '@/components/order/TicketList'
import OrderList from '@/components/order/OrderList'
import Statement from '@/components/order/Statement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'ticketList',
          name: 'ticketList',
          component: TicketList
        },
        {
          path: 'orderList',
          name: 'orderList',
          component: OrderList
        },
        {
          path: 'statement',
          name: 'statement',
          component: Statement
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      redirect: '/'
    }
  ]
})
