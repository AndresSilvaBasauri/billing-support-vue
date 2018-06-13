// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router/index'
import './plugins/vuetify'
import './plugins/filters' // filter
import { fb, fs } from './plugins/firebaseInit.js'
Vue.config.productionTip = false
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: {
//     App
//   },
//   template: '<App/>'
// })
let app
fb.auth().onAuthStateChanged(user => {
  store.commit("auth/authUpdate", user);
  fs.authUser = user;
  // console.log(user)
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: {App},
      template: '<App/>'
    })
  }
})
