<template>
  <div class="speed-plus">
    <div class="menu-wrapper">
      <div class="left">
        <span>*提示:预警等级级别从下往上越来越高（一级预警最高级别）</span>
        <!-- <div
          v-for="(data, index) in menuItem"
          :key="index"
          :class="{ selectItem: menuIndex == data.type }"
          @click="menuIndex = data.type"
        >
          {{ data.name }}
        </div> -->
      </div>
      <div class="right">
        <div class="confirm" @click="confirm">完成</div>
        <!-- <div class="cancel">取消</div> -->
      </div>
    </div>
    <div class="item-wrapper" v-show="menuIndex == 0">
      <div class="item" v-for="(data, index) in form" :key="index">
        <div class="left-wrapper">
          <div class="label" v-if="index == 0">一级预警:</div>
          <div class="label" v-if="index == 1">二级预警:</div>
          <div class="label" v-if="index == 2">三级预警:</div>
          <div class="label" v-if="index == 3">四级预警:</div>
          <div class="text-wrapper">
            <interval-text v-model="data.input"></interval-text>
          </div>
        </div>
        <div class="right-wrapper">
          <div class="label">{{$t('color')}}:</div>
          <div
            class="tagColor-wrapper"
            :style="{ backgroundColor: data.color }"
          ></div>
        </div>
        <!-- <div class="right-wrapper">
          <div class="label">颜色:</div>
          <div class="input-wrapper">
            <div class="tagColor-wrapper">
              {{ data.color }}
            </div>
            <el-color-picker v-model="data.color" size="mini"></el-color-picker>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <div class="item-wrapper" v-show="menuIndex == 1"></div> -->
  </div>
</template>

<script>
import { getList, update } from "@/api/warning/level";
export default {
  components: {},
  props: {},
  data() {
    return {
      menuIndex: 0,
      menuItem: [
        {
          name: "全局",
          type: 0,
        },
        {
          name: "局部",
          type: 1,
        },
      ],
      form: [],
      query: {
        alarmType: 2,
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    confirm() {
      if (this.form) {
        this.handleUpdate();
      } else {
        this.$message({
          showClose: true,
          message: "数据不能为空!",
          type: "info",
        });
      }
    },
    handleUpdate() {
      let self = this;
      const form=this.form.map(data=>{
          data.lowerLimit = data.input[0];
          data.upperLimit = data.input[1];
        return data
      })
      update(form).then(() => {
        self.$message({
          showClose: true,
          message: "修改成功!",
          type: "success",
        });
        self.form={}
        self.getLevel()
      });
    },
    getLevel() {
      let self = this;
      const colors = ["red", "#f98d15", "#f2eb2e", "#2185F5"];
      getList(this.query).then((res) => {
        self.form = res.data.map((data,index) => {
          data.input = [data.lowerLimit, data.upperLimit];
          data.color = colors[index];
          return data;
        });
      });
    },
  },
  created() {},
  mounted() {
    this.getLevel();
  },
};
</script>
<style lang="scss" scoped>
.speed-plus {
  width: 100%;
  height: 100%;
  padding-left: 20px;
  .menu-wrapper {
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .left {
      display: flex;
      color: red;
      > div {
        margin-right: 30px;
        cursor: pointer;
      }
      .selectItem {
        color: #00fee4;
      }
    }
    .right {
      display: flex;
      > div {
        margin-left: 10px;
        padding: 4px 25px;
        border-radius: 4px;
        cursor: pointer;
      }
      .confirm {
        background-color: #00fee4;
      }
      .cancel {
        border: 1px solid #00fee4;
      }
    }
  }
  .item-wrapper {
    width: 100%;
    height: calc(100% - 50px);
    // overflow-y: scroll;
    padding: 60px;
    border: 1px dashed #00fee4;
    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 70px;
      &:last-of-type{
        margin-bottom: 0;
      }
      > div {
        display: flex;
        align-items: center;
      }
      .label {
        margin-right: 10px;
        color: #00fee4;
      }
      .input-wrapper {
        width: 280px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #fff;
        border-radius: 4px;
        padding: 0 10px;
        ::v-deep(.el-color-picker) {
          .el-color-picker__trigger {
            border: none;
          }
        }
      }
      .tagColor-wrapper {
        width: 50px;
        height: 30px;
      }
    }
  }
}
</style>
