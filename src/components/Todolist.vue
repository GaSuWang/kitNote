<template>
  <div class="todo-container">
    <h5>Todo List</h5>
    <ul>
      <li
        class="todo-item"
        v-for="(todo, index) in todos"
        :key="`todo-${index}`"
      >
        <p class="text">{{ todo.title }}</p>
        <button @click="complete(index)" class="complete">Complete</button>
  
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["checklist"],
  data() {
    return {todos:[]};
  },
  methods: {
    complete(index) {
      this.$emit("completeTodo",index)
      this.todos.splice(index,1)
    },
  },
   mounted() {
        this.todos=[]
         for(var i =0; i<this.checklist.length;i++){
        this.todos.push(this.checklist[i])
      } 
  },
  watch: {
    checklist: {
      handler() {
                this.todos=[]
           for(var i =0; i<this.checklist.length;i++){
              this.todos.push(this.checklist[i])
           }
      },
      deep: true,
    },
  }

};
</script>
