import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './LoginPage'
import DashboardPage from './DashboardPage'
import store from '../store';

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardPage      
    }
  ],
  
});
router.beforeEach((to, from, next)=>{
  
  let isLogged = store.getters.isLogged;
  
  if(to.path != '/login'){
    if(isLogged)
      next();
    else
      next({
        name: 'Login'
      })
  }else{
    if(isLogged){
      next({
        name: 'Dashboard'
      });
    }
    else
      next();
    
  }
});

export default router;