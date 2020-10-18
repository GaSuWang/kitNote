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
    <select v-model="selectedCategory" @change="selectCategory">
      <option>전체</option>
      <option
        v-for="(category, index) in categories"
        :key="`category-${index}`"
      >
        {{ category }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["categorylist"],
  data: function () {
    return {
 
      selectedCategory: "전체",
      categories: [],
    };
  },
  mounted() {
    this.categories = this.categorylist.slice();
  },
  methods: {
    openEditor: function () {
      this.$emit("openEditor");
    },
    openSidebar: function () {
      this.$emit("openSidebar");
    },
  },
  watch: {
    categorylist: {
      handler() {
        this.categories = [];
        this.categories = this.categorylist.slice();
      },
    },
  },
};
</script>