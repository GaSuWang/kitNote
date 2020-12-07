<template>
  <div class="header">
    <div class="left">
      <span @click.prevent="openSidebar">
        <i class="fas fa-bars"></i>
      </span>
      <img class="icon" src="../assets/logo.png" />
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
    </div>
    <div v-if="isLogin" class="right" @click.prevent="logOutPopup">
      <img :src="userImg" class="userImg" />
      <span>{{ username }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categorylist", "Login", "userProfile"],
  data: function () {
    return {
      sort_criterion: "등록일순",
      selectedCategory: "전체",
      categories: [],
      isLogin: true,
      username: "UserName",
      userImg: "",
    };
  },
  mounted() {
    this.categories = this.categorylist.slice();
    this.isLogin = this.Login;

    if (this.isLogin == true) {
      this.username = this.userProfile[0];
      this.userImg = this.userProfile[1];
    }
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
    logOutPopup: function () {
      this.$emit("clickedProfile");
    },
  },
  watch: {
    categorylist: {
      handler() {
        this.categories = [];
        this.categories = this.categorylist.slice();
      },
    },
    Login: {
      handler() {
        this.isLogin = this.Login;
      },
    },
    userProfile: {
      handler() {
        this.username = this.userProfile[0];
        this.userImg = this.userProfile[1];
        console("header handler");
        console.log(this.username);
        console.log(this.userImg);
      },
      deep: true,
    },
  },
};
</script>