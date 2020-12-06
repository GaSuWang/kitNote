<template>
  <div class="editor-grid">
    <button>배경제거</button>
    <button>배경추가</button>
    <button>배경합성</button>
    <img :src="imgSrc" id="image" />
  </div>
</template>

<script>
export default {
  props: ["ImageSrc"],
  data: function () {
    return {
      imgSrc: this.ImageSrc,
    };
  },
  mounted() {
    console.log(this.ImageSrc);
  },
  methods: {},
  watch: {},
};
</script>