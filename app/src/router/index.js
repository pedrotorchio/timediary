import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import store from '../store';
import {unguardedPages as publicPages, mainPage} from '../config';

Vue.use(Router);

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
  let isLogged = store.getters['account/isLogged'];
  
  
  if(isLogged){
  
    store.dispatch('account/fetchAccountInformation')
        .then(response=>{
          
          store.commit('account/setAccount', response);
          store.commit('ui/uiLogged', true);
          store.dispatch('modules/load');
          
          if(publicPages.indexOf(to.name) != -1) // se é pagina publica
            next({
              name: mainPage
            });
          else
              next();
        })
        .catch(error=>{
          const msg = window.DIARY.$sysMsg;
          msg.interrupt(error.message, 'error', msg.DURATION_STAY);
          
          store.dispatch('clear');
          next({
            name: 'Login'
          })
        });
  }else{
    
    
    store.dispatch('clear');

    if(publicPages.indexOf(to.name) == -1) // se é pagina reservada 
      next({
        name: 'Login'
      });
    else
      next();
  }
}

export default router;