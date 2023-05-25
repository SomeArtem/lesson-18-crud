import {createRouter,createWebHashHistory} from 'vue-router';

// import TodoPage from './components/TodoPage.vue';
// import IndexPage from './components/IndexPage.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path:'/',
            component: ()=> import('./components/IndexPage.vue')
        },
        {
            path:'/todos',
            component: ()=> import('./components/TodoPage.vue')
        },
        {
            path:'/todos/:id',
            component: ()=> import('./components/TodoEditPage.vue')
        }

    ], 
  });

  export default router;