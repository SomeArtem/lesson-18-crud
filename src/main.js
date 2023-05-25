import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import AppComposition from './AppComposition.vue';
import router from './router';
import {createPinia} from 'pinia';



// const pinia = createPinia();





  

createApp(AppComposition).use(router).use(createPinia()).mount('#app');
