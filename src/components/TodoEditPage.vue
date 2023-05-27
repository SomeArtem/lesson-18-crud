<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter, useRoute } from "vue-router";
    import { useTodosStore } from '../store/todosStore';

    const todoStore=useTodosStore();

    const router = useRouter();
    const route = useRoute();
    const status=ref(route.query.status);

    const todoIndex=parseInt(route.params.id)-1;
    const todo=ref(todoStore.getTodoByIndex(todoIndex));
    // const todo=ref(todos.value[parseInt(route.params.id-1)]);

    // const onSelectChange=(e)=>{
    //     console.log('onSelectChange',e.target.value);
    //     status.value=e.target.value;
    // }
    const onSelectChange=({target})=>{
        console.log('onSelectChange',target.value);
        status.value=target.value;
        router.replace({...route, query:{status: status.value}});
    }
    const onEditConfirm=()=>{
        // console.log('onEditConfirm', todo.value);
        todoStore.editTodoTextByIndex(todoIndex, todo.value)
    }
    const onTodoTextKeyup=({currentTarget})=>{
        console.log('onTodoTextKeyup',currentTarget)
    }
    onMounted(()=>{
        console.log('route.params.id',route.params.id);
    });
</script>

<template>
    <div>
        <div>
            TODO EDIT PAGE {{route.params.id}} {{todo}}
        </div>
        <div>
            <label for="inputTodoEdit">Todo Text</label>
            <input name="inputTodoEdit" v-model="todo" @keyup="onTodoTextKeyup">
            <button @click="onEditConfirm">confirm</button>
        </div>
        
        <select name="status" @change="onSelectChange">
            <option v-if="!status" value="unselected" selected>Unselected</option>
            <option v-for="item in ['Ready', 'Start', 'Stop']" :key="item" :value="item" :selected="item === status">{{ item }}</option>
        </select>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>