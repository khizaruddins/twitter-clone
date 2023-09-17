<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{ $route.name }}</span>
          <q-icon name="fa-solid fa-feather-pointed" class="q-pa-md lt-md header-icon" size="sm" color="primary" />
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer :width="283" show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="row items-center">
        <q-icon name="fa-solid fa-feather-pointed" class="q-pa-md" size="lg" color="primary" />
        <h5 class="text-weight-bold ">Twico</h5>
      </div>
      <q-list>
        <q-item 
            to="/"
            exact
            clickable 
            v-ripple>
            <q-item-section avatar>
              <q-icon name="home" size="md" />
            </q-item-section>
            <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>
        <q-item 
            to="/about"
            clickable 
            exact
            v-ripple>
            <q-item-section avatar>
              <q-icon name="help" size="md" />
            </q-item-section>
            <q-item-section class="text-h6 text-weight-bold">About</q-item-section>
        </q-item>
        
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-input outlined rounded dense class="q-ma-md" placeholder="Search Twico">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <news-component></news-component>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

  </q-layout>
</template>

<script>
import NewsComponent from 'src/components/NewsComponent.vue'
import { ref } from 'vue'

export default {
  components: {
    'NewsComponent': NewsComponent
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style lang="scss">
  .header-icon {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
</style>