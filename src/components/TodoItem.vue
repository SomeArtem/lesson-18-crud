<script setup>
import { onMounted } from "vue";

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

  onMounted(()=>{
    console.log('todoitem props.text', props.text)
  })
</script>


<template>
  <div>
    <span>{{ index }}. {{ text }}</span>
    <button @click="$emit('delete')">delete</button>
  </div>
</template>

<style>
</style>