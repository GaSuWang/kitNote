<template>
  <div id="app">
    <app-header
      @openEditor="clickAddBtn"
      @selectCategory="categoryFiltering"
      :categorylist="categories"
      @openSidebar="clickSidebar"
    ></app-header>
    <app-sidebar
      v-if="sidebarOpen"
      @openSettingCategory="openSettingCategory"
      @openSortPolicy="openSortPolicy"
      @openCheckList="openCheckList"
    ></app-sidebar>
    <div class="noteContainer">
      <div
        v-for="(note, index) in notes"
        :key="`note-${index}`"
        :style="{ 'background-color': note.theme }"
      >
        <div
          class="note"
          v-if="note.isView"
          :class="{
            animation: (note.eventFlag1 || note.eventFlag2) && animationFlag,
            'create-ani': note.eventFlag1,
            'delete-ani': note.eventFlag2,
          }"
        >
          <div>
            <span class="modify" @click.prevent="toggleNote(index)"
              ><i class="far fa-edit"></i
            ></span>
            <span class="delete" @click.prevent="deleteNote(index)"
              ><i class="fas fa-times"></i
            ></span>
            <span
              class="unfixed"
              @click.prevent="fixNote(index)"
              v-if="!note.isFix"
              ><i class="fas fa-thumbtack"></i
            ></span>
            <span
              class="fixed"
              @click.prevent="fixNote(index)"
              v-if="note.isFix"
              ><i class="fas fa-thumbtack"></i
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
      <app-calendar :events="notes"></app-calendar>
      <app-todolist :todos="todos"></app-todolist>
      <div class="view-button">
        <div @click.prevent="viewCalender">
          <i class="fas fa-calendar-week" />
        </div>
        <div @click.prevent="viewChecklist"><i class="fas fa-tasks" /></div>
      </div>
      <div class="dim" v-if="sidebarOpen">
        <div class="dim-layer">
          <div class="categoryPolicy" v-if="sideFlag[0]">
            <h1>카테고리 설정</h1>
            <app-category-list
              @categoryAdd="categoryAdd"
              @categoryDelete="categoryDelete"
              :categorylist="categories"
            ></app-category-list>
          </div>

          <div class="sortMenu" v-if="sideFlag[1]">
            <h1>정렬 정책 설정</h1>
            <div class="buttonContainer">
              <div class="sortButton" @click.prevent="decendingSort(1)">
                등록일 빠른순
              </div>
              <div class="sortButton" @click.prevent="ascendingSort(1)">
                등록일 느린순
              </div>
            </div>
            <div class="buttonContainer">
              <div class="sortButton" @click.prevent="decendingSort(2)">
                마감일 빠른순
              </div>
              <div class="sortButton" @click.prevent="ascendingSort(2)">
                마감일 느린순
              </div>
            </div>

            <div class="buttonContainer">
              <div class="sortButton" @click.prevent="ascendingSort(3)">
                제목 오름차순
              </div>
              <div class="sortButton" @click.prevent="decendingSort(3)">
                제목 내림차순
              </div>
            </div>
          </div>
          <div class="checklistMenu" v-if="sideFlag[2]">
            <h1>체크리스트</h1>
            <app-check-list> </app-check-list>
          </div>
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
    </div>
  </div>
</template>

<script>
import NoteEditor from "./components/NoteEditor.vue";
import Header from "./components/Header.vue";
import Calendar from "./components/Calendar.vue";
import CategoryList from "./components/CategoryList.vue";
import Sidebar from "./components/Sidebar.vue";
import CheckList from "./components/CheckList.vue";
import Todolist from "./components/Todolist.vue";

export default {
  name: "App",
  data: function () {
    return {
      editorOpen: false,
      notes: [],
      tempNote: {},
      modify: false,
      tempIdx: null,
      categories: ["기타"],
      aniTime: 600,
      eventFlag_noteEditor: [false, false],
      animationFlag: false,
      selectedCategory: "전체",
      sidebarOpen: false,
      sideFlag: [false, false, false],
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
        isView: true,
        isFix: false,
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
      this.sideFlag[1] = false;
      this.sideFlag[2] = false;
      this.sideFlag.splice(0, 1);
      this.sideFlag.unshift(true);
    },

    openSortPolicy() {
      this.sideFlag[0] = false;
      this.sideFlag[2] = false;
      this.sideFlag.splice(1, 1, true);
    },

    openCheckList() {
      this.sideFlag[0] = false;
      this.sideFlag[1] = false;
      this.sideFlag.splice(2, 1);
      this.sideFlag.push(true);
    },

    clickSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
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
        isView: true,
        isFix: false,
      });

      this.editorOpen = false;
      this.tempNote = {};
      this.modify = false;
      this.tempIdx = null;
    },

    /* Sort Policy */
    ascendingSort(sort_criterion) {
      if (sort_criterion == 1) {
        this.notes.sort(function (a, b) {
          return a.regist_date < b.regist_date
            ? -1
            : a.regist_date > b.regist_date
            ? 1
            : 0;
        });
      } else if (sort_criterion == 2) {
        this.notes.sort(function (a, b) {
          return a.deadline < b.deadline ? -1 : a.deadline > b.deadline ? 1 : 0;
        });
      } else if (sort_criterion == 3) {
        this.notes.sort(function (a, b) {
          return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        });
      }

      var temp = [];
      for (var i = 0; i < this.notes.length; i++) {
        if (this.notes[i].isFix) {
          temp.push(...this.notes.splice(i, 1));
          i--;
        }
      }
      this.notes.unshift(...temp);
    },

    decendingSort(sort_criterion) {
      if (sort_criterion == 1) {
        this.notes.sort(function (a, b) {
          return a.regist_date > b.regist_date
            ? -1
            : a.regist_date < b.regist_date
            ? 1
            : 0;
        });
      } else if (sort_criterion == 2) {
        this.notes.sort(function (a, b) {
          return a.deadline > b.deadline ? -1 : a.deadline < b.deadline ? 1 : 0;
        });
      } else if (sort_criterion == 3) {
        this.notes.sort(function (a, b) {
          return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
        });
      }
      var temp = [];
      for (var i = 0; i < this.notes.length; i++) {
        if (this.notes[i].isFix) {
          temp.push(...this.notes.splice(i, 1));
          i--;
        }
      }
      this.notes.unshift(...temp);
    },
    /* Sort Policy End */

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
    categoryFiltering(selectedCategory) {
      if (selectedCategory == "전체") {
        for (var i = 0; i < this.notes.length; i++) {
          this.notes[i].isView = true;
        }
      } else {
        for (var j = 0; j < this.notes.length; j++) {
          if (this.notes[j].category == selectedCategory) {
            this.notes[j].isView = true;
          } else {
            this.notes[j].isView = false;
          }
        }
      }
    },
    fixNote(index) {
      this.notes[index].isFix = !this.notes[index].isFix;
      if (this.notes[index].isFix) {
        var temp = this.notes[index];
        this.notes.splice(index, 1);
        this.notes.unshift(temp);
      }
    },
  },

  created() {
    if (localStorage.getItem("categories")) {
      var temp = JSON.parse(localStorage.getItem("categories"));
      this.categories.splice(1, ...temp);
    }
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

    categories: {
      handler() {
        var newCategory = this.categories;
        localStorage.setItem("categories", JSON.stringify(newCategory));
      },
      deep: true,
    },

    isFix: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
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
    appCheckList: CheckList,
    appTodolist: Todolist,
  },
};
</script>

<style lang="scss">
@import "./styles/global.scss";
</style>
