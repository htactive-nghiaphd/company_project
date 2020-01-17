<template>
  <v-data-table
    :headers="headers"
    :items="listIntership"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Quản lí thực tập</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Thêm thực tập</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                <v-row>
                    <v-text-field v-model="editedItem.username" label="Tên người dùng"></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field v-model="editedItem.password" label="Mật khẩu" type="password"></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field v-model="editedItem.full_name" label="Họ và tên"></v-text-field>
                </v-row>
                <v-radio-group v-model="editedItem.sex_type" :mandatory="false">
                  <v-radio label="Nam" value="true"></v-radio>
                  <v-radio label="Nữ" value="false"></v-radio>
                </v-radio-group>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.address" label="Địa chỉ"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.university" label="Đại học"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                   <v-text-field v-model="editedItem.phoneNumber" label="Số điện thoại" type="number"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                   <v-text-field v-model="editedItem.position_apply" label="vị trí tuyển dụng"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                   <v-text-field v-model="editedItem.time_interShip" label="thời gian thực tập" type="number"></v-text-field>
                </v-row>

                <v-row cols="12" sm="6" md="4">
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
                      v-model="computedStartDateFormatted"
                      label="Ngày bắt đầu"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dataForm.startDate" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <!-- <v-text-field v-model="editedItem.endDate" label="Ngày kết thúc"></v-text-field> -->
                  <v-menu
                  ref="menu2"
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
                      v-model="computedEndDateFormatted"
                      label="Ngày kết thúc"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dataForm.endDate" no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
                </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.sex_type="{ item }">
      {{item.sex_type ? "Nam" : "Nữ" }}
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <v-icon small @click="deleteItem(item._id)">delete</v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    data(){
      return {
        dialog: false,
        menu1: false,
        menu2: false,
        dataForm: {
          // date: "",
          startDate: '',
          endDate: ''
        },
        editedItem: {
          username: '',
          email: '',
          password: '',
          full_name: '',
          sex_type: 'true',
          address: '',
          university: '',
          phoneNumber: '',
          position_apply: '',
          time_interShip: '',
        },
        headers: [
          {
            align: 'left',
            sortable: false,
          },
          { text: 'Tên tài khoản', value: 'username' },
          { text: 'E-mail', value: 'email' },
          { text: 'mật khẩu', value: 'password' },
          { text: 'Họ và tên', value: 'full_name' },
          { text: 'Giới tính', value: 'sex_type' },
          { text: 'Địa điểm', value: 'address' },
          { text: 'Đại học', value: 'university' },
          { text: 'số điện thoại', value: 'phoneNumber' },
          { text: 'Vị trí tuyển dụng', value: 'position_apply' },
          { text: 'thời gian thực tập', value: 'time_interShip' },
          { text: 'Ngày bắt đầu', value: 'startDate' },
          { text: 'Ngày kết thúc', value: 'endDate' },
          { text: 'Chức năng', value: 'action'},
        ],
        dataIntership: {
          "blocked": false,
          "pagination": {
            "pageSize": 10,
            "page": 1
          }
        }
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.dataForm.birthday)
      },
      computedStartDateFormatted () {
      return this.formatDate(this.dataForm.startDate)
      },
      computedEndDateFormatted () {
      return this.formatDate(this.dataForm.endDate)
      },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
      ...mapGetters('Intership', ['listIntership'])
    },
    methods: {
      formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        // if (this.$refs.form.validate()) {
          const data = {
            // _id: Math.random(),
            username: this.editedItem.username,
            email: this.editedItem.email,
            password: this.editedItem.password,
            full_name: this.editedItem.full_name,
            sex_type: this.editedItem.sex_type,
            address: this.editedItem.address,
            university: this.editedItem.university,
            phoneNumber: this.editedItem.phoneNumber,
            position_apply: this.editedItem.position_apply,
            time_interShip: this.editedItem.time_interShip,
            startDate: this.dataForm.startDate,
            endDate: this.dataForm.endDate
          };
        this.addIntershipRequest(data)
      //   // if (this.editedIndex > -1) {
      //   //   //Object.assign(this.listIntership[this.editedIndex], this.editedItem)
      //   // } else {
      //   //   this.listIntership.push(this.editedItem && this.dataForm)
      //   //   // this.listIntership.push(this.dataForm)
      //   // }
      this.close()
      },
      editItem (item) {
        this.editedIndex = this.listIntership.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (id) {
        // const index = this.listIntership.indexOf(item)
        // const index = this.listIntership.splice(index, 1)
        confirm('Are you sure you want to delete this item?') && this.deleteIntershipRequest(id)
      },
      ...mapActions('Intership', ['getListIntershipRequet','deleteIntershipRequest','addIntershipRequest'])
    },
    mounted () {
      this.getListIntershipRequet(this.dataIntership)
    }
  }
</script>
