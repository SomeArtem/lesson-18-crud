<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import AppHeader from './components/AppHeader.vue';
import MyName from "./components/MyName.vue";
import TodoItem from "./components/TodoItem.vue";

const LOCAL_KEY_TODOS = "todos";
const LOCAL_KEY_INP_TEXT = "input_text";

const inputText = ref(JSON.parse(localStorage.getItem(LOCAL_KEY_INP_TEXT)||null));
const todos = ref(JSON.parse(localStorage.getItem(LOCAL_KEY_TODOS)||'[]'));
const canAddItemToList=computed(()=>true);
const gettodotext=computed(()=> inputText.value?.trim());
const gettodocount=computed(()=> todos.value.length>5 ? 'МНОГА' : todos.value.length);
const onKeyupEnter =()=>{
  console.log('onKeyupEnter',gettodotext.value);
  todos.value.push(gettodotext.value);
  inputText.value = "";
}

const deleteMethod =(ind)=>{
  console.log("deleteMethod", ind);
  todos.value.splice(ind, 1);
}

watch(inputText, (value)=>{
        console.log(value);
        localStorage.setItem(LOCAL_KEY_INP_TEXT, JSON.stringify(value));
});

watch(todos, (value) => {
    console.log('todoStopWatch',value);
    localStorage.setItem(LOCAL_KEY_TODOS, JSON.stringify(value));
  }, {deep:true});

onMounted(()=>{
  console.log('onMounted')
});

</script>

<template>
  <!-- <AppHeader>
    Todo App
    <template #sub-header >
      <span v-if="user">created by {{user.name}}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader>   -->
  <input ref="dominput" v-model="inputText" type="text" @keyup.enter="canAddItemToList && onKeyupEnter()" />
  <div>
    List: <span v-if="todos.length">({{gettodocount}})</span>
    <span v-else>empty</span>
    <div>
      <TodoItem
        v-for="(item, index) in todos"
        :key="item"
        :text="item"
        :index="index + 1"
        @delete="deleteMethod(index)"
      />
    </div>
  </div>
</template>


<script>


let todoStopWatch;

export default {
  components:{}
//   data: () => ({
//     inputText: "",
//     todos: [],
//     user:{name:'Ortem'},
//   }),
//   computed: {
//     canAddItemToList() {
//       return this.todotext.length > 0;
//     },
//     todotext(){
//       return this.inputText.trim();
//     },
//     gettodocount(){return this.todos.length>5 ? 'МНОГА' : this.todos.length}
//   },
//   methods: {
//     onKeyupEnter() {
//       this.todos.push(this.todotext);
//       this.inputText = "";
//       console.log('asdasdasd')
//     },
//     deleteMethod(ind) {
//       console.log("delete", ind);
//       this.todos.splice(ind, 1);

//     },
//   },
//   created() {
//     const rawTodos = localStorage.getItem(LOCAL_KEY_TODOS);
//     console.log("created rawTodos: ", rawTodos);
//     this.todos=rawTodos && JSON.parse(rawTodos) || [];
//     this.inputText = JSON.parse(localStorage.getItem(LOCAL_KEY_INP_TEXT)||null);
    
//     todoStopWatch = this.$watch(
//       () => this.todos,
//       (value) => {
//         console.log(value);
//         localStorage.setItem(LOCAL_KEY_TODOS, JSON.stringify(value));
//       }, {deep:true}
//     );
//     this.$watch(
//       () => this.inputText,
//       (value) => {
//         console.log(value);
//         localStorage.setItem(LOCAL_KEY_INP_TEXT, JSON.stringify(value));
//       },);
//   },

//   mounted(){
//     console.log('mounted, dominput: ', this.$refs.dominput)
//   },

//   unmounted(){
//     todoStopWatch();
//   }
};
</script>

<style scoped>
</style>
