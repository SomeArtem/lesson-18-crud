import {createRouter,createWebHashHistory} from 'vue-router';
import { useUserStore } from './store/userStore';
import { inject } from 'vue'
import ROUTES, { PUBLIC_PAGES } from './constants/routes';

// import TodoPage from './components/TodoPage.vue';
// import IndexPage from './components/IndexPage.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: ROUTES.INDEX,
            component: ()=> import('./pages/IndexPage.vue')
        },
        {
            path: ROUTES.TODOS,
            component: ()=> import('./pages/TodoPage.vue')
        },
        {
            path: ROUTES.TODOS_ID,
            component: ()=> import('./pages/TodoEditPage.vue')
        },
        {
            path: ROUTES.SIGNIN,
            component: ()=> import('./pages/SigninPage.vue')
        },
        {
            path: ROUTES.SIGNUP,
            component: ()=> import('./pages/SignupPage.vue')
        },
        {
            path: ROUTES.BOOKS,
            component: ()=> import('./pages/BooksPage.vue')
        },

    ], 
  });

  router.beforeEach((to, from, next)=>{
    const pb = inject('pb');
    const publicPages=PUBLIC_PAGES;
    const notallowedNavigation=publicPages.indexOf(to.path)<0 && !pb.authStore.model?.id;
    if (notallowedNavigation) return next({path:'/signin'})
    
    next();
  });

  export default router;