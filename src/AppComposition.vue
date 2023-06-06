<script setup>
import { storeToRefs } from 'pinia';
import {computed, inject, onMounted, reactive, ref} from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppMenu from './components/AppMenu.vue';
// import IndexPage from './components/IndexPage.vue';
// import TodoPage from './components/TodoPage.vue';
import ROUTES from "./constants/routes";
import { useUserStore } from "./store/userStore";


const pb = inject('pb');
const user=ref(pb.authStore.model);
pb.authStore.onChange(()=>{
  user.value=pb.authStore.model;
})
// const hasUser=computed(()=> pb.auth);
const hasUser=computed(()=> !!user.value);


const checkRouteIsNotCurrent=(route)=>useRoute().path!==route;

const menyLinks=reactive( [
      {name: 'Index', link:ROUTES.INDEX, canRender:computed(()=> checkRouteIsNotCurrent(ROUTES.INDEX))},
      {name: 'Todos', link:ROUTES.TODOS, canRender:computed(()=> hasUser.value && checkRouteIsNotCurrent(ROUTES.TODOS))},
      {name: 'Books', link:ROUTES.BOOKS, canRender:computed(()=> hasUser.value && checkRouteIsNotCurrent(ROUTES.BOOKS))},
      {name: 'SignIn', link:ROUTES.SIGNIN, canRender:computed(()=> !hasUser.value && checkRouteIsNotCurrent(ROUTES.SIGNIN))},
      {name: 'SignUp', link:ROUTES.SIGNUP, canRender:computed(()=> !hasUser.value && checkRouteIsNotCurrent(ROUTES.SIGNUP))},
      {name: 'SignOut', link:ROUTES.INDEX, canRender:computed(()=> hasUser.value), onClick:()=>{
        console.log('SignOut');
        pb.authStore.clear();
      }},
     ]);

</script>

<template>
  <AppHeader>
    Todo App
    <template #sub-header >
      <span v-if="hasUser">created by {{user.username}}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader> 

<AppMenu :links="menyLinks" style="margin: 2rem 0"/>

  <router-view/>
</template>

<style scoped>
</style>