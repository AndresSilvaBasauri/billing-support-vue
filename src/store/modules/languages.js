import helpers from '@/plugins/helpers.js'
import { fb, fs } from '@/plugins/firebaseInit.js'
import { Languages } from "@/models/languages";
import { Store } from 'vuex';
var languages = new Languages();
export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    getItems(state, getters) {
      return state.items
    }
  },
  mutations: {
    'GET' (state, items) {
      state.items = items;
    },
    'SET' (state, item) {
      state.items.push(item);
    }
  },
  actions: {
    fetchItems({
      commit
    }) {
      return fs
        .collection("languages")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            languages = doc.data();
            languages.id = doc.id;
            commit('GET', languages);
          });
        }).catch((error) => {
          console.log(error)
        })
    },
    addItem({
      commit
    }, item) {
      item.created = { by: fs.authUser.uid, at: new Date() };
      fs.collection("languages")
        .add(helpers.convertObject(item)).then((item) => {
          commit('SET', item);
          console.log(item);
        }).catch((error) => {
          console.log(error);
        });
    }
  }
}
