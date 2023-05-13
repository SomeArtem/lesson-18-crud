<script setup>
//import HelloWorld from "./components/HelloWorld.vue";
import MyName from "./components/MyName.vue";
import TodoItem from "./components/TodoItem.vue";
</script>

<template>
  <h3>To do list</h3>
  <input v-model="inputText" type="text" @keyup.enter="onKeyupEnter" />
  <div>
    List:
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
export default {
  data: () => ({
    inputText: "",
    todos: [],
  }),
  computed: {
    canAddItemToList() {
      return this.inputText > 0;
    },
  },
  methods: {
    onKeyupEnter() {
      this.todos.push(this.inputText);
      this.inputText = "";
    },
    deleteMethod(el) {
      console.log("delete", el);
      this.todos.splice(el, 1);
    },
  },
  created() {
    const rawTodos = localStorage.getItem(LOCAL_KEY_TODOS);
    console.log("created");
    if (rawTodos) {
      this.todos = JSON.parse(rawTodos);
    }
    this.$watch(
      () => this.todos,
      (newValue, prevValue) => {
        console.log(newValue, prevValue);
      }
    );
  },
};
</script>

<style scoped>
</style>
