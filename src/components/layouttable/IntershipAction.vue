<template>
   <div>
     <v-btn icon color="success" @click="edit">
        <v-icon>edit</v-icon>
     </v-btn>
      <v-btn icon color="error" @click="isopen = true">
        <v-icon>delete_outline</v-icon>
      </v-btn>
      <ComfirmDelete
      />
   </div>
</template>
<script>
import ComfirmDelete from '../comfirm/ConfirmDelete'
export default {
  components: {
    ComfirmDelete
  },
  props: {
    item: Object
  },
  data () {
    return {
      isopen: false
    }
  },
  methods: {
    edit () {
      this.$emit('editIntership', this.item)
    }
  },
}
</script>
