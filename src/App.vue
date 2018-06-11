<template>
  <v-app id="app">
    <div v-if="isAuth">
      <theme></theme>
    </div>
    <div v-else>
      <auth></auth>
    </div>
  </v-app>
</template>

<script>
import theme from "./components/themes/default";
import auth from "./modules/auth/index";
export default {
  name: "App",
  components: {
    theme,
    auth
  },
  data: () => ({
    isAuth: false
  }),
  created() {
    this.isAuth = this.$store.state.auth.isAuth;
    // console.log(this.isAuth);
  }
};
</script>

<style lang="scss">
// @import "bootstrap/scss/bootstrap.scss";
// @import "./assets/style.scss";
@import "vuetify/dist/vuetify.min.css";
@import "./assets/vuetify.scss";
</style>
