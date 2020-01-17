<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="position_apply"
            :counter="10"
            label="Vị trí tuyển dụng"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="cv_pass_fail"
            label="cv nhận trượt"
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
            :counter="10"
            label="Số điện thoại"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            :counter="10"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="type_apply"
            :counter="10"
            label="Kiểu apply"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="interview_pass_fail"
            :counter="10"
            label="phỏng vấn trượt"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-container>
        <v-row>
          <v-btn class="success" @click="searchByData">Tìm kiếm</v-btn>
          <v-btn class="error">Hủy tìm kiếm</v-btn>
        </v-row>
      </v-container>
    </v-container>
  </v-form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: false,
    position_apply: "",
    cv_pass_fail: '',
    full_name: '',
    email: '',
    phoneNumber: '',
    type_apply: '',
    interview_pass_fail: '',
    // position_applyRules: [
    //   v => !!v || "Name is required",
    //   v => v.length <= 10 || "Name must be less than 10 characters"
    // ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    fullNameRules: [
      v => !!v || "full_name is required",
      v => v.length <= 100 || "full_name must be valid"
    ]
  }),
  methods: {
    ...mapActions('CvApply', ['ListCvApplyRequest']),
    searchByData () {
      this.ListCvApplyRequest({
        // "pagination": {
        //   "pageSize": 10,
        //   "page": 1
        // },
        "filter": {
          "position_apply": this.position_apply,
          "cv_pass_fail": this.cv_pass_fail,
          "full_name": this.full_name,
          "phoneNumber": this.phoneNumber,
          "email": this.email,
          "type_apply": this.type_apply,
          "interview_pass_fail": this.interview_pass_fail
        }
      })
    }
  },
};
</script>
