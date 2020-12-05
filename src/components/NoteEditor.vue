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

      <div class="position">
        <div>
          <span>장소</span>
          <span id="span_position">{{ positioning }}</span>
          <div id="mapButton" @click.prevent="toggleMap">{{ mapButton }}</div>
        </div>

        <span id="span_category">카테고리</span>
        <select v-model="selected_category">
          <option
            v-for="(category, index) in categories"
            :key="`note-${index}`"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <app-kakao-map
        v-if="is_mapOpen"
        @getPosition="registPosition"
      ></app-kakao-map>

      <div class="note_content">
        <textarea
          rows="10"
          v-model="text"
          placeholder="Take a note..."
        ></textarea>
        <div class="image_upload">
          <div class="image_button">
            <label for="img_file">이미지 넣기</label>
            <input type="file" id="img_file" @change="loadImg" accept="image/*" />
            <div @click.prevent="removeBack">배경제거</div>
            <div @click.prevent="composeBack">배경추가</div>
          </div>
          
          <div v-if="imgLoad" class="editor_img">
            <img :src="imgSrc" id="image" />

            <span @click.prevent="deleteImg"><i class="fas fa-times"></i></span>
          </div>
        </div>
      </div>

      <span>태그</span>
      <div class="input_tag">
        <input placeholder="#tag1 #tag2 #tag3..." v-model="tagString" />
        <button @click.prevent="tagSplit">태그추가</button>
      </div>

      <div class="tags">
        <div class="tag" v-for="(tag, index) in tags" :key="`tag-${index}`">
          {{ tag }}
          <span class="delete" @click.prevent="deleteTag(index)">
            <i class="fas fa-times"></i>
          </span>
        </div>
      </div>
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
import KakaoMap from "./kakao-map.vue";
import ObjectDetection from "../vision_modules/ObjectDetection.js";

export default {
  props: ["beforeEditNote", "modifyMode", "index", "categorylist", "eventFlag"],
  data: function () {
    return {
      title: "",
      theme: "",
      text: "",
      regist_date: new Date().toLocaleDateString(),
      deadline: "",
      selected_category: "",
      categories: [],
      tags: [],
      temp_tags: [],
      temp: new Date(),
      checked: false,
      positioning: null,
      is_mapOpen: false,
      mapButton: "지도열기",
      tagString: "",
      imgSrc: "",
      imgLoad: false,
      ObjDetect: null,
    };
  },
  watch: {
    modifyMode(newValue) {
      if (!newValue) {
        this.initData();
      }
    },
  },
  async created() {
    this.ObjDetect = await new ObjectDetection();
  },

  async mounted() {
    this.categories = this.categorylist.slice();
    this.selected_category = this.categories[0];

    if (this.modifyMode) {
      this.title = this.beforeEditNote.title;
      this.theme = this.beforeEditNote.theme;
      this.text = this.beforeEditNote.text;
      this.regist_date = this.beforeEditNote.regist_date;
      this.deadline = new Date(this.beforeEditNote.deadline);
      this.temp = new Date(this.deadline);
      this.selected_category = this.beforeEditNote.category;
      this.isView = this.beforeEditNote.isView;
      this.isFix = this.beforeEditNote.isFix;
      this.tags = this.beforeEditNote.tags;
      this.positioning = this.beforeEditNote.positioning;
      this.imgSrc = this.beforeEditNote.imgSrc;
      this.imgLoad = true;
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
            this.selected_category,
            this.tags,
            this.positioning,
            this.imgSrc
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
        category: this.selected_category,
        isView: this.isView,
        isFix: this.isFix,
        tags: this.tags,
        positioning: this.positioning,
        imgSrc: this.imgSrc,
      });
    },
    initData() {
      this.title = "";
      this.text = "";
      this.theme = "";
      this.regist_date = new Date().toLocaleDateString();
      this.deadline = "";
      this.category = "기타";
      this.addChecklist = false;
      this.tags = [];
      this.temp_tags = [];
      this.imgSrc = "";
    },

    registPosition(position) {
      this.positioning = position;
    },
    toggleMap() {
      this.is_mapOpen = !this.is_mapOpen;
      if (this.is_mapOpen) {
        this.mapButton = "지도접기";
      } else {
        this.mapButton = "지도열기";
      }
    },

    async loadTagFromNN() {
      const img = await document.getElementById("image");
      this.temp_tags = await this.ObjDetect.predict(img);
      this.acceptTagFromNN();
    },

    acceptTagFromNN() {
      for (var i = 0; i < this.temp_tags.length; i++) {
        this.tags.push(this.temp_tags[i]);
      }

      this.temp_tags = [];
    },

    denyTagFromNN() {
      this.temp_tags = [];
    },

    deleteTag(index) {
      this.tags.splice(index, 1);
    },

    tagSplit() {
      this.temp_tags = this.tagString.split("#");
      this.temp_tags.splice(0, 1);
      this.tags.push(...this.temp_tags);
      this.temp_tags = [];
      this.tagString = "";
      for (var i = 0; i < this.tags.length; i++) {
        this.tags[i] = this.tags[i].trim();
      }
    },

    loadImg(event) {
      this.imgLoad = true;
      var selectImg = event.target.files || event.dataTransfer.files;
      this.createImg(selectImg[0]);
    },

    async createImg(file) {
      var reader = new FileReader();
      reader.onload = async (e) => {
        this.imgSrc = e.target.result;
        await this.loadTagFromNN();
      };

      reader.readAsDataURL(file);
    },

    deleteImg() {
      this.imgSrc = "";
      this.imgLoad = false;
    },
  },

  components: {
    AppKakaoMap: KakaoMap,
  },
};
</script>
