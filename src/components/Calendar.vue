<template>
  <div class="calendar">
    <v-calendar ref="calendar" :start="start" :type="type" dark></v-calendar>
  </div>
</template>

<script>
export default {
  props: ["notes"],
  data: function () {
    return {
      dateOpen: false,
      start: "",
      type: "month",
      events: [],
    };
  },

  methods: {
    /*
    parsingFromNotes() {
      for (i = 0; i < notes.length; i++) {}
    },
    */
  },
};
</script>