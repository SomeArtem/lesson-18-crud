import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import AppComposition from './AppComposition.vue';
import router from './router';
import {createPinia} from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import PocketBase from 'pocketbase';



// const pinia = createPinia();




const pb = new PocketBase(import.meta.env.VITE_SERVER_PATH);

console.log("authStore.isValid ", pb.authStore.isValid);
  

createApp(AppComposition)
    .provide('pb',pb)
    .use(router)    
    .use(createPinia().use(piniaPluginPersistedState))
    .mount('#app');
