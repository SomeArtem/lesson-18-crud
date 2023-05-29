import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import AppComposition from './AppComposition.vue';
import router from './router';
import {createPinia} from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import PocketBase from 'pocketbase';



// const pinia = createPinia();




const pb = new PocketBase('http://127.0.0.1:8090');
  

createApp(AppComposition)
    .use(router)
    .use(createPinia().use(piniaPluginPersistedState))
    .mount('#app');
