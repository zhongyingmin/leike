<template>
  <div class="flight">
    <div class="app-left">
      <div class="flight-content">
        <div class="header-wrapper">
          <my-title :name="$t('flightPath')"></my-title>
          <div class="size"></div>
        </div>
        <div class="content-wrapper">
          <div class="header-wrapper">
            <div class="left"></div>
            <div class="right">
              <div class="confirm" @click="handleClick">雷达环绕</div>
              <div class="confirm" @click="handleAdd">新增</div>
            </div>
          </div>
          <div class="table-wrapper">
            <div class="head">
              <div>名称</div>
              <div>操作</div>
            </div>
            <div class="body">
              <div class="coll" v-for="(data, index) in tableData" :key="index">
                <div>{{ data.name }}</div>
                <div class="handle">
                  <div class="edit" @click="handleFlight(data)">飞行</div>
                  <div class="edit" @click="handleRemove(data)">删除</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { list, remove, create } from "@/api/other/flight";
import { toRaw } from "@vue/reactivity";
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      query: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleFlight(row) {
      let data=toRaw(row)
      this.$sendIframe("flight", { type: 2, data });
    },
    handleClick() {
      this.$sendIframe("flight", { type: 1 });
    },
    handleAdd() {
      this.$sendIframe("flight", { type: 0 });
    },
    handleRemove(row) {
      let self = this;
      this.$confirm("是否删除此条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          await remove({ ids: row.id });
          self.getFlight();
          self.$message({
            message: "删除成功!",
            type: "success",
            showClose: true,
          });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "取消删除",
            showClose: true,
          });
        });
    },
    handleCreate(obj) {
      let self = this;
      create(obj).then(() => {
        // console.log(res)
        self.getFlight();
        self.$message({
          showClose: true,
          message: "新增成功!",
          type: "success",
        });
      });
    },
    handleSave(row) {
      let obj = { path: JSON.stringify(row) };
      let self = this;
      this.$prompt("请输入name", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          obj.name = value;
          self.handleCreate(obj);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    getFlight() {
      let self = this;
      list(self.query).then((res) => {
        // console.log(res);
        self.tableData = res.data;
      });
    },
  },
  created() {},
  mounted() {
    let self = this;
    self.getFlight();
    window.addEventListener(
      "message",
      async function(e) {
        console.log(e);
        let data = e.data;
        if (data.eve === "flyline") {
          self.handleSave(data.attr);
        }
      },
      true
    );
  },
};
</script>
<style lang="scss" scoped>
.flight {
  .flight-content {
    height: 100%;
    ::v-deep(.el-select) {
      input {
        background-color: transparent;
        border: 1px solid #32f1b4;
        color: #fff;
        &::-webkit-input-placeholder {
          color: #fff;
        }
      }
      i {
        color: #fff;
      }
    }
    .header-wrapper {
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
        align-items: center;
      }
      .confirm {
        background-color: #00fee4;
      }
      .right,
      .left {
        > div {
          margin-left: 10px;
          padding: 5px 25px;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }
  .content-wrapper {
    position: relative;
    height: calc(100% - 40px);
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    margin: 0;
    .table-wrapper {
      height: calc(100% - 40px);
    }
  }
  .wrapper {
    .header {
      position: relative;
      .size {
        position: absolute;
        top: 18px;
        right: 2px;
        width: 19px;
        height: 19px;
        background: url("../../assets/images/size.png") no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
      .font {
        position: absolute;
        top: 18px;
        right: 2px;
        cursor: pointer;
        color: #00fee4;
      }
    }
    .content {
      position: relative;
      height: calc(100% - 40px);
      background: rgba(0, 0, 0, 0.7);
      .checkbox-wrapper {
        position: absolute;
        z-index: 10;
        right: 10px;
        top: 10px;
      }
    }
    .l1,
    .l2,
    .l3,
    .r1,
    .r2,
    .r3 {
      width: 100%;
      height: 33%;
    }
    .shrink {
      .icon {
        display: inline-block;
        width: 31px;
        height: 26px;
      }
    }
    .content-wrapper {
      width: 100%;
      height: calc(100% - 35px);
    }
  }
}
</style>
