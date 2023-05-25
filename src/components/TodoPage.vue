<script setup>
    import { computed, onMounted, ref, watch } from 'vue';
    import TodoItem from "./TodoItem.vue";
    import {parseLocalStorage, saveToLocalStorage} from '../utils/StorageUtils'
    import {useTodosStore} from "../store/todosStore"
    import { storeToRefs } from 'pinia';
    
    const LOCAL_KEY_TODOS = "todos";
    const LOCAL_KEY_INP_TEXT = "input_text";


    const inputText = ref(parseLocalStorage(LOCAL_KEY_INP_TEXT, null));
    // const todos = ref(parseLocalStorage(LOCAL_KEY_TODOS,'[]'));


    const todoStore=useTodosStore();
    const { todos } = storeToRefs(todoStore);

   

    const canAddItemToList=computed(()=>true);
    const gettodotext=computed(()=> inputText.value?.trim());
    // const gettodocount=computed(()=> todos.value.length>5 ? 'МНОГА' : todos.value.length);
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
            saveToLocalStorage(LOCAL_KEY_INP_TEXT, value);
    });

    watch(todos, (value) => {
        console.log('todoStopWatch',value);
        saveToLocalStorage(LOCAL_KEY_TODOS, value);
    }, {deep:true});
</script>



<template>
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
export default {
    name:"TodoPage",

}
</script>

<style scoped>

</style>