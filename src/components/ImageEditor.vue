<template>
  <div class="editor-grid">
    <div class="button-box">
      <span v-if="flag[0]">
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
        v-if="flag[1]"
        @click.prevent="backgroundMasking()"
      >
        배경제거
      </button>
      <button
        class="imageEditorButton"
        v-if="flag[2]"
        @click.prevent="complete()"
      >
        완료
      </button>
    </div>

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
</template>

<script>
import PersonSegmentation from "../vision_modules/PersonSegmentation.js";

export default {
  props: ["ImageSrc"],
  data: function () {
    return {
      imgSrc: this.ImageSrc,
      model: null,
      flag: [true, false, false],
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
  },

  methods: {
    async backgroundMasking() {
      const canvasElement = document.getElementById("canvas");
      const backgroundElement = document.getElementById("background");

      await this.model.predict(canvasElement, backgroundElement);

      this.flag[1] = false;
      this.flag[2] = true;
    },

    addBackground(event) {
      var reader = new FileReader();

      var selectImg = event.target.files || event.dataTransfer.files;
      var file = selectImg[0];

      reader.onload = async (e) => {
        const image = document.getElementById("background_hidden");
        image.src = e.target.result;
        const canvas = document.getElementById("background");
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, 0, 0, 400, 400);
        this.flag[0] = false;
        this.flag[1] = true;
      };

      reader.readAsDataURL(file);
    },

    complete() {
      const imageData = document
        .getElementById("canvas")
        .getContext("2d")
        .getImageData(0, 0, 400, 400);
      this.$emit("complete", imageData);
    },
  },

  watch: {},
};
</script>