<template>
  <div class="app-main">
    <router-view class="app-content" :key="key" />
    <div class="header-wrapper">
      <MapTool />
    </div>
    <Lamp />
  </div>
</template>

<script>
import MapTool from "@/components/MapTool";
import Lamp from "@/components/Lamp";
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.fullPath;
    },
  },
  components: {
    Lamp,
    MapTool,
  },
  methods: {},
};
</script>

<style lang="scss">
.table-wrapper {
  margin-top: 20px;
  width: 100%;
  .box_checkbox {
    position: relative;
    display: inline-block;
    width: 26px;
    height: 20px;
  }
  .box_checkbox label {
    cursor: pointer;
    position: absolute;
    width: 26px;
    height: 26px;
    top: 0;
    left: 0;
    background: transparent;
    border: 1px solid #1eeed1;
  }
  .box_checkbox label:after {
    opacity: 1;
    content: "";
    position: absolute;
    width: 12px;
    height: 5px;
    background: transparent;
    top: 5px;
    left: 4px;
    border: 2px solid #1eeed1;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .box_checkbox input[type="checkbox"]:checked + label:after {
    opacity: 0;
  }
  input[type="checkbox"] {
    position: absolute;
    visibility: hidden;
  }
  .head {
    display: flex;
    height: 80px;
    line-height: 80px;
    background-color: rgba(32, 217, 194, 0.3);
    color: #00fee4;
    > div {
      flex: 1;
      text-align: center;
    }
  }
  .body {
    height: calc(100% - 80px);
    overflow-y: scroll;
    > div {
      display: flex;
      height: 80px;
      line-height: 80px;
      > div {
        flex: 1;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:nth-of-type(2n) {
        background-color: rgba(32, 217, 194, 0.3);
      }
      .handle {
        display: flex;
        justify-content: space-around;
        cursor: pointer;
      }
      .remove {
        color: red;
        cursor: pointer;
      }
      .edit {
        color: #37fbbb;
        cursor: pointer;
      }
      .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url("../../assets/images/chartline.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
      .warning-color {
        color: #f98d15;
        cursor: pointer;
      }
      .red-color {
        color: red;
      }
      .yellow-color {
        color: #f98d15;
      }
      .orange-color {
        color: #f2eb2e;
      }
      .blue-color {
        color: #2185f5;
      }
    }
  }
}
.app-main {
  position: relative;
  width: 100%;
  height: calc(100% - 55px);
  > .header-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
  }
  .app-content {
    position: absolute;
    z-index: 20;
    width: 100%;
    height: 100%;
    pointer-events: none;
    > div {
      pointer-events: auto;
    }
    > .app-left {
      width: 455px;
      height: calc(100% - 80px);
      // padding-top: 25px;
      margin-left: 10px;
      position: absolute;
      top: 80px;
      left: 0;
    }
    > .app-right {
      width: 455px;
      height: calc(100% - 80px);
      // padding-top: 25px;
      margin-right: 10px;
      position: absolute;
      top: 80px;
      right: 0;
    }
  }
}
</style>
