<template>
  <v-dialog :value="isShow" @input="$emit('closeModel')" width="500">
    <v-card class="pa-3">
      <v-form ref="form" lazy-validation classs="my-2">
        <v-text-field
          v-model="username"
          :rules="[v => !!v || 'Username is required']"
          label="Tên tài khoản"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="[v => !!v || 'Email is required']"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="full_name"
          :rules="[v => !!v || 'fullname is required']"
          label="Họ và tên"
          required
        ></v-text-field>
        <v-radio-group
          v-model="sex_type"
          :rules="[v => !!v || 'You must agree to continue!']"
        >
          <v-radio label="Nam" value="true"></v-radio>
          <v-radio label="Nữ" value="false"></v-radio>
        </v-radio-group>
        <v-text-field
          v-model="address"
          :rules="[v => !!v || 'Address is required']"
          label="Địa chỉ"
          required
        ></v-text-field>
        <v-text-field
          v-model="phoneNumber"
          :rules="[v => !!v && v >= 0 || 'phoneNumber is required']"
          type="number"
          label="Số điện thoại"
          required
        ></v-text-field>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="startDate"
                    label="Ngày bắt đầu"
                    @blur="date = parseDate(startDate)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" lg="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="endDate"
                    @blur="date = parseDate(endDate)"
                    label="Ngày kết thúc"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="eDate"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" lg="6">
              <v-menu
                v-model="menu3"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="birthday"
                    @blur="date = parseDate(birthday)"
                    label="Ngày sinh nhật"
                    readonly
                    v-on="on"
                  ></v-text-field>
                  <v-text-field
                    v-model="salary_basic"
                    :rules="[v => !!v || 'salary_basic is required']"
                    label="Tiền lương"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="eiDate"
                  no-title
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="$emit('closeModel')">Cancel</v-btn>
        <v-btn v-if="!item" color="success" @click="add">Thêm</v-btn>
        <v-btn v-else color="success" @click="edit">Cập Nhập</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isShow: Boolean,
    item: Object
  },
  data(vm) {
    return {
      username: "",
      email: "",
      full_name: "",
      sex_type: "true",
      address: "",
      phoneNumber: "",
      date: new Date().toISOString().substr(0, 10),
      startDate: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      eDate: new Date().toISOString().substr(0, 10),
      endDate: vm.formatDate(new Date().toISOString().substr(0, 10)),
      eiDate: new Date().toISOString().substr(0, 10),
      birthday: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu3: false,
      salary_basic: ""
    };
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const data = {
          _id: Math.random(),
          username: this.username,
          email: this.email,
          full_name: this.full_name,
          sex_type: this.sex_type,
          address: this.address,
          phoneNumber: this.phoneNumber,
          startDate: this.startDate,
          endDate: this.endDate,
          birthday: this.birthday,
          salary_basic: this.salary_basic
        };
        this.$emit("addNewTaiKhoan", data);
        this.$refs.form.reset();
      }
    },
    edit() {
      if (this.$refs.form.validate()) {
        const data = {
          _id: this.item._id,
          username: this.username,
          email: this.email,
          full_name: this.full_name,
          sex_type: this.sex_type,
          address: this.address,
          phoneNumber: this.phoneNumber,
          startDate: this.startDate,
          endDate: this.endDate,
          birthday: this.birthday,
          salary_basic: this.salary_basic
        };
        this.$emit("editTaiKhoan", data);
      }
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  watch: {
    isShow(e) {
      console.log(this.item, 222);
      if (this.item) {
        this.username = this.item.username;
        this.email = this.item.email;
        this.full_name = this.item.full_name;
        this.sex_type = this.item.sex_type;
        this.address = this.item.address;
        this.startDate = this.startDate;
        this.endDate = this.endDate;
        this.birthday = this.birthday,
        this.salary_basic = this.salary_basic
      }
    },
    date(val) {
      this.startDate = this.formatDate(this.date);
    },
    eDate(val) {
      this.endDate = this.formatDate(this.eDate);
    },
    eiDate(val) {
      this.birthday = this.formatDate(this.eiDate);
    }
  }
};
</script>
