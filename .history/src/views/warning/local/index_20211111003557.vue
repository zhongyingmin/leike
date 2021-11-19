<template>
  <div class="graphic">
    <div class="graphic-content">
      <div class="header-wrapper">
        <div class="close" @click="close">
          <i class="el-icon-close"></i>
        </div>
        <div class="left">
          <span class="title">
            {{$t('localWarningSet')}}
          </span>
          <span class="bottom-add" @click="handleCreate">{{$t('create')}}</span>
        </div>
        <!-- <div class="right">
          <my-search v-model="query.name" @input="getLocal"></my-search>
        </div> -->
      </div>
      <div class="table-wrapper">
        <div class="head">
          <div>id</div>
          <div>{{$t('warningCount')}}</div>
          <div>{{$t('speedWarningValue')}}</div>
          <div>{{$t('acceleratedWarningValue')}}</div>
          <div>{{$t('contact')}}</div>
          <div>{{$t('phone')}}</div>
          <div>{{$t('email')}}</div>
          <div>{{$t('handle')}}</div>
        </div>
        <div class="body">
          <div class="coll" v-for="(data, index) in tableData" :key="index">
            <div>{{ data.id }}</div>
            <div>{{ data.alarmValue }}</div>
            <div>{{ data.alarmSpeed }}</div>
            <div>{{ data.alarmAcceleratedSpeed }}</div>
            <div>{{ data.alarmContact }}</div>
            <div>{{ data.telephone }}</div>
            <div>{{ data.email }}</div>
            <div class="handle">
              <div class="edit" @click="handleUpdate(data)">编辑</div>
              <div class="remove" @click="handleRemove(data)">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData, remove } from "@/api/warning";
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      query: {
        name: "",
        platformAlarmType: 1,
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    close() {
      this.$router.push("/");
    },
    handleCreate() {
      this.$router.push({ name: "LocalCreate" });
    },
    handleUpdate(row) {
      localStorage["local"] = JSON.stringify(row);
      this.$router.push({ name: "LocalEdit" });
    },
    handleRemove(data) {
      let self = this;
      this.$confirm("是否删除此条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          await remove({ id: data.id });
          self.getLocal();
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
    getLocal() {
      let self = this;
      getData(this.query).then((res) => {
        // console.log(res);
        self.tableData = res.data || [];
      });
    },
  },
  created() {
    this.getLocal();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.graphic {
  padding: 80px 10px 10px 10px;
  height: 100%;
  .graphic-content {
    height: 100%;
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.9);
    padding: 40px 60px;
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
      position: relative;
      display: flex;
      justify-content: space-between;
      .close {
        position: absolute;
        top: -30px;
        right: -50px;
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
      > div {
        display: flex;
        align-items: center;
      }
      .title {
        font-size: 30px;
        margin-right: 30px;
      }
      .bottom-add {
        font-weight: bold;
        padding: 6px 20px;
        border-radius: 4px;
        cursor: pointer;
        background-color: #00fee4;
      }
      .my-search {
        width: 400px;
      }
    }
  }
  .table-wrapper {
    height: calc(100% - 65px);
  }
}
</style>
