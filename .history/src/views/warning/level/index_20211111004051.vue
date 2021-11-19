<template>
  <div class="level">
    <div class="level-content">
      <div class="close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <div class="title-wrapper">
        预警等级设置
      </div>
      <div class="column-wrapper">
        <div class="tag">
          <div
            v-for="(data, index) in tagItem"
            :key="index"
            :class="{ selectItam: componentId == data.type }"
            @click="componentId = data.type"
          >
            {{ $t(data.tagName) }}
          </div>
        </div>
        <div class="tag-views">
          <component :is="componentId"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Shape, Speed, SpeedPlus } from "./components";
export default {
  components: {
    Speed,
    Shape,
    SpeedPlus,
  },
  props: {},
  data() {
    return {
      componentId: "Shape",
      tagItem: [
        {
          type: "Shape",
          tagName: "形变预警",
        },
        {
          type: "Speed",
          tagName: "形变速度预警",
        },
        {
          type: "SpeedPlus",
          tagName: "形变加速度预警",
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    close() {
      this.$router.push("/");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.level {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .level-content {
    position: relative;
    width: 1100px;
    height: 75%;
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.9);
    padding: 30px 20px 30px 60px;
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      width: 30px;
      height: 30px;
      background-color: red;
      border-radius: 50%;
      overflow: hidden;
      padding: 5px;
      i {
        font-size: 20px;
        color: #fff;
      }
    }
    .title-wrapper {
      width: 100%;
      height: 40px;
      color: #fff;
      font-size: 30px;
    }
    .column-wrapper {
      display: flex;
      height: calc(100% - 40px);
      .tag {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 20%;
        border-right: 1px dashed #10dfcb;
        > div {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 45px;
          border: 1px solid #10dfcb;
          border-radius: 8px;
          margin-top: 30px;
          cursor: pointer;
        }
        .selectItam {
          background-color: #10dfcb;
        }
      }
      .tag-views {
        width: 80%;
        height: 100%;
      }
    }
  }
}
</style>
