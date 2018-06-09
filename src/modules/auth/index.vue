<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model.trim="loginForm.email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model.trim="loginForm.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {firebase} from "@/plugins/firebaseInit.js";
  export default {
    name: "auth",
    data: () => ({
      drawer: null,
      loginForm: {
        email: "",
        password: ""
      }
    }),
    props: {
      source: String
    },
    methods: {
      login() {
      this.performingRequest = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(users => {
          this.$store.commit("auth/authUpdate", users.user);
          console.log(this.$store)
          this.performingRequest = false;
          this.$router.push("/dashboard");
          // console.log(this.$store.state.auth);
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    }
    }
  }
</script>
