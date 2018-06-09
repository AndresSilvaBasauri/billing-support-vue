<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "bootstrap/scss/bootstrap.scss";
@import "./assets/style.scss";
@import 'vuetify/dist/vuetify.min.css'
</style>
