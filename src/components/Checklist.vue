<template>
  <div id="todo-list">
    <ul>
      <li
        is="todo-item"
        v-for="(todo, index) in todos"
        v-bind:key="todo.id"
        v-bind:title="todo.title"
        v-on:remove="todos.splice(index, 1)"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["todos"],
  data: function () {
    return {};
  },
  watch: {
    todos: {
      handler() {
        // todo가 변경되었을 경우 핸들러 추가 바람
      },
      deep: true,
    },
  },
};
</script>
