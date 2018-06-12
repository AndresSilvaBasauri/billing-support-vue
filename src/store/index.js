import Vue from 'vue';
import Vuex from 'vuex';
import {firebase} from '@/plugins/firebaseInit.js'
import auth from './modules/auth';
import languages from './modules/languages'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    languages,
    cart,
    products
  },
  state: { // = data
  },

  getters: { // = computed properties
  },

  actions: {},

  mutations: {}

});
