<template>
  <div class="map">
    <!-- http://47.92.199.181:8955/3DDemo/leike/index.html -->
    <!-- http://192.168.1.7:8080/3DDemos/leike/index.html -->
    <!-- http://127.0.0.1:8091/leikeMap/index.html -->
    <iframe
      :src="url"
      id="iframe_key"
      frameborder="0"
      width="100%"
      height="100%"
    ></iframe>
  </div>
</template>

<script>
export default {
  computed:{
    url(){
      return window.customENV.mapURL
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
