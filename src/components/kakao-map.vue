<template>
  <div id="kakao-map">
    <div id="map" style="width: 500px; height: 400px"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=cd0852921402270fba77d26ba5bf56a1";
    document.head.appendChild(script);
  },
};
</script>