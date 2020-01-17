<template>
  <v-dialog :value="isShowPopup" @input="$emit('cancel')" width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Xác nhận</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
           <span>{{ messageConfirm }}</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$emit('cancel')">Huỷ bỏ</v-btn>
          <v-btn color="primary" @click="$emit('remove')">Xóa</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isShowPopup: Boolean,
    messageConfirm: String
  }
}
</script>
