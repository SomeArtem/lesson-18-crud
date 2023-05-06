<template>
  <h1>
    Enter name:
    <input type="text" v-model="firstName" />
  </h1>
  <h1>{{ firstName }}</h1>
</template>

<script>
export default {
  name: "MyName",
  data() {
    return {
      firstName: "af",
    };
  },
};
</script>

<style>
</style>