<script setup>
import { computed, onMounted } from "vue";

  const props = defineProps({
      index: {
        type: Number,
        default: 0,
      },
      text: {
        type: String,
        default: "",
      },
    });
  defineEmits(['delete']);

  const pathToEdit=computed(()=> `/todos/${props.index}`);

  onMounted(()=>{
    console.log('todoitem props.text', props.text)
  })
</script>


<template>
  <div>
    <span>{{ index }}. <router-link :to="pathToEdit">{{ text }}</router-link></span>
    <button @click="$emit('delete')">delete</button>
  </div>
</template>

<style>
</style>