import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/modules/dashboard/index'
import auth from '@/modules/auth/index'
import store from '@/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      name: 'Auth',
      component: auth
    }
  ]
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = store.state.auth.isAuth
  if (requiresAuth && !currentUser) {
    next('/auth')
  } else if (requiresAuth && currentUser) {
    next()
  // } else if (currentUser && to.name === 'auth') {
  //   next('/home')
  } else {
    next()
  }
})

export default router
