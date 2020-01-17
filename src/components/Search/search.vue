<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            :counter="10"
            label="Tên tài khoản"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="full_name"
            :rules="fullNameRules"
            :counter="10"
            label="Họ và tên"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="phoneNumber"
            :rules="phoneNumberRules"
            :counter="10"
            label="Số điện thoại"
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-container>
        <v-row>
          <v-btn class="success" @click="searchByData">Tìm kiếm</v-btn>
          <v-btn class="error" @click="resetSearhForm">Hủy tìm kiếm</v-btn>
        </v-row>
      </v-container>
    </v-container>
  </v-form>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data: () => ({
    valid: false,
    username: "",
    email: "",
    full_name: "",
    phoneNumber: "",
    usernameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    fullNameRules: [
      v => !!v || "full_name is required",
      v => v.length <= 100 || "full_name must be valid"
    ],
    phoneNumberRules: [v => v >= 0 || "full_name is required"]
  }),
  computed: {
    ...mapGetters("taikhoan", ["abc"]),
    ...mapState("taikhoan", ["listTaiKhoan"])
  },
  watch: {
    reset() {
      this.$refs.form.listTaiKhoan();
    }
  },
  methods: {
    ...mapActions("taikhoan", ["getListTaiKhoanRequest"]),
    // searchData () {
    //   if (this.username) {
    //     f
    //   }
    // },
    resetSearhForm() {
        this.valid = false,
        this.username = "",
        this.email = "",
        this.full_name = "",
        this.phoneNumber = "",
        this.usernameRules = "",
        this.emailRules = "",
        this.fullNameRules = "",
        this.phoneNumberRules = ""
    },
    searchByData() {
      this.getListTaiKhoanRequest({
        blocked: false,
        pagination: {
          pageSize: 10,
          page: 1
        },
        filter: {
          full_name: this.full_name,
          username: this.username,
          email: this.email,
          phoneNumber: this.phoneNumber
        }
      });
    }
  }
};
</script>
