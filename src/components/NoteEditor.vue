<template>
  <div class="note-grid">
    <div class="note-editor">
      <input
        class="title-input"
        type="text"
        v-model="title"
        placeholder="Title"
      />
      <select v-model="selected_category">
        <option  v-for="(category, index) in categories"
        :key="`note-${index}`">{{category}}</option>
      </select>
      <textarea
        rows="10"
        v-model="text"
        placeholder="Take a note..."
      ></textarea>
      <div class="note-editor-date">
        <span>등록일 </span>
        <div class="note-editor-registdate">{{ regist_date }}</div>
        <span>마감일 </span>
        <v-date-picker
          :picker-date.sync="temp"
          :available-dates="{ start: new Date(), end: null }"
          v-model="deadline"
        />
      </div>

      <div class="note-editor-bottom">
        <button @click="createNew" class="fas fas-check-circle">
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["beforeEditNote", "modifyMode", "index","categorylist"],
  data: function () {
    return {
      title: "",
      theme: "",
      text: "",
      regist_date: new Date().toLocaleDateString(),
      deadline: "",
      selected_category:"",
      categories:[],
      temp: new Date(),
    };
  },
  watch: {
    modifyMode(newValue) {
      if (!newValue) {
        this.initData();
      }
    },
  },
  mounted() {
    this.categories=this.categorylist.slice();
    this.selected_category=this.categories[0]
    if (this.modifyMode) {
      this.title = this.beforeEditNote.title;
      this.theme = this.beforeEditNote.theme;
      this.text = this.beforeEditNote.text;
      this.regist_date = this.beforeEditNote.regist_date;
      this.deadline = new Date(this.beforeEditNote.deadline);
      this.temp = new Date(this.deadline);
      this.selected_category=this.beforeEditNote.category
    }
  },
  beforeDestroy() {
    this.initData();
  },
  methods: {
    createNew() {
      if (!this.title) {
        alert("이런! 노트 제목적는걸 잊었네요");
      } else if (!this.text) {
        alert("뭘 적으려고 했는지 잊은거 같아요!!");
      } else if (!this.deadline) {
        alert("어서 마감일을 지정해주세요");
      } else {
        if (this.modifyMode) {
          this.modifyNote();
        } else {
          this.$emit(
            "noteAdded",
            this.title,
            this.text,
            this.theme,
            this.regist_date,
            this.deadline.toLocaleDateString(),
            this.selected_category
          );
        }
        this.initData();
      }
    },
    deleteNote(index) {
      this.$emit("noteDeleted", index);
    },
    modifyNote() {
      this.$emit("noteModified", {
        title: this.title,
        text: this.text,
        theme: this.theme,
        regist_date: this.regist_date,
        deadline: this.deadline,
        category: this.selected_category
      });
    },
    initData() {
      this.title = "";
      this.text = "";
      this.theme = "";
      this.regist_date = new Date().toLocaleDateString();
      this.deadline = "";
      this.category="기타"
    },
  },
};
</script>
