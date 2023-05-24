<script setup>
import AppHeader from './components/AppHeader.vue';
//import HelloWorld from "./components/HelloWorld.vue";
import MyName from "./components/MyName.vue";
import TodoItem from "./components/TodoItem.vue";
</script>

<template>
  <AppHeader>
    Todo App
    <template #sub-header >
      <!-- created by {{user.name}} -->
      <span v-if="user">created by {{user.name}}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader>  
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
const LOCAL_KEY_TODOS = "todos";
const LOCAL_KEY_INP_TEXT = "input_text";

let todoStopWatch;

export default {
  data: () => ({
    inputText: "",
    todos: [],
    user:{name:'Ortem'},
  }),
  computed: {
    canAddItemToList() {
      return this.todotext.length > 0;
    },
    todotext(){
      return this.inputText.trim();
    },
    gettodocount(){return this.todos.length>5 ? 'МНОГА' : this.todos.length}
  },
  methods: {
    onKeyupEnter() {
      this.todos.push(this.todotext);
      this.inputText = "";
      console.log('asdasdasd')
    },
    deleteMethod(ind) {
      console.log("delete", ind);
      this.todos.splice(ind, 1);

    },
  },
  created() {
    const rawTodos = localStorage.getItem(LOCAL_KEY_TODOS);
    console.log("created rawTodos: ", rawTodos);
    this.todos=rawTodos && JSON.parse(rawTodos) || [];
    this.inputText = JSON.parse(localStorage.getItem(LOCAL_KEY_INP_TEXT)||null);

    
    // fetch('http://jsonplaceholder.typicode.com/todos?_start=0&_limit=5')
    // .then((response)=>{response.json()})
    // .then((rawData)=>this.todos.push(...rawData.map((item)=>{
    //   console.log(item.title)
    //   item.title
    //   })));
    
    todoStopWatch = this.$watch(
      () => this.todos,
      (value) => {
        console.log(value);
        localStorage.setItem(LOCAL_KEY_TODOS, JSON.stringify(value));
      }, {deep:true}
    );
    this.$watch(
      () => this.inputText,
      (value) => {
        console.log(value);
        localStorage.setItem(LOCAL_KEY_INP_TEXT, JSON.stringify(value));
      },);
  },

  mounted(){
    console.log('mounted, dominput: ', this.$refs.dominput)
  },

  unmounted(){
    todoStopWatch();
  }
};
</script>

<style scoped>
</style>
