<template>
  <div class="category-grid">
    <div class="category-list">
      <div
        v-for="(list, index) in checklists"
        :key="`checklist-${index}`"
        class="list"
      >
        <div>
          {{ list }}
          <span @click="listDelete(index)"
            ><i class="fas fa-times"></i
          ></span>
        </div>
      </div>
    </div>

    <input
      class="list-input"
      type="text"
      v-model="new_check"
      placeholder="체크리스트를 입력하세요"
    />
    <button @click.prevent="listAdd">추가</button>
  </div>
</template>

<script>
export default {

  data: function () {
    return {
      checklists: [],
      new_check: "",
    };
  },

  methods: {
    listAdd() {
      this.checklists.push(this.new_check);
      this.new_category = "";
    },
    listDelete(index) {
      this.checklists.splice(index, 1);
    },
  },
    mounted() {
    if (localStorage.getItem("checklist"))
      this.checklists = JSON.parse(localStorage.getItem("checklist"));
  },
   watch: {
    checklists: {
      handler() {
        var newChecklist= this.checklists;
        localStorage.setItem("checklist", JSON.stringify(newChecklist));
      },
      deep: true,
    },
   }
};
</script>
