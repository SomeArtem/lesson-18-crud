<template>  
  <h3><slot/></h3>
  <div>
    <slot name="sub-header"/>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
  },
  emits: ["delete"],
};
</script>

<style>
</style>