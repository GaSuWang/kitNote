<template>
  <div class="category-grid">
    <div class="category-list">
      <div
        v-for="(list, index) in checklists"
        :key="`checklist-${index}`"
        class="list"
      >
        <div>
          <span v-if="list.isComplete == true"
            ><i class="fas fa-check"></i
          ></span>
          <span >
            {{ list.title }}</span
          >
          <span @click="listDelete(index)"><i class="fas fa-times"></i></span>
        </div>
      </div>
    </div>

    <input
      class="list-input"
      type="text"
      v-model="newCheck"
      placeholder="체크리스트를 입력하세요"
    />
    <button @click.prevent="listAdd()">추가</button>
  </div>
</template>

<script>
export default {
  props:['todolist'],
  data: function () {
    return {
      checklists: [],
      newCheck: "",
    };
  },

  methods: {
    listAdd() {
      this.$emit("checklistAdd",{
        checklist: this.newCheck,
        isComplete: false,
      })
      this.checklists.push({
        title: this.newCheck,
        isComplete: false,
      })
      this.newCheck=""
   
    },

    listDelete(index) {
      this.checklists.splice(index,1)
      this.$emit("checklistDelete",index)
    },
  },
  mounted() {  
      for(var i =0; i<this.todolist.length;i++){
        this.checklists.push(this.todolist[i])
      }
  },

};
</script>
