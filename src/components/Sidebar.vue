<template>
  <div class="sidebar">
    <div class="menu" @click.prevent="openSettingCategory">
      <i class="fas fa-bars"></i>
      <a> Category Setting</a>
    </div>

    <div class="menu" @click.prevent="openSortPolicy">
      <i class="fas fa-sort-amount-up"></i>
      <a> Sort Policy</a>
    </div>

    <div class="menu" @click.prevent="openCheckList">
      <a> CheckList</a>
    </div>

  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {
    openSettingCategory: function () {
      this.$emit("openSettingCategory");
    },
    openSortPolicy: function () {
      this.$emit("openSortPolicy");
    },
    openCheckList: function(){
      this.$emit("openCheckList")
    }
  },
};
</script>
