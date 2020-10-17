<template>
<<<<<<< HEAD
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
  },
};
=======
    <div class="header">     
      <img src="../assets/logo.png">
      <p>Vue.JS Sticky Notes</p>
      <button class="add-btn" @click.prevent="openEditor"><i class="fas fa-plus"></i></button>    
      <select v-model = "sort_criterion">
        <option>등록일순</option>
        <option>마감일순</option>
        <option>제목순</option>
      </select>
      <button @click.prevent="ascendingSort"><i class="fas fa-sort-up"></i></button>
      <button @click.prevent="decendingSort"><i class="fas fa-sort-down"></i></button>
      <button @click.prevent="openCategoryList">카테고리</button>
    </div>
</template>

<script>
    export default {
      data: function () {
        return {
          sort_criterion:"등록일순"
        };
      },
       methods:{
          openEditor: function(){
            this.$emit('openEditor');
          },
          ascendingSort: function(){
            console.log(this.sort_criterion)
            this.$emit('ascendingSort',this.sort_criterion)
          },
          decendingSort: function(){
            this.$emit('decendingSort',this.sort_criterion)
          },
          openCategoryList: function(){
            this.$emit('openCategoryList')

          }
        }
    }
>>>>>>> origin/master
</script>