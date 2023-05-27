import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({user: {name:'Aortom'},}),
    getters: {
        // gettodocount: (state)=> {return state.todos.length>5 ? 'МНОГА' : state.todos.length},
        hasUser:(state)=>!!state.user.name,
    },
    actions: {
        // creteTodo(todoText){
        //     console.log('creteTodo',todoText);
        //     this.todos.push(todoText);
        // },
    },
    persist:true,
})