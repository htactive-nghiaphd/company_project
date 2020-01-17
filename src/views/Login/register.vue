<template>
  <v-app>
    <v-container>
      <h2>REGISTER</h2>
      <v-row>
        <v-col>
          <v-card class="ma-6 pa-3">
            <v-form action="#">
              <v-text-field v-model="username" label="Name" required></v-text-field>
              <v-text-field v-model="email" label="Email" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-text-field v-model="full_name" label="full_name" type="text" required></v-text-field>
              <v-text-field v-model="address" label="address" type="text" required></v-text-field>
              <v-text-field v-model="phoneNumber" label="phoneNumber" type="number" required></v-text-field>
              <v-radio-group v-model="sex_type">
                <v-radio label="Nam" value="true" item-text></v-radio>
                <v-radio label="Nữ" value="false"></v-radio>
              </v-radio-group>
              <v-btn color="success" class="mr-4" @click="sigUp">Register</v-btn>
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
      username: '',
      email: '',
      password: '',
      full_name: '',
      address: '',
      phoneNumber: '',
      sex_type: 'true'
    }
  },
  methods: {
    sigUp () {
      axios
        .post('https://admin-htactive.herokuapp.com/api/auth/signUp', {
          username: this.username,
          email: this.email,
          password: this.password,
          full_name: this.full_name,
          address: this.address,
          phoneNumber: this.phoneNumber,
          sex_type: this.sex_type
        })
        .then(response => {
          console.log('thanh cong')
          this.$router.push('/xacthuc')
        })
        .catch(error => {
          throw error
        })
    }
  }
}
</script>
