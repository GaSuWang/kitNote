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
    
  </div>
</template>

<script>
export default {
  props: ["categorylist"],
  data: function () {
    return {
      sort_criterion: "등록일순",
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
    selectCategory: function(){
      this.$emit("selectCategory",this.selectedCategory)
    }

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