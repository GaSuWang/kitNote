<template>
  <div id="app">
    <app-header @openEditor="clickAddBtn"></app-header>
    <app-note-editor
      v-if="editorOpen"
      @noteAdded="newNote"
      @noteDeleted="deleteNote"
      @noteModified="modifiedNote"
      :beforeEditNote="tempNote"
      :modifyMode="modify"
      :index="tempIdx"
    ></app-note-editor>
    <div class="noteContainer">
      <div
        v-for="(note, index) in notes"
        :key="`note-${index}`"
        class="note"
        :style="{ 'background-color': note.theme }"
      >
        <div>
          <span class="modify" @click.prevent="toggleNote(index)"
            ><i class="far fa-edit"></i
          ></span>
          <span class="delete" @click.prevent="deleteNote(index)"
            ><i class="fas fa-times"></i
          ></span>
          <span>{{ note.title }}</span>
          <p class="note-text">{{ note.text }}</p>
          <div class="note-date">
            <span>{{ note.regist_date | moment("YYYY-MM-DD") }} 등록</span>
            <span>{{ note.deadline | moment("YYYY-MM-DD") }} 까지</span>
          </div>
        </div>
      </div>
    </div>
    <app-calendar :events="notes"></app-calendar>
  </div>
</template>

<script>
import NoteEditor from "./components/NoteEditor.vue";
import Header from "./components/Header.vue";
import Calendar from "./components/Calendar.vue";

export default {
  name: "App",
  data: function () {
    return {
      editorOpen: false,
      notes: [],
      tempNote: {},
      modify: false,
      tempIdx: null,
    };
  },
  computed: {},
  methods: {
    newNote(title, text, theme, regist_date, deadline) {
      this.notes.push({
        title: title,
        text: text,
        theme: theme,
        regist_date: regist_date,
        deadline: deadline,
      });
      this.editorOpen = false;
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
      this.editorOpen = false;
    },
    clickAddBtn() {
      this.editorOpen = !this.editorOpen;
      this.modify = false;
      this.tempIdx = null;
      this.tempNote = {};
    },
    toggleNote(index) {
      this.tempIdx = index;
      this.tempNote = this.notes[index];
      this.modify = true;
      this.editorOpen = !this.editorOpen;
    },
    modifiedNote({ index, title, text, theme, regist_date, deadline }) {
      this.notes.splice(index, 1, {
        title: title,
        text: text,
        theme: theme,
        regist_date: regist_date,
        deadline: deadline,
      });

      this.editorOpen = false;
      this.tempNote = {};
      this.modify = false;
      this.tempIdx = null;
    },
  },
  mounted() {
    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes"));
  },
  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
      },
      deep: true,
    },
  },
  components: {
    appNoteEditor: NoteEditor,
    appHeader: Header,
    appCalendar: Calendar,
  },
};
</script>

<style lang="scss">
@import "./styles/global.scss";
</style>
