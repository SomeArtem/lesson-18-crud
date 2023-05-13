<template>
  <div>
    <span>{{ index }}. {{ text }}</span>
    <button @click="$emit('delete')">delete</button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    index: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: "",
    },
  },
  emits: ["delete"],
};
</script>

<style>
</style>