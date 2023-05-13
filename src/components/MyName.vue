<template>
  <h1>
    Enter name:
    <input type="text" v-model="firstName" />
  </h1>
  <h1>{{ firstName }}</h1>
  <div><h6 :class="status?'selected':'unselected'">Status:</h6><span>{{status}}</span></div>
  <div>
    <button @click="onResetClick" :style="{visibility: status? 'visible':'hidden'}">Reset</button>
    </div>
</template>

<script>
export default {
  name: "MyName",
  props:{
    status:{
      type:String,
      default: 'empty',
    }
  },
  data:() =>({    
      firstName: "af",    
  }),
  emits:[
    'reset'
  ],
  methods:{
    onResetClick(){
      console.log('onResetClick');
      this.$emit('reset');

    }
  }
};
</script>

<style scoped>
.selected {
  color: green;   
}
.unselected {
  color: red;
}
</style>