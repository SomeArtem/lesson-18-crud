// import { ref } from 'vue';
// import {parseLocalStorage} from '../utils/StorageUtils';
import { defineStore } from 'pinia';

// const LOCAL_KEY_TODOS = "todos";
// const LOCAL_KEY_INP_TEXT = "input_text";

// const inputText = ref(parseLocalStorage(LOCAL_KEY_INP_TEXT, null));
// const todos = ref(parseLocalStorage(LOCAL_KEY_TODOS,'[]'));

// const gettodocount=computed(()=> todos.value.length>5 ? 'МНОГА' : todos.value.length);

// export {todos};

export const useTodosStore = defineStore('todos', {
    state: () => ({todos:[]}),
    getters: {
        getTodoByIndex:(state)=>{
            return (index)=> state.todos[index]
        },
        gettodocount: (state)=> {return state.todos.length>5 ? 'МНОГА' : state.todos.length},
    },
    actions: {
        creteTodo(todoText){
            console.log('creteTodo',todoText);
            this.todos.push(todoText);
        },
        deleteTodoByIndex(index){
            console.log('deleteTodoByIndex', index);
            this.todos.splice(index, 1);
        },
        editTodoTextByIndex(index, text){
            console.log('editTodoTextByIndex',index,text);    
            this.todos[index]=text;                 
        },
    },
    persist:true,
})