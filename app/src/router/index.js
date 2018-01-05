import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './LoginPage'
import DashboardPage from './LoginPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/painel',
      name: 'Dashboard',
      component: DashboardPage      
    }
  ]
})
