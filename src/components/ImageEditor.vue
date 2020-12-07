<template>
  <div class="editor-grid">
    <div class="thumbnail">
      <img @click.prevent="changeMainImg" :src="originalImg" >
      <img @click.prevent="changeMainImg" :src="backImg">
      <img @click.prevent="changeMainImg" :src="removedBack">
      <img @click.prevent="changeMainImg" :src="composedImg">
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
      originalImg:this.ImageSrc,
      imgSrc: this.ImageSrc,
      backImg: null,
      removedBack:null,
      composedImg:null,
    };
  },
  mounted() {

  },
  methods: {
    changeMainImg(e){
      this.imgSrc=e.target.src
    }

  },
  watch: {},
};
</script>