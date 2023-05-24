<script setup>
import {onMounted, ref} from 'vue';
import AppHeader from './components/AppHeader.vue';
import MyName from "./components/MyName.vue";
import TodoPage from './components/TodoPage.vue';

const PAGES=['index', 'todos'];

const user=ref({name:"Artom"});
const currentPage=ref(PAGES[0]);

const onChangePage=(pageName)=>{
  console.log('onChangePage', pageName);
  currentPage.value=pageName;
}

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
    <div>Menu</div>
    <span><button @click="onChangePage(PAGES[0])">index</button></span>
    <span><button @click="onChangePage(PAGES[1])">todos</button></span>
  </div>

  <TodoPage v-if="user && currentPage===PAGES[1]"/>
  <div v-if="currentPage===PAGES[0]">
    HOME PAGE
  </div>
</template>

<style scoped>
</style>
TodoPage