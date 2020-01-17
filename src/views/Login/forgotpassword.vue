<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <h2>Find your email</h2>
          <v-card class="ma-6 pa-3">
            <v-toolbar color="blue" dark flat>
              <v-toolbar-title>Find your email</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field label="Email" type="text" v-model="email"></v-text-field>
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
      email: ''
    }
  },
  methods: {
    forgotemail () {
      console.log(this.email)
      axios
        .post('https://admin-htactive.herokuapp.com/api/auth/forgot-password', {
          email: this.email
        })
        .then(response => {
          console.log(response)
          this.$router.push('/resetpassword')
        })
    }
  }
}
</script>
