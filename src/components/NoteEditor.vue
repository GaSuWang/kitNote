

<template>
  <div class="note-grid">
    <div class="note-editor">
      <input
        class="title-input"
        type="text"
        v-model="title"
        placeholder="Title"
      />
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
          :picker-date.sync="beforeEditNote.deadline"
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
  props: ["beforeEditNote", "modifyMode", "index"],
  data: function () {
    return {
      title: "",
      theme: "",
      text: "",
      regist_date: new Date().toLocaleDateString(),
      deadline: "",
    };
  },
  mounted() {
    if (this.beforeEditNote) {
      this.title = this.beforeEditNote.title;
      this.theme = this.beforeEditNote.theme;
      this.text = this.beforeEditNote.text;
      this.regist_date = this.beforeEditNote.regist_date;
      this.deadline = this.beforeEditNote.deadline.split("T")[0];
      console.log(this.deadline);
    }
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
        if (this.modifyMode) this.modifyNote();
        else {
          this.$emit(
            "noteAdded",
            this.title,
            this.text,
            this.theme,
            this.regist_date,
            this.deadline
          );
        }
        this.title = "";
        this.text = "";
        this.theme = "";
        this.regist_date = new Date().toLocaleDateString();
        this.deadline = "";
      }
    },
    deleteNote(index) {
      this.$emit("noteDeleted", index);
    },
    modifyNote() {
      this.$emit(
        "noteModified",
        this.tempIdx,
        this.title,
        this.text,
        this.theme,
        this.regist_date,
        this.deadline
      );
      this.modifyMode = false;

      this.title = "";
      this.text = "";
      this.theme = "";
      this.regist_date = new Date().toLocaleDateString();
      this.deadline = "";
    },
  },
};
</script>
