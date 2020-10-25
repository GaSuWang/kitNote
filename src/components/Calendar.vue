<template>
  <div class="calendar">
    <v-calendar ref="calendar" :attributes="attributes"></v-calendar>
  </div>
</template>

<script>
export default {
  props: ["events"],
  data: function () {
    return {
      dateOpen: false,
      start: "",
      type: "month",
      //todos: [],
      todos: [],
    };
  },

  computed: {
    attributes() {
      return [
        // Attributes for todos
        ...this.todos.map((todo) => ({
          dates: todo.dates,
          dot: {
            color: todo.color,
            class: todo.isComplete ? "opacity-75" : "",
          },
          popover: {
            label: todo.description,
          },
          customData: todo,
        })),
      ];
    },
  },
  methods: {
    //attributes(){
    //return[
    /* ...this.events.map(todo =>({
          dates: todo.dates,
          dot:{
            color: todo.color,
            class: todo.isComplete ? 'opacity-75' : ''
          },
          popover:{
            label: todo.title
          },
          customData: todo
        }))
      ]*/
    //},
  },
  mounted() {
    for (var i = 0; i < this.events.length; i++)
      this.todos.push({
        description: this.events[i].title,
        isComplete: false,
        dates: this.events[i].deadline, // Every Friday
        color: "red",
      });
  },
  watch: {
    events: {
      handler() {
        this.todos = [];
        for (var i = 0; i < this.events.length; i++)
          this.todos.push({
            description: this.events[i].title,
            isComplete: false,
            dates: this.events[i].deadline, // Every Friday
            color: "red",
          });
      },
      deep: true,
    },
  },
};
</script>