<template>
  <div class="todo-container">
    <h5>Todo List</h5>
    <ul>
      <li
        class="todo-item"
        v-for="(todo, index) in todos"
        :key="`todo-${index}`"
      >
        <p class="text">{{ todo.text }}</p>
        <button
          v-if="todo.completed"
          @click="compelete(index)"
          class="complete completed"
        >
          Complete
        </button>
        <button v-else @click="compelete(index)" class="complete">
          Complete
        </button>
        <button @click="deleteTodo(index)" class="delete">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    compeleteTodo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },
  },
};
</script>
