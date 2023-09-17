<template>
  <q-page class="q-pa-lg">
    <about-component/>
  </q-page>
</template>

<script lang="ts">
import AboutComponent from 'components/AboutComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutPage',
  components: { AboutComponent }
});
</script>
