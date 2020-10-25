<template>
  <div class="todo-container">
    <h5>Todo List</h5>
    <ul>
      <li
        class="todo-item"
        v-for="(todo, index) in todos"
        :key="`todo-${index}`"
      >
        <p class="text">{{ todo }}</p>
        <button @click="complete(index)" class="complete">Complete</button>
        <button @click="deleteTodo(index)" class="delete">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["todos"],
  data() {
    return {};
  },
  methods: {
    complete(index) {
      index;
      // App.vue로 todos에서 해당 인덱스 제거 요청
    },
  },
};
</script>
