import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import AppComposition from './AppComposition.vue';
import router from './router';
import {createPinia} from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';



// const pinia = createPinia();

  

createApp(AppComposition)
    .use(router)
    .use(createPinia().use(piniaPluginPersistedState))
    .mount('#app');
