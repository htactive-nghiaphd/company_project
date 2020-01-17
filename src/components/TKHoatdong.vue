<template>
<div id="app">
  <v-app id="inspire">
  <v-container>
    <Search />
    <v-btn color="indigo" @click="isShowCreate= true">Thêm tài khoản</v-btn>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Tên tài khoản</th>
              <th class="text-left">Họ và tên</th>
              <th class="text-left">Giới tính</th>
              <th class="text-left">Email</th>
              <th class="text-left">Địa chỉ</th>
              <th class="text-left">Số điện thoại</th>
              <th class="text-left">Ngày bắt đầu</th>
              <th class="text-left">Ngày kết thúc</th>
              <th class="text-left">Ngày sinh</th>
              <th class="text-left">Tiền lương</th>
              <th class="text-left">Trạng thái</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody v-for="item in listTaiKhoan" :key="item.username">
            <tr>
              <td>{{ item.username }}</td>
              <td>{{ item.full_name }}</td>
              <td>{{ item.sex_type ? "Nam" : "Nữ" }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.address }}</td>
              <td>{{ item.phoneNumber }}</td>
              <td>{{moment(item.startDate, "Do-MM-YYYY HH:mm").format("Do-MM-YYYY HH:mm") }}</td>
              <!-- <td>{{ moment(item.startDate).format('MMMM Do YYYY, h:mm,ss a') }}</td> -->
              <td>{{ moment(item.endDate, "Do-MM-YYYY HH:mm").format("Do-MM-YYYY hh:mm")}}</td>
              <td>{{ moment(item.birthday, "Do-MM-YYYY hh:mm").format("Do-MM-YYYY hh:mm")}}</td>
              <td>{{ item.salary_basic }}</td>
              <td>{{ item.blocked ? "Đã khóa" : "chưa khóa" }}</td>
              <td>
                 <Action @deleteTaiKhoan = "deleteTaiKhoan(item._id)" @editTaiKhoan = editTaiKhoan(item) />
              </td>
            </tr>
          </tbody>
           <FormTaiKhoan :isShow="isShowCreate" @closeModel="isShowCreate = false"  @addNewTaiKhoan="addNewTaiKhoan" />
           <FormTaiKhoan :isShow="isShowEdit" @closeModel="isShowEdit = false" :item="itemEdit" @editTaiKhoan="updateTaiKhoan"/>
        </template>
      </v-simple-table>
  </v-container>
  </v-app>
</div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import Action from '../components/layouttable/Action'
import FormTaiKhoan from '../components/taikhoan/FormTaiKhoan'
import Search from '../components/Search/search'
import moment from 'moment'
// Vue.use(moment)
export default {
  data () {
    return {
      isShowCreate: false,
      isShowEdit: false,
      isShowAlertDelete: false,
      itemEdit: {},
      searchObject: {
        blocked: false,
        pagination: {
          pageSize: 10,
          page: 1
        }
      }
    }
  },
  filters: {
    moment: function () {
      return moment(startDate).format('MMMM Do YYYY, h:mm:ss a');
      return moment(endDate).format('MMMM Do YYYY, h:mm:ss a');
      return moment(birthday).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
  methods: {
    moment: function () {
      return moment();
    },
    // searchClient(val){
    //   this.abc = this.abc.filter(x => x.username === val)
    // },
    ...mapActions('taikhoan', ['getListTaiKhoanRequest', 'deleteTaiKhoanRequest', 'editTaiKhoanRequest', 'addNewTaiKhoanRequest']),
    ...mapMutations('taikhoan', ['getListTaiKhoan']),
    deleteTaiKhoan (id) {
      this.deleteTaiKhoanRequest(id)
      if (localStorage.getItem('TKHoatdong')) {
        this.isShowAlertDelete = true
      }
    },
    addNewTaiKhoan (data) {
      this.addNewTaiKhoanRequest(data)
      // .then(data => {
      //   if (data.status) {
      //     alert("Thêm thành công!!!!")
      //     this.getListTaiKhoanRequest(this.searchObject)
      //   }else{
      //     alert("Thêm thất bại!!!!")
      //     this.getListTaiKhoanRequest(this.searchObject)
      //   }
      // }
      // )
      this.isShowCreate = false
    },
    editTaiKhoan (item) {
      this.itemEdit = item
      this.isShowEdit = true
    },
    updateTaiKhoan (data) {
      this.editTaiKhoanRequest(data)
      this.isShowEdit = false
    }
  },
  computed: {
    ...mapState('taikhoan', ['listTaiKhoan'])
  },
  mounted () {
    this.getListTaiKhoanRequest(this.searchObject)
  },
  components: {
    Action,
    FormTaiKhoan,
    Search
  }
}
</script>
