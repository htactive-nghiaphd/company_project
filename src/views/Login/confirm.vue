<template>
 <v-app>
   <v-container>
    <h2>Xác thực tài khoản</h2>
    <v-row>
      <v-col>
        <v-card width="500" height="200"
          class="ma-6 pa-3"
        >
          <v-form action="#">
            <v-text-field
            v-model="verificationCode"
            label="Mã xác thực"
            required
            ></v-text-field>
            <v-text-field
            label="Email"
            v-model="email"
            required
            ></v-text-field>
            <v-btn color="blue lighten-3" class="mr-4" @click="sign_comfirm">
              Đồng ý
           </v-btn>
          </v-form>
        </v-card>
       </v-col>
      </v-row>
    </v-container>
 </v-app>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      verificationCode: '',
      email: ''
    }
  },
  methods: {
    sign_comfirm () {
      console.log(this.verificationCode)
      axios
        .post('https://admin-htactive.herokuapp.com/api/auth/signUp-confirm', {
          verificationCode: this.verificationCode,
          email: this.email
        })
        .then(response => {
          console.log('The account has been verified. Please log in')
          this.$router.push('/login')
        })
        .catch(error => {
          throw error
        })
    }
  }
}
</script>
