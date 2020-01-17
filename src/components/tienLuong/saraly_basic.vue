<template>
  <v-data-table
    :headers="headers"
    :items="listSalary_basic"
    sort-by="subsidize"
    class="elevation-1"
  >
     <template v-slot:item.payment_salary_date="{ item }">
      {{ moment(item.payment_salary_date).format("Do-MM-YYY hh:mm:ss") }}
    </template>
     <template v-slot:item.updateAt="{ item }">
      {{ moment(item.updateAt).format("Do-MM-YYY hh:mm:ss") }}
    </template>
     <template v-slot:item.createAt="{ item }">
      {{ moment(item.createAt).format("Do-MM-YYY hh:mm:ss") }}
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.subsidize" label="Trợ cấp"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.notes" label="Lưu ý"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem._id" label="id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.salary_basic" label="Lương cơ bản"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.total_salary" label="Lương tổng"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.payment_salary_date" label="Ngày trả lương"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.user" label="Người dùng"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.updateAt" label="Ngày cập nhập"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.createAt" label="Ngày tao"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.__v" label="Ngày vắng"></v-text-field>
                  </v-col>
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
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          align: 'left',
          sortable: false,
        },
        { text: 'Trợ cấp', value: 'subsidize' },
        { text: 'Lưu ý', value: 'notes' },
        { text: 'Lương cơ bản', value: 'salary_basic' },
        { text: 'Lương tổng', value: 'total_salary' },
        { text: 'Ngày trả lương', value: 'payment_salary_date' },
        { text: 'Lương cơ bản', value: 'salary_basic' },
        { text: 'Người dùng', value: 'user' },
        { text: 'Ngày cập nhật', value: 'updateAt' },
        { text: 'Ngày tạo', value: 'createAt' },
        { text: 'Ngày vắng', value: '__v' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      dataSalaryBasic: {
        "pagination": {
          "pageSize": 10,
          "page": 1
        }
      },
      // desserts: [],
      editedIndex: -1,
      editedItem: {
        subsidize: '',
        notes: 0,
        _id: 0,
        salary_basic: 0,
        total_salary: 0,
        payment_salary_date: '',
        user: '',
        updateAt: '',
        createAt: '',
        __v: ''
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...mapState('SalaryBasic',['listSalary_basic'])
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    // created () {
    //   this.initialize()
    // },
    mounted () {
      this.getListSalaryBasicRequest(this.dataSalaryBasic)
    },
    filters: {
      moment: function() {
        return moment(payment_salary_date).format("Do-MM-YYY hh:mm:ss")
        return moment(updateAt).format("Do-MM-YYY hh:mm:ss")
        return moment(createAt).format("Do-MM-YYY hh:mm:ss")
      }
    },
    methods: {
      moment: function() {
        return moment();
      },
      ...mapActions('SalaryBasic' ,['getListSalaryBasicRequest','addSalaryBasicRequest']),
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
          this.addSalaryBasicRequest(this.editedItem)
        // if (this.editedIndex > -1) {
        //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
        // } else {
        //   this.desserts.push(this.editedItem)
        // }
        this.close()
      },
    },
  }
</script>
