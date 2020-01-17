<template>
  <v-app>
    <Search />
    <v-data-table
      :headers="headers"
      :items="listCvApply"
      :options.sync="options"
      :server-items-length="totals"
      sort-by="phoneNumber"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>CV CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
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
                      <v-text-field
                        v-model="editedItem.full_name"
                        label="Họ và tên"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="E-mail"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.phoneNumber"
                        label="Số điện thoại"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.type_apply"
                        label="Kiểu apply"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.cv_point"
                        label="Đánh giá"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="computedTimeInterviewFormatted"
                            label="Thời gian PV"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.time_interview"
                          no-title
                          @input="menu1 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.cv_pass_fail"
                        label="Cv nhận trượt"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.interview_pass_fail"
                        label="Phỏng vấn trượt"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.take_interview"
                        label="Mời phỏng vấn"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.url_preview_cv"
                        label="Sản phẩm review"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.position_apply"
                        label="vị trí apply"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <!-- <v-text-field v-model="editedItem.createAt" label="Ngày tạo"></v-text-field> -->
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="computedcreateAtFormatted"
                            label="Ngày tạo"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.createAt"
                          no-title
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.__v"
                        label="ngay vang"
                      ></v-text-field>
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
        <v-icon small class="mr-2" @click="editItem(item)">
          edit
        </v-icon>
        <v-icon small @click="deleteItem(item._id)">
          delete
        </v-icon>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Search from '../cv_apply/search'
export default {
  components: {
    Search
  },
  data () {
    return {
      dialog: false,
      menu1: false,
      menu2: false,
      options: {},
      headers: [
        {
          align: "left",
          sortable: false
        },
        { text: "Số điện thoại", value: "phoneNumber" },
        { text: "Kiểu apply", value: "type_apply" },
        { text: "Điểm cv", value: "cv_point" },
        { text: "Thời gian phỏng vấn", value: "time_interview" },
        { text: "cv nhận trượt", value: "cv_pass_fail" },
        { text: "phỏng vấn trượt", value: "interview_pass_fail" },
        { text: "mời phỏng vấn", value: "take_interview" },
        { text: "id", value: "_id" },
        { text: "Họ và tên", value: "full_name" },
        { text: "E-mail", value: "email" },
        { text: "Sản phẩm review", value: "url_preview_cv" },
        { text: "Vị trí apply", value: "position_apply" },
        { text: "Ngày tạo", value: "createAt" },
        { text: "Số vắng (d)", value: "__v" },
        { text: "action", value: "action" }
      ],
      dataCv: {
        pagination: {
          pageSize: 10,
          page: 1
        },
        // filter: {
        //   full_name: full_name
        // }
      },
      // editedIndex: -1,
      editedItem: {
        full_name: "",
        email: "",
        phoneNumber: "",
        type_apply: "",
        cv_point: "",
        time_interview: "",
        cv_pass_fail: "",
        interview_pass_fail: "",
        take_interview: "",
        url_preview_cv: "",
        position_apply: "",
        createAt: "",
        __v: ""
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }

  },
  mounted() {
    // console.log("this data", this.dataCv);
    this.ListCvApplyRequest(this.dataCv);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState("CvApply", ["listCvApply", "totals"]),
    computedTimeInterviewFormatted() {
      return this.formatDate(this.editedItem.time_interview);
    },
    computedcreateAtFormatted() {
      return this.formatDate(this.editedItem.createAt);
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    options(val) {
      const optionFilter = {
        pagination: {
          pageSize: val.itemsPerPage,
          page: val.page
        },
        // filter: {
        //   full_name: full_name
        // }
      };
      this.ListCvApplyRequest(optionFilter);
    }
  },

  // created () {
  //   this.initialize()
  // },
  methods: {
    ...mapActions("CvApply", ["ListCvApplyRequest", "addCvApplyRequest","deleteCvRequest","editCvApplyRequest"]),
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    editItem(item) {
      // this.editedIndex = this.listCvApply.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    edit () {
      //
    },
    deleteItem(id) {
      // const index = this.listCvApply.indexOf(item);
      confirm("Are you sure you want to delete this item?") && this.deleteCvRequest(id)
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.listCvApply[this.editedIndex], this.editedItem);
        this.editCvApplyRequest(this.editedItem)
      } else {
        this.addCvApplyRequest(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
