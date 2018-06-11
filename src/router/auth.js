import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/modules/auth/index'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [{
      path: '*',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'Auth',
      component: auth
    }
  ]
});

export default router
