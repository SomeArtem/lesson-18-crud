import {createRouter,createWebHashHistory} from 'vue-router';
import { useUserStore } from './store/userStore';

// import TodoPage from './components/TodoPage.vue';
// import IndexPage from './components/IndexPage.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path:'/',
            component: ()=> import('./pages/IndexPage.vue')
        },
        {
            path:'/todos',
            component: ()=> import('./pages/TodoPage.vue')
        },
        {
            path:'/todos/:id',
            component: ()=> import('./pages/TodoEditPage.vue')
        },
        {
            path:'/signin',
            component: ()=> import('./pages/SigninPage.vue')
        },

    ], 
  });

//   router.beforeEach((to, from)=>{
//     // const userStore=useUserStore()
//     if (to.path !=='/'&& !useUserStore().hasUser) return false;
//   });

  router.beforeEach((to, from, next)=>{
    // const userStore=useUserStore()
    const pb = inject('pb');
    const publicPages=['/','/signin'];
    const notallowedNavigation=publicPages.indexOf(to.path)<0 && !pb.authStore.isValid;
    if (notallowedNavigation) return next({path:'/signin'})
    
    next();
  });

  export default router;