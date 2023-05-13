<script setup>
//import HelloWorld from "./components/HelloWorld.vue";
import MyName from "./components/MyName.vue";
</script>

<template>
  <select name="status" @change="onSelectChange">
    <option v-if="!status" value="unselected" selected>unselected</option>
    <option v-for="item in statusList" :value="item" :key="item" :selected="item===status">{{item}}</option>
  </select>
  <MyName :status="status" @reset="onStatusReset"/>
</template>


<script>
  export default{
    data: ()=>({
        statusList:['Ready','Start','Stop'],
        status:null
    }),
    methods:{
      onSelectChange(ev){
        this.status=ev.target.value
      },
      onStatusReset(){
        this.status=null;
      }

    }
  }
</script>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
