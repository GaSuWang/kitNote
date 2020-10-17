<template>
  <div class="header">
    <img src="../assets/logo.png" />
    <p>Vue.JS Sticky Notes</p>
    <button class="add-btn" @click.prevent="openEditor">
      <i class="fas fa-plus"></i>
    </button>
    <select v-model="sort_criterion">
      <option>등록일순</option>
      <option>마감일순</option>
      <option>제목순</option>
    </select>
    <button @click.prevent="ascendingSort">
      <i class="fas fa-sort-up"></i>
    </button>
    <button @click.prevent="decendingSort">
      <i class="fas fa-sort-down"></i>
    </button>
    <button @click.prevent="openCategoryList">카테고리</button>
    <select v-model="selectedCategory" @change="selectCategory" >
      <option>전체</option>
      <option  v-for="(category, index) in categories"
        :key="`category-${index}`">
        {{category}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
   props: ["categorylist"],
  data: function () {
    return {
      sort_criterion: "등록일순",
      selectedCategory:"전체",
      categories:[]
    };
  },
   mounted() {
    this.categories = this.categorylist.slice();
  },
  methods: {
    openEditor: function () {
      this.$emit("openEditor");
    },
    ascendingSort: function () {
      this.$emit("ascendingSort", this.sort_criterion);
    },
    decendingSort: function () {
      this.$emit("decendingSort", this.sort_criterion);
    },
    openCategoryList: function () {
      this.$emit("openCategoryList");
    },
    selectCategory: function(){
      this.$emit("selectCategory",this.selectedCategory)
    }
  },


};
</script>