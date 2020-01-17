<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <h2>LOGIN</h2>
          <v-card class="ma-6 pa-3">
            <v-toolbar color="red" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Email"
                  type="text"
                  v-model="email"
                ></v-text-field>

                <v-text-field
                  label="Password"
                  :append-icon="value ? 'visibility' : 'visibility_off'"
                  v-model="password"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                ></v-text-field>
                <v-btn :to="{ name: 'forgotpassword' }">Forgot password</v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" @click="login">Login</v-btn>
              <v-btn color="yellow">Đăng kí</v-btn>
              <v-btn color="yellow">New Account</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      value: String,
      email: '',
      password: ''
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$router.push('/interfaceAdmin')
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions('Interface', ['sigInRequest']),
    ...mapMutations('Interface', ['created']),
    login () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.sigInRequest(data)
    }
  }
}
</script>
