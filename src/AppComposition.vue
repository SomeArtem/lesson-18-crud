<script setup>
import {onMounted, ref} from 'vue';
import AppHeader from './components/AppHeader.vue';
import IndexPage from './components/IndexPage.vue';
import MyName from "./components/MyName.vue";
import TodoPage from './components/TodoPage.vue';


const user=ref({name:"Artom"});

onMounted(()=>{
  console.log('onMounted');
});
</script>

<template>
  <AppHeader>
    Todo App
    <template #sub-header >
      <span v-if="user">created by {{user.name}}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader> 

  <div>
    <router-link to="/">index</router-link>
    <router-link to="/todos">todos</router-link>
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