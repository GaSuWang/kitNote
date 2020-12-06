<template>
  <div class="editor-grid">
    <div class="thumbnail">
      <img :src="imgSrc">
      <img>
      <img>
      <img>
    </div>
    <div>
      <button>배경제거</button>
      <button>배경추가</button>
      <button>배경합성</button>
    </div>
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

  },
  methods: {},
  watch: {},
};
</script>