<template>
  <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
    <div class="col">
      <q-input 
        bottom-slots 
        v-model="newTwicoContent" 
        class="new-twico"
        autogrow
        placeholder="What's happening?" counter maxlength="280">
  
        <template v-slot:before>
          <avatar-component :top="false" url="https://media.licdn.com/dms/image/C4D03AQFRa-PT-Ww3CQ/profile-displayphoto-shrink_400_400/0/1654750359070?e=1700092800&v=beta&t=pRjZPkfYdJ8HXTAU1lL-X1wOMze5vxSoZNkuXbut2zY" />
        </template>
      </q-input>
    </div>
    <div class="col col-shrink">
      <q-btn 
        rounded 
        unelevated 
        class="q-mb-lg"
        color="primary" 
        no-caps
        :disable="!newTwicoContent"
        @click="addNewTwico"
        label="Twico" />
    </div>
  </div>
  <q-separator size="10px" color="grey-2" class="divider" />

  <q-list separator>

    <transition-group
      appear
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow">
      <q-item class="q-py-md" v-for="twicoItem in twicoList" :key="twicoItem.id">
        <avatar-component :top="true" url="https://media.licdn.com/dms/image/C4D03AQFRa-PT-Ww3CQ/profile-displayphoto-shrink_400_400/0/1654750359070?e=1700092800&v=beta&t=pRjZPkfYdJ8HXTAU1lL-X1wOMze5vxSoZNkuXbut2zY" />
        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">
              <strong> You </strong>
            </span>
            <span class="text-grey-7">
              @you
              &bull;
              <br class="lt-md"> 
              {{ simplifyDate(twicoItem.date) }}
            </span>
          </q-item-label>
          <q-item-label class="twico-content">{{ twicoItem.content }}
          </q-item-label>

          <div class="twico-icons row justify-between q-mt-sm">
            <q-btn color="grey" flat round icon="fa-regular fa-comment" size="sm"></q-btn>
            <q-btn color="grey" flat round icon="fa-solid fa-retweet" size="sm"></q-btn>
            <q-btn 
              :color="twicoItem.likes  > 0 ? 'red':'grey'"
                flat round :icon="twicoItem.likes  > 0 ? 
                'fa-solid fa-heart': 'fa-regular fa-heart'" 
                size="sm"
                @click="likeTwico(twicoItem)">
              <span class="q-pa-sm text-size-md">
                {{ twicoItem.likes }}
              </span>
            </q-btn>
            <q-btn color="grey" flat round icon="fa-solid fa-trash" @click="deleteTwicoItem(twicoItem)" size="sm"></q-btn>
          </div>
        </q-item-section>
      </q-item>
      <q-item v-if="twicoList.length === 0">
        <q-item-section>
          <q-item-label>
            <h5 class="flex justify-center">
              Looks like you haven't added any tweet yet
            </h5>
          </q-item-label>
        </q-item-section>
      </q-item>
    </transition-group>
    <q-separator />
  </q-list>
</template>

<script lang="ts">
interface TwicoI {
  content:string;
  date: number;
  id: string;
  likes: number;
}
import { doc, query, onSnapshot, orderBy, collection, addDoc, deleteDoc, setDoc } from 'firebase/firestore';

import AvatarComponent from './AvatarComponent.vue';
import { formatDistance } from 'date-fns';
import db from '../boot/firebase';

import {
  defineComponent
} from 'vue';
export default defineComponent({
  name: 'HomeComponent',
  components: {
    'AvatarComponent': AvatarComponent
  },
  data() {
    return {
      newTwicoContent: '',
      twicoList: [] as TwicoI[]
    }
  },
  methods : {
    likeTwico(twicoItem: TwicoI) {
      twicoItem.likes ++;
      const twicoRef = doc(db, 'twicoList', twicoItem.id);
      setDoc(twicoRef, { likes: twicoItem.likes }, { merge: true });
    },
    async addNewTwico() {
      const newTwico = {
        content: this.newTwicoContent,
        date: Date.now(),
        likes: 0
      }
      await addDoc(collection(db, 'twicoList'), newTwico);
      this.newTwicoContent = '';
    },
    async deleteTwicoItem(twicoItem: TwicoI) {
      await deleteDoc(doc(db, 'twicoList', twicoItem.id));
    },
    simplifyDate(value: number) {
      return formatDistance(value, new Date())
    }
  },
  mounted()  {
      const q = query(collection(db, 'twicoList'), orderBy('date'));
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const twicoChange = change.doc.data() as TwicoI;
          twicoChange.id = change.doc.id;
          if (change.type === 'added') {
              this.twicoList.unshift(twicoChange);
          }
          if (change.type === 'modified') {
              console.log('Modified twico tweet: ', twicoChange);
          }
          if (change.type === 'removed') {
              console.log('Removed twico tweet: ', twicoChange);
              const id = this.twicoList.findIndex(item => item.id === twicoChange.id);
              this.twicoList.splice(id, 1);
          }
        })
      });
  }
});
</script>

<style lang="scss">
.new-twico {
  font-size: 19px;
  textarea {
    line-height: 1.4 !important;
  }
}
.divider {
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: $grey-4;
}
.twico-content {
  white-space: pre-line;
}
.twico-icons {
  transform: translateX(-5px)
}
</style>
