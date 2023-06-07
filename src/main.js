import { createApp } from 'vue';
import './style.css';
// import App from './App.vue';
import AppComposition from './AppComposition.vue';
import router from './router';
import {createPinia} from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import PocketBase from 'pocketbase';



// const pinia = createPinia();




const pb = new PocketBase(import.meta.env.VITE_SERVER_PATH);

let db=new PouchDB('http://127.0.0.1:5984/books');
// console.log('PouchDB', db);
// console.log('db.get', db.get('Book1'));
db.get('Book1').then((doc)=>{
    console.log(doc);
}).catch((err)=>{
    console.log('err:', err);
});



db.changes({
    since: 'now',
    live: true,
    include_docs: true
  }).on('change', function(change) {
    console.log('change', change);
    // handle change
  }).on('complete', function(info) {
    console.log('complete', info);
    // changes() was canceled
  }).on('error', function (err) {
    console.log(err);
  });




console.log("authStore.isValid ", pb.authStore.isValid);
  

createApp(AppComposition)
    .use(createPinia().use(piniaPluginPersistedState))
    .provide('pb', pb)
    .use(router)    
    .mount('#app');
