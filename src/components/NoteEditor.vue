<template>
  <div
    class="note-grid"
    :class="{
      animation: eventFlag[0] || eventFlag[1],
      'open-ani': eventFlag[0],
      'close-ani': eventFlag[1],
    }"
  >
    <div class="note-editor">
      <input
        class="title-input"
        type="text"
        v-model="title"
        placeholder="Title"
      />
      <select v-model="selected_category">
<<<<<<< HEAD
        <option v-for="(category, index) in categories" :key="`note-${index}`">
          {{ category }}
        </option>
=======
        <option  v-for="(category, index) in categories"
        :key="`note-${index}`">{{category}}</option>
>>>>>>> origin/master
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
<<<<<<< HEAD
  props: ["beforeEditNote", "modifyMode", "index", "categorylist", "eventFlag"],
=======
  props: ["beforeEditNote", "modifyMode", "index","categorylist"],
>>>>>>> origin/master
  data: function () {
    return {
      title: "",
      theme: "",
      text: "",
      regist_date: new Date().toLocaleDateString(),
      deadline: "",
<<<<<<< HEAD
      selected_category: "",
      categories: [],
=======
      selected_category:"",
      categories:[],
>>>>>>> origin/master
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
<<<<<<< HEAD
    this.categories = this.categorylist.slice();
    this.selected_category = this.categories[0];

=======
    this.categories=this.categorylist.slice();
    this.selected_category=this.categories[0]
>>>>>>> origin/master
    if (this.modifyMode) {
      this.title = this.beforeEditNote.title;
      this.theme = this.beforeEditNote.theme;
      this.text = this.beforeEditNote.text;
      this.regist_date = this.beforeEditNote.regist_date;
      this.deadline = new Date(this.beforeEditNote.deadline);
      this.temp = new Date(this.deadline);
<<<<<<< HEAD
      this.selected_category = this.beforeEditNote.category;
=======
      this.selected_category=this.beforeEditNote.category
>>>>>>> origin/master
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
<<<<<<< HEAD
        category: this.selected_category,
=======
        category: this.selected_category
>>>>>>> origin/master
      });
    },
    initData() {
      this.title = "";
      this.text = "";
      this.theme = "";
      this.regist_date = new Date().toLocaleDateString();
      this.deadline = "";
<<<<<<< HEAD
      this.category = "기타";
=======
      this.category="기타"
>>>>>>> origin/master
    },
  },
};
</script>
