<template>
   <div>
     <v-btn icon color="success" @click="edit">
        <v-icon>edit</v-icon>
     </v-btn>
      <v-btn icon color="error" @click="isShowPopup = true">
        <v-icon>delete_outline</v-icon>
      </v-btn>
      <ComfirmDelete
         :isShowPopup = "isShowPopup"
         @remove="deleteComfirm"
         @cancel="abc"
         messageConfirm="Bạn có chắc chắn muốn xóa tài khoản này ?"
      />
   </div>
</template>
<script>
import ComfirmDelete from '../comfirm/ConfirmDelete'
export default {
  data () {
    return {
      isShowPopup: false
    }
  },
  props: {
    item: Object
  },
  components: {
    ComfirmDelete
  },
  methods: {
    deleteComfirm () {
      this.$emit('deleteTaiKhoan')
      this.isShowPopup = false
    },
    edit () {
      this.$emit('editTaiKhoan', this.item)
    },
    abc () {
      this.isShowPopup = false
    }
  }
}
</script>
