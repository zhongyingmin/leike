<template>
  <div class="mytitle">
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.mytitle {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background: url("../../../assets/images/title.png") no-repeat;
  background-size: 100% 100%;
  padding: 0 40px;
}
</style>
