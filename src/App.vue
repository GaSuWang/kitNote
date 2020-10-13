<template>
  <div id="app">
    <app-header
      @openEditor="clickAddBtn"
      @ascendingSort="ascendingSort"
      @decendingSort="decendingSort"
    ></app-header>

    <div class="noteContainer">
      <div
        v-for="(note, index) in notes"
        :key="`note-${index}`"
        class="note"
        :class="{
          animation: note.eventFlag1 || note.eventFlag2,
          'create-ani': note.eventFlag1,
          'delete-ani': note.eventFlag2,
        }"
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
    <app-note-editor
      v-if="editorOpen"
      @noteAdded="newNote"
      @noteDeleted="deleteNote"
      @noteModified="modifiedNote"
      :beforeEditNote="tempNote"
      :modifyMode="modify"
      :index="tempIdx"
      style="c"
    ></app-note-editor>
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
      aniTime: 500,
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
        eventFlag1: false, // create
        eventFlag2: false, // delete
      });
      this.editorOpen = false;
      setTimeout(() => {
        var idx = this.notes.length - 1;
        this.notes[idx].eventFlag1 = true;
        setTimeout(() => {
          console.log("123");
          this.notes[idx].eventFlag1 = false;
        }, this.aniTime);
      }, 800);
    },
    deleteNote(index) {
      if (this.notes[index].eventFlag2) {
        return;
      }

      this.editorOpen = false;
      this.notes[index].eventFlag2 = true;
      setTimeout(() => {
        this.notes.splice(index, 1);
        this.notes[index].eventFlag2 = false;
      }, this.aniTime);
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

    modifiedNote({ title, text, theme, regist_date, deadline }) {
      this.notes.splice(this.tempIdx, 1, {
        title: title,
        text: text,
        theme: theme,
        regist_date: regist_date,
        deadline: deadline,
        eventFlag1: false,
        eventFlag2: false,
      });

      this.editorOpen = false;
      this.tempNote = {};
      this.modify = false;
      this.tempIdx = null;
    },

    ascendingSort(sort_criterion) {
      console.log(sort_criterion);
      if (sort_criterion == "등록일순") {
        this.notes.sort(function (a, b) {
          return a.regist_date < b.regist_date
            ? -1
            : a.regist_date > b.regist_date
            ? 1
            : 0;
        });
        console.log("ddd");
      } else if (sort_criterion == "마감일순") {
        this.notes.sort(function (a, b) {
          return a.deadline < b.deadline ? -1 : a.deadline > b.deadline ? 1 : 0;
        });
      } else if (sort_criterion == "제목순") {
        this.notes.sort(function (a, b) {
          return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        });
      }
    },
    decendingSort(sort_criterion) {
      if (sort_criterion == "등록일순") {
        this.notes.sort(function (a, b) {
          return a.regist_date > b.regist_date
            ? -1
            : a.regist_date < b.regist_date
            ? 1
            : 0;
        });
      } else if (sort_criterion == "마감일순") {
        this.notes.sort(function (a, b) {
          return a.deadline > b.deadline ? -1 : a.deadline < b.deadline ? 1 : 0;
        });
      } else if (sort_criterion == "제목순") {
        this.notes.sort(function (a, b) {
          return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
        });
      }
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
