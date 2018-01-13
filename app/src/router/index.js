import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './LoginPage'
import DashboardPage from './DashboardPage'
import store from '../store';
import {unguardedPages as publicPages, mainPage} from '../config';

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

  guardPages(to, isLogged, next);
});
router.afterEach((to, from)=>{
  let isLogged = store.getters.isLogged;
  
  if(isLogged){
    store.commit('uiLogged', true);
    store.dispatch('modulesLoad');
  }else{
    store.commit('uiLogged', false);
    store.dispatch('modulesClear');
  }
});

function guardPages(to, isLogged, next){
  
  if(publicPages.indexOf(to.name) == -1 && !isLogged){
    // se é pagina reservada e nao está logado, login
      next({
        name: 'Login'
      })
  }else if(publicPages.indexOf(to.name) != -1 && isLogged){
    // se é pagina publica e está logado, vai para principal
    
    next({
      name: mainPage
    });
  }
  next();
}
export default router;