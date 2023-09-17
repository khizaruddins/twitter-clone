<template>
  <q-item-section avatar :top="top">
    <q-avatar>
      <i class="fa-solid fa-user"></i>
    </q-avatar>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AvatarComponent',
  props: {
    top: {
      type: Boolean,
      required: true,
      default: false
    },
    url : {
      type: String,
      required: true
    }
  }
})

</script>