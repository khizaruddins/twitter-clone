<template>
    <q-list padding separator>
      <q-item class="q-pa-md" v-for="(news, index) of newsList" :key="index" clickable v-ripple target="_blank" :href="news.url">
        <q-item-section>
          <q-item-label overline class="text-grey">{{ news.author }}</q-item-label>
          <q-item-label class="text-weight-bold">{{ news.title }}</q-item-label>
          <q-item-label caption>{{ news.content }}</q-item-label>
        </q-item-section>          

        <q-item-section side top>
          <q-item-label caption>{{ simplifyDate(news.publishedAt) }}</q-item-label>
        </q-item-section>

      </q-item>
    </q-list>
</template>

<script lang="ts">

interface INews {
  author: string;
  title: string;
  url: string;
  publishedAt: string;
  content: string;
  source: { id: string | null, name: string },
  urlToImage: string;
}
import { defineComponent } from 'vue'
import {formatDistance} from 'date-fns';

export default defineComponent({
  name: 'NewsComponent',
  async mounted() {
    const news = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/health/in.json')
    await news.json().then(val=> {
      this.newsList = val.articles;
    });
  },
  data() {
    return {
      newsList: [] as INews[]
    }
  },
  methods: {
    simplifyDate(date: string) {
      return formatDistance(new Date(date).getTime(), new Date());
    }
  }
})
</script>

<style scoped>

</style>