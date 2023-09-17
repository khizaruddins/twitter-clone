<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <home-component/>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import HomeComponent from 'components/HomeComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  components: { HomeComponent }
});
</script>
