<template>
  <div class="editor-grid">

    <div class="button-box">
      <span v-if="flag0">
        <label for="img_file">배경선택</label>
        <input
          type="file"
          id="img_file"
          @change="addBackground"
          accept="image/*"
        />
      </span>
      <button
        class="imageEditorButton"
        v-if="flag1"
        @click.prevent="backgroundMasking()"
      >
        배경제거
      </button>
      <button
        class="imageEditorButton"
        v-if="flag2"
        @click.prevent="complete()"
      >
        완료
      </button>
    </div>

    <div class="editImg">
      <div>
      <label>편집 이미지</label>
      <canvas id="canvas" width="400px" height="400px"
        >This browser doesn't support canvas</canvas
      >
      <img
        id="image_hidden"
        :src="imgSrc"
        width="400px"
        height="400px"
        style="display: none"
      />
      </div>
    
    <div>
      <label>배경 이미지</label>
      <canvas id="background" width="400px" height="400px"
        >This browser doesn't support canvas</canvas
      >
      <img
        id="background_hidden"
        width="400px"
        height="400px"
        style="display: none"
      />
    </div>
    </div>
  </div>
</template>

<script>
import PersonSegmentation from "../vision_modules/PersonSegmentation.js";

export default {
  props: ["ImageSrc"],
  data: function () {
    return {
      originalImg:this.ImageSrc,
      imgSrc: this.ImageSrc,
      model: null,
      flag0: true,
      flag1: false,
      flag2: false,
      backImg: null,
      removedBack:null,
      composedImg:null,
    };
  },
  async mounted() {
    const image = document.getElementById("image_hidden");

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0, 400, 400);
  },

  async created() {
    this.model = await new PersonSegmentation();
    console.log("mat load");
  },

  methods: {
    async backgroundMasking() {
      const canvasElement = document.getElementById("canvas");
      const backgroundElement = document.getElementById("background");

      await this.model.predict(canvasElement, backgroundElement);

      this.flag1 = false;
      this.flag2 = true;
    },

    addBackground(event) {
      var reader = new FileReader();

      var selectImg = event.target.files || event.dataTransfer.files;
      var file = selectImg[0];

      reader.onload = async (e) => {
        this.onLoadEvent(e);
      };

      reader.readAsDataURL(file);
    },

    onLoadEvent(e) {
      const image = document.getElementById("background_hidden");
      image.src = e.target.result;
      this.$nextTick(() => {
        const canvas = document.getElementById("background");
        const ctx = canvas.getContext("2d");
        console.log("load Event");

        ctx.drawImage(image, 0, 0, 400, 400);
        this.flag0 = false;
        this.flag1 = true;
      });
    },

    complete() {
      const imageURL = document.getElementById("canvas").toDataURL("image/png");
      this.$emit("complete", imageURL);
    },

     changeMainImg(e){
      this.imgSrc=e.target.src
    }
  },

  watch: {
    flag: {
      deep: true,
    },
  },
};
</script>