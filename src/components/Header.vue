<template>
  <div class="header">
    <span @click.prevent="openSidebar">
      <i class="fas fa-bars"></i>
    </span>
    <img src="../assets/logo.png" />
    <p>Vue.JS Sticky Notes</p>
    <button class="add-btn" @click.prevent="openEditor">
      <i class="fas fa-plus"></i>
    </button>
    <button @click.prevent="openCategoryList">카테고리</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      sort_criterion: "등록일순",
    };
  },
  methods: {
    openEditor: function () {
      this.$emit("openEditor");
    },
    ascendingSort: function () {
      console.log(this.sort_criterion);
      this.$emit("ascendingSort", this.sort_criterion);
    },
    decendingSort: function () {
      this.$emit("decendingSort", this.sort_criterion);
    },
    openCategoryList: function () {
      this.$emit("openCategoryList");
    },
    openSidebar: function () {
      this.$emit("openSidebar");
    },
  },
};
</script>