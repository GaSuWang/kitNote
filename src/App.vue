<template>
  <div id="app">
    <app-header
      @openEditor="clickAddBtn"
      @ascendingSort="ascendingSort"
      @decendingSort="decendingSort"
      @openCategoryList="clickCategoryList"
      @openSidebar="clickSidebar"
    ></app-header>
    <app-sidebar
      v-if="sidebarOpen"
      @openSettingCategory="openSettingCategory"
      @openSortPolicy="openSortPolicy"
    ></app-sidebar>
    <div class="contents">
      <div class="noteContainer">
        <div
          v-for="(note, index) in notes"
          :key="`note-${index}`"
          class="note"
          :class="{
            animation: (note.eventFlag1 || note.eventFlag2) && animationFlag,
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
              <span>{{ note.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-calendar :events="notes"></app-calendar>
    <div class="dim" v-if="sidebarOpen">
      <div class="sortMenu" v-if="sideFlag[0]">
        <select v-model="sort_criterion">
          <option>등록일순</option>
          <option>마감일순</option>
          <option>제목순</option>
        </select>
        <button @click.prevent="ascendingSort">
          <i class="fas fa-sort-up"></i>
        </button>
        <button @click.prevent="decendingSort">
          <i class="fas fa-sort-down"></i>
        </button>
      </div>
    </div>
    <app-note-editor
      v-if="editorOpen"
      @noteAdded="newNote"
      @noteDeleted="deleteNote"
      @noteModified="modifiedNote"
      :beforeEditNote="tempNote"
      :modifyMode="modify"
      :index="tempIdx"
      :eventFlag="eventFlag_noteEditor"
      :categorylist="categories"
    ></app-note-editor>
    <app-category-list
      v-if="categoryOpen"
      @categoryAdd="categoryAdd"
      @categoryDelete="categoryDelete"
      :categorylist="categories"
    ></app-category-list>
  </div>
</template>

<script>
import NoteEditor from "./components/NoteEditor.vue";
import Header from "./components/Header.vue";
import Calendar from "./components/Calendar.vue";
import CategoryList from "./components/CategoryList.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  data: function () {
    return {
      editorOpen: false,
      notes: [],
      tempNote: {},
      modify: false,
      tempIdx: null,
      categoryOpen: false,
      categories: ["기타"],
      aniTime: 600,
      eventFlag_noteEditor: [false, false],
      animationFlag: false,
      sidebarOpen: false,
      sideFlag: [false, false],
    };
  },
  computed: {},
  methods: {
    /* Note Manage */
    newNote(title, text, theme, regist_date, deadline, category) {
      if (this.animationFlag) {
        return;
      }
      this.editorOpen = false;
      this.notes.push({
        title: title,
        text: text,
        theme: theme,
        regist_date: regist_date,
        deadline: deadline,
        category: category,
        eventFlag1: false, // create
        eventFlag2: false, // delete
      });

      var idx = this.notes.length - 1;
      this.notes[idx].eventFlag1 = true;
      this.$nextTick(() => {
        this.animationFlag = true;
        setTimeout(() => {
          this.notes[idx].eventFlag1 = false;
          this.animationFlag = false;
        }, this.aniTime);
      });
    },

    deleteNote(index) {
      if (this.animationFlag) {
        return;
      }

      this.editorOpen = false;
      this.notes[index].eventFlag2 = true;
      this.$nextTick(() => {
        this.animationFlag = true;
        setTimeout(() => {
          this.notes[index].eventFlag2 = false;
          this.notes.splice(index, 1);
          this.animationFlag = false;
        }, this.aniTime);
      });
    },
    /* Note Manage End */

    /* UI */
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

    openSettingCategory() {
      for (var i = 0; i < this.sideFlag.length; i++) this.sideFlag[i] = false;
      this.sideFlag[0] = true;
    },

    openSortPolicy() {
      for (var i = 0; i < this.sideFlag.length; i++) this.sideFlag[i] = false;
      this.sideFlag[1] = true;
    },
    /* UI End */

    modifiedNote({ title, text, theme, regist_date, deadline, category }) {
      this.notes.splice(this.tempIdx, 1, {
        title: title,
        text: text,
        theme: theme,
        regist_date: regist_date,
        deadline: deadline,
        category: category,
        eventFlag1: false,
        eventFlag2: false,
      });

      this.editorOpen = false;
      this.tempNote = {};
      this.modify = false;
      this.tempIdx = null;
    },

    /* Sort Policy */
    ascendingSort(sort_criterion) {
      if (sort_criterion == "등록일순") {
        this.notes.sort(function (a, b) {
          return a.regist_date < b.regist_date
            ? -1
            : a.regist_date > b.regist_date
            ? 1
            : 0;
        });
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
    /* Sort Policy End */

    clickCategoryList() {
      this.categoryOpen = !this.categoryOpen;
    },

    categoryAdd(new_category) {
      this.categories.push(new_category);
    },

    categoryDelete(index) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].category == this.categories[index])
          this.notes[i].category = this.categories[0];
      }
      this.categories.splice(index, 1);
    },

    clickSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
  },

  mounted() {
    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes"));
    if (localStorage.getItem("categories")) {
      var temp = JSON.parse(localStorage.getItem("categories"));

      this.categories.splice(1, ...temp);
    }
  },
  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
      },
      deep: true,
    },

    categories: {
      handler() {
        var newCategory = this.categories;
        localStorage.setItem("categories", JSON.stringify(newCategory));
      },
      deep: true,
    },

    editorOpen: {
      handler() {
        if (this.eventFlag_noteEditor[0] || this.eventFlag_noteEditor[1])
          return;

        if (this.editorOpen) {
          this.eventFlag_noteEditor[0] = true;
          setTimeout(() => {
            this.eventFlag_noteEditor[0] = false;
          }, this.aniTime);
        } else {
          this.eventFlag_noteEditor[1] = true;
          setTimeout(() => {
            this.eventFlag_noteEditor[1] = false;
          }, this.aniTime);
        }
      },
    },
  },
  components: {
    appNoteEditor: NoteEditor,
    appHeader: Header,
    appCalendar: Calendar,
    appCategoryList: CategoryList,
    appSidebar: Sidebar,
  },
};
</script>

<style lang="scss">
@import "./styles/global.scss";
</style>
