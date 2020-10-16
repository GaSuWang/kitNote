<template>
  <div class="note-grid">
    <div class="category-list"
        v-for="(category, index) in categories"
        :key="`note-${index}`"
    >
     <div>{{category}}</div>
    </div>
    <input
        class="title-input"
        type="text"
        v-model="new_category"
        placeholder="Category"
    />
   
    <button @click.prevent="categoryAdd">추가</button>
      
   
  </div>
</template>

<script>
export default {
  props: ["categorylist"],
  data: function () {
    return {
        categories:[],
        new_category:""
    };
  },
    mounted() {
        this.categories=this.categorylist.slice()
    
    },

  methods: {
      categoryAdd(){
          this.categories.push(this.new_category)
          this.$emit('categoryAdd',this.new_category)
      }
  },
};
</script>
