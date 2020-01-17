<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <div>
            <v-app id="inspire">
              <v-row align="center">
                <v-form
                  ref="form"
                >
                  <v-text-field
                    v-model="vola.username"
                    :rules="usernameRules"
                    label="username"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="vola.email"
                    label="E-mail"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="vola.password"
                    label="password"
                    required
                    type="password"
                  ></v-text-field>

                  <v-text-field
                    v-model="vola.full_name"
                    label="full_name"
                    required
                  ></v-text-field>
                  <v-radio-group v-model="vola.sex_type" :rules="[v => !!v || 'You must agree to continue!']">
                    <v-radio label="Nam" value="true"></v-radio>
                    <v-radio label="Nữ" value="false"></v-radio>
                  </v-radio-group>
                  <v-menu
                    v-model="startMenu"
                    :nudge-right="40"
                    transition="scale-transition"
                    min-width="290px"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="vola.birthday"
                        label="Ngày sinh"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="vola.birthday"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-text-field
                    v-model="vola.address"
                    label="address"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="vola.phoneNumber"
                    :rules="phoneNumberRules"
                    label="phoneNumber"
                    type="number"
                    required
                  ></v-text-field>

                  <v-menu
                    v-model="nowMenu"
                    :nudge-right="40"
                    transition="scale-transition"
                    min-width="290px"
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="vola.startDate"
                        label="startDate"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="vola.startDate"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-btn
                    color="#4CAF50"
                    class="mr-4"
                    @click="createAccont"
                  >
                    Đăng kí tài khoản
                  </v-btn>

                  <v-btn
                    color="error"
                    class="mr-4"
                    @click="reset"
                  >
                    Reset Form
                  </v-btn>
                </v-form>
              </v-row>
            </v-app>
          </div>
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
      nowMenu: false,
      startMenu: false,
      vola: [
        {
          username: '',
          email: '',
          password: '',
          full_name: '',
          sex_type: '',
          birthday: '',
          address: '',
          phoneNumber: '',
          startDate: ''
        }
      ],
      usernameRules: [
        v => !!v || 'username is required',
        v => (v && v.length <= 10) || 'Username must be less than 10 characters'
      ],
      phoneNumberRules: [
        v => !!v || 'Numberphone is required',
        v => (v && v.length <= 10) || 'numberphone must be less than 10 characters'
      ]
    }
  },
  methods: {
    createAccont () {
      axios
        .post('https://admin-htactive.herokuapp.com/api/user/create-account', this.vola)
        .then(response => {
          console.log('thanh cong')
        })
        .catch(error => {
          throw error
        })
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>
