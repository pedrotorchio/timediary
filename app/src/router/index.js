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

router.beforeEach(guardAndPrepare);
function guardAndPrepare(to, from, next){
  let isLogged = store.getters.isLogged;
  if(isLogged){
    store.dispatch('fetchAccountInformation')
          .then(response=>{

            store.commit('setAccount', response);
            store.commit('uiLogged', true);
            store.dispatch('modulesLoad');
            
            if(publicPages.indexOf(to.name) != -1) // se é pagina publica
              next({
                name: mainPage
              });
            else
                next();
        });

  }else{

    store.commit('uiLogged', false);
    store.dispatch('modulesClear');

    if(publicPages.indexOf(to.name) == -1) // se é pagina reservada 
      next({
        name: 'Login'
      });
    else
      next();
  }
}
export default router;