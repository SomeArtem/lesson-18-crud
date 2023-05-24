import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AppComposition from './AppComposition.vue'
import {createRouter,createWebHashHistory,} from 'vue-router'
import TodoPage from './components/TodoPage.vue'
import IndexPage from './components/IndexPage.vue'



const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path:'/',
            component: IndexPage
        },
        {
            path:'/todos',
            component: TodoPage
        }

    ], 
  })
  

createApp(AppComposition).use(router).mount('#app')
