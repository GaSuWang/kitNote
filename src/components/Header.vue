<template>
  <div class="header">
    <span @click.prevent="openSidebar">
      <i class="fas fa-bars"></i>
    </span>
    <img src="../assets/logo.png" />
    <p>KIT Sticky Notes</p>
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
    <div class="profile" v-if="isLogin">
        
    </div>
    
  </div>
</template>

<script>
export default {
  props: ["categorylist","Login"],
  data: function () {
    return {
      sort_criterion: "등록일순",
      selectedCategory: "전체",
      categories: [],
      isLogin:true
    };
  },
  mounted() {
    this.categories = this.categorylist.slice();
    this.isLogin=this.Login
  },
  methods: {
    openEditor: function () {
      this.$emit("openEditor");
    },
    openSidebar: function () {
      this.$emit("openSidebar");
    },
    selectCategory: function () {
      this.$emit("selectCategory", this.selectedCategory);
    },
  },
  watch: {
    categorylist: {
      handler() {
        this.categories = [];
        this.categories = this.categorylist.slice();
      },
    },
    Login:{
      handler(){
        this.isLogin=this.Login
      }
    }
  },
};
</script>