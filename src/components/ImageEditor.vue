<template>
  <div class="editor-grid">
    <button @click.prevent="backgroundMasking()">배경제거</button>
    <div class="filebox">
      <label for="img_file">배경선택</label>
      <input
        type="file"
        id="img_file"
        @change="addBackground"
        accept="image/*"
      />
    </div>
    <button>배경합성</button>
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
</template>

<script>
import PersonSegmentation from "../vision_modules/PersonSegmentation.js";

export default {
  props: ["ImageSrc"],
  data: function () {
    return {
      imgSrc: this.ImageSrc,
      model: null,
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
      };

      reader.readAsDataURL(file);
    },

    openImageEditor() {},
  },

  watch: {},
};
</script>