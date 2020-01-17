<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <h2>Đặt lại mật khẩu </h2>
          <v-card class="ma-6 pa-3">
            <v-toolbar color="blue" dark flat>
              <v-toolbar-title>Nhập mã bảo mật</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field label="Nhập mã xác thực" type="text" v-model="verificationCode"></v-text-field>
                <v-text-field label="Email" type="text" v-model="email"></v-text-field>
                <v-text-field label="newPassword" type="password" v-model="newPassword"></v-text-field>
                <v-text-field label="verifyPassword" type="password" v-model="verifyPassword"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="yellow" @click="forgotemail">NEXT</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      verificationCode: '',
      email: '',
      newPassword: '',
      verifyPassword: ''
    }
  },
  methods: {
    forgotemail () {
      console.log(this.verificationCode, this.email, this.newPassword, this.verifyPassword)
      axios
        .post('https://admin-htactive.herokuapp.com/api/auth/reset-password', {
          verificationCode: this.verificationCode,
          email: this.email,
          newPassword: this.newPassword,
          verifyPassword: this.verifyPassword
        })
        .then(response => {
          console.log('thanh cong')
          this.$router.push('/login')
        })
    }
  }
}
</script>
