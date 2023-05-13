<script setup>
//import HelloWorld from "./components/HelloWorld.vue";
import MyName from "./components/MyName.vue";
</script>

<template>
  <h3>To do list</h3>
  <input v-model="inputText" type="text" @keyup.enter="onKeyupEnter">
  <div>
    List:
    <div v-for="todo in todos" :key="todo">{{todo}}</div>
  </div>
</template>


<script>
  export default{
    data: ()=>({
      inputText:'',
      todos:[],
    }),
    computed:{
      canAddItemToList(){
        return this.inputText>0;
      }
    },
    methods:{
      onKeyupEnter(){
        this.todos.push(this.inputText);
        this.inputText='';
      }
    }
  }
</script>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
