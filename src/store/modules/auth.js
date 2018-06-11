import {firebase} from '@/plugins/firebaseInit.js'
export default {
  namespaced: true,

  state: {
    isAuth: false,
    authUser: null
  },
  getters: {
    authUser: state => state.authUser,
    isAuth: state => state.isAuth
  },
  mutations: {
    authUpdate(state, user) {
      if (user) {
        state.isAuth = true;
        state.authUser = user;
      } else {
        state.isAuth = false;
        state.authUser = null;
      }
    },
    logout() {
      firebase.auth().signOut();
    }
  },
  actions: {
    //   getProducts: (context) => {
    //     fetchProducts
    //       .then((response) => {
    //         context.commit('AUTH_UPDATED', response);
    //       })
    //       .catch((error) => {
    //         // eslint-disable-next-line
    //         console.error(error);
    //       });
    //   }
    // setCurrentUser: (context) => {
    //     context.commit('AUTH_UPDATED');
    // }
    // login({
    //   commit
    // }, loginForm) {
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(
    //       loginForm.email,
    //       loginForm.password
    //     )
    //     .then(users => {
    //       commit("authUpdate", users.user);
    //       // this.$router.push("/home");
    //       console.log(loginForm);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       this.performingRequest = false;
    //       this.errorMsg = err.message;
    //     });
    // }
  }
}
