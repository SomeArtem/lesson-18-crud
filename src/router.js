import {createRouter,createWebHashHistory} from 'vue-router';
import { useUserStore } from './store/userStore';

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
        },
        {
            path:'/signin',
            component: ()=> import('./components/SigninPage.vue')
        },

    ], 
  });

//   router.beforeEach((to, from)=>{
//     // const userStore=useUserStore()
//     if (to.path !=='/'&& !useUserStore().hasUser) return false;
//   });

  router.beforeEach((to, from, next)=>{
    // const userStore=useUserStore()
    const publicPages=['/','/signin'];
    const notallowedNavigation=publicPages.indexOf(to.path)<0 && !useUserStore().hasUser;
    if (notallowedNavigation) return next({path:'/signin'})
    
    next();
  });

  export default router;