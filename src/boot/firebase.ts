import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBf4IadBDyqIByQI8PP3YYTpgqGMZu0dbs',
  authDomain: 'linkedin-clone-72397.firebaseapp.com',
  projectId: 'linkedin-clone-72397',
  storageBucket: 'linkedin-clone-72397.appspot.com',
  messagingSenderId: '984037568839',
  appId: '1:984037568839:web:b3cf9e5472713a70765c62'
} 


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
