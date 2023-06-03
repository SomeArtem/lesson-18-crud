<script setup>
import { storeToRefs } from 'pinia';
import {computed, inject, onMounted, ref} from 'vue';
import AppHeader from './components/AppHeader.vue';
// import IndexPage from './components/IndexPage.vue';
import MyName from "./components/MyName.vue";
// import TodoPage from './components/TodoPage.vue';
import ROUTES from "./constants/routes";

import { useUserStore } from "./store/userStore";

const ROUTE_SIGNIN=ROUTES.SIGNIN;
const ROUTE_TODOS=ROUTES.TODOS;

const pb = inject('pb');

// const hasUser=computed(()=> pb.auth);
const hasUser=computed(()=> pb.authStore.isValid);
const {user}=storeToRefs(useUserStore());

onMounted(()=>{
  console.log('onMounted');
});
</script>

<template>
  <AppHeader>
    Todo App
    <template #sub-header >
      <span v-if="hasUser">created by {{user.name}}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader> 

  <div style="margin: 2rem 0">
    <router-link to="/">index</router-link>
    <router-link v-if="hasUser" :to="ROUTE_TODOS">todos</router-link>
    <router-link v-else :to="ROUTE_SIGNIN">sign in</router-link>
  </div>

  <!-- <div>
    <div>Menu</div>
    <span><button @click="onChangePage(PAGES[0])">index</button></span>
    <span><button @click="onChangePage(PAGES[1])">todos</button></span>
  </div> -->

  <router-view/>
</template>

<style scoped>
</style>