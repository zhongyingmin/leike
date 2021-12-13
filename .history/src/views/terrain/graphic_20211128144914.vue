<template>
  <div class="graphic">
    <div class="graphic-content">
      <div class="header-wrapper">
        <div class="close" @click="close">
          <i class="el-icon-close"></i>
        </div>
        <div class="left">
          <span>
            {{$t('terrainGraphic')}}
          </span>
          <el-select
            v-model="query.dataType"
            @change="getDraws"
            :placeholder="$t('please')"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="$(item.value)"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="right">
          <my-search v-model="query.name" @input="getDraws"></my-search>
        </div>
      </div>
      <div class="table-wrapper">
        <div class="head">
          <div>
            <div class="box_checkbox">
              <input
                type="checkbox"
                id="allCheckbox"
                v-model="status"
                @click="handleAll"
              />
              <label for="allCheckbox"></label>
            </div>
          </div>
          <div>{{$t('name')}}</div>
          <div>{{$t('type')}}</div>
          <div>{{$t('positionInfo')}}</div>
          <div>{{$t('height')}}</div>
          <div>{{$t('slope')}}</div>
          <div>{{$t('direction')}}</div>
          <div>{{$t('createTime')}}</div>
          <div>{{$t('handle')}}</div>
        </div>
        <div class="body">
          <div class="coll" v-for="(data, index) in globalData" :key="index">
            <div>
              <div class="box_checkbox">
                <input type="checkbox" id="pointAll" v-model="checkedAll" disabled/>
                <label for="pointAll"></label>
              </div>
            </div>
            <div>{{ data.name }}</div>
            <div>{{ data.dataType }}</div>
            <div v-bind:title="data.positions">
              {{ data.positions }}
            </div>
            <div>{{ data.elevationValue }}</div>
            <div>{{ data.slope }}</div>
            <div>{{ data.aspect }}</div>
            <div>{{ data.timestamp }}</div>
            <div class="handle">——</div>
          </div>
          <div class="coll" v-for="(data, index) in tableData" :key="index">
            <div>
              <div class="box_checkbox">
                <input
                  type="checkbox"
                  :id="'point' + index"
                  v-model="data.state"
                  @click="handleCheckbox(data)"
                />
                <label :for="'point' + index"></label>
              </div>
            </div>
            <div>{{ data.name }}</div>
            <div>{{ data.dataType }}</div>
            <div v-bind:title="data.positions">
              {{ data.positions }}
            </div>
            <div>{{ data.elevationValue }}</div>
            <div>{{ data.slope }}</div>
            <div>{{ data.aspect }}</div>
            <div>{{ data.timestamp }}</div>
            <div class="handle">
              <div class="edit" @click="handleUpdate(data)">{{$t('edit')}}</div>
              <div class="remove" @click="handleRemove(data)">{{$t('remove')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { draws, remove, updateList } from "@/api/map";
import { toRaw } from "@vue/reactivity";
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        // {
        //   point: "点位1",
        //   date: "8-14  18:21:32",
        //   address: "X:21.1313 Y:21.1313",
        //   altitude: "XXXX",
        //   slope: "XXXX",
        //   direction: "XXXX",
        //   userName: "张三",
        // },
        // {
        //   point: "点位1",
        //   date: "8-14  18:21:32",
        //   address: "X:21.1313 Y:21.1313",
        //   altitude: "XXXX",
        //   slope: "XXXX",
        //   direction: "XXXX",
        //   userName: "张三",
        // },
        // {
        //   point: "点位1",
        //   date: "8-14  18:21:32",
        //   address: "X:21.1313 Y:21.1313",
        //   altitude: "XXXX",
        //   slope: "XXXX",
        //   direction: "XXXX",
        //   userName: "张三",
        // },
        // {
        //   point: "点位1",
        //   date: "8-14  18:21:32",
        //   address: "X:21.1313 Y:21.1313",
        //   altitude: "XXXX",
        //   slope: "XXXX",
        //   direction: "XXXX",
        //   userName: "张三",
        // },
        // {
        //   point: "点位1",
        //   date: "8-14  18:21:32",
        //   address: "X:21.1313 Y:21.1313",
        //   altitude: "XXXX",
        //   slope: "XXXX",
        //   direction: "XXXX",
        //   userName: "张三",
        // },
        // {
        //   point: "点位1",
        //   date: "8-14  18:21:32",
        //   address: "X:21.1313 Y:21.1313",
        //   altitude: "XXXX",
        //   slope: "XXXX",
        //   direction: "XXXX",
        //   userName: "张三",
        // },
        // {
        //   point: "点位1",
        //   date: "8-14  18:21:32",
        //   address: "X:21.1313 Y:21.1313",
        //   altitude: "XXXX",
        //   slope: "XXXX",
        //   direction: "XXXX",
        //   userName: "张三",
        // },
        // {
        //   point: "点位1",
        //   date: "8-14  18:21:32",
        //   address: "X:21.1313 Y:21.1313",
        //   altitude: "XXXX",
        //   slope: "XXXX",
        //   direction: "XXXX",
        //   userName: "张三",
        // },
      ],
      query: {
        name: "",
        dataType: "",
      },
      options: [
        {
          value: "point",
          label: "点",
        },
        {
          value: "line",
          label: "线",
        },
        {
          value: "area",
          label: "面",
        },
      ],
      globalData: [
        {
          name: "全局形变最小值",
          dataType: "global",
          positions: "——",
          elevationValue: "——",
          slope: "——",
          aspect: "——",
          timestamp: "——",
        },
        {
          name: "全局形变平均值",
          dataType: "global",
          positions: "——",
          elevationValue: "——",
          slope: "——",
          aspect: "——",
          timestamp: "——",
        },
        {
          name: "全局形变最大值",
          dataType: "global",
          positions: "——",
          elevationValue: "——",
          slope: "——",
          aspect: "——",
          timestamp: "——",
        },
      ],
    };
  },
  watch: {},
  computed: {
    checkedArr() {
      return this.$store.getters.checkedArr;
    },
    mapState() {
      return this.$store.getters.status;
    },
    checkedAll(){
      return !this.status
    },
    status: {
      get() {
        return (
          this.tableData.filter((item) => item.state).length ===
          this.tableData.length
        );
      },
      set(value) {
        this.tableData.map(function(item) {
          item.state = value;
          return item;
        });
      },
    },
  },
  methods: {
    close() {
      this.$router.push("/");
    },
    handleAll() {
      // console.log(this.status);
      const status = this.status;
      let data = this.tableData.map((item) => {
        item.state = status;
        return toRaw(item);
      });
      let selectData = this.tableData.map((data) => {
        return {
          id: data.id,
          status: status ? 1 : 0,
        };
      });
      updateList(selectData).then(() => {});
      // console.log(this.status);
      // console.log(data);
      this.$sendIframe("graphic", data);
    },
    handleCheckbox(row) {
      // console.log(row);
      updateList([{ id: row.id, status: !row.state ? 0 : 1 }]).then(() => {});
      this.$sendIframe("graphic", [toRaw(row)]);
    },
    handleUpdate(row) {
      this.$sendIframe("update", JSON.parse(row.dataDetail));
      localStorage["graphic"] = JSON.stringify(row);
      this.$router.push({ name: row.dataType + "Edit" });
    },
    handleRemove(data) {
      let self = this;
      this.$confirm("是否删除此条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          self.$sendIframe("removeGraphic", JSON.parse(data.dataDetail));
          await remove({ id: data.id });
          self.getDraws();
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
    getDraws() {
      let self = this;
      let checked = this.checkedArr;
      draws(this.query).then((res) => {
        // console.log(res);
        let data = res.data.map((data) => {
          data.state = true;
          return data;
        });
        if (checked && checked.length) {
          data = data.map((data) => {
            data.state = checked.indexOf(data.id) !== -1 ? false : true;
            return data;
          });
        }
        self.tableData = data;
      });
    },
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteLeave(to, from, next) {
    let data = this.tableData
      .filter((data) => {
        return !data.state;
      })
      .map((data) => data.id);
    this.$store.dispatch("user/updateChecked", data);
    // console.log(data)
    next();
    // let data = this.tableData.map((data) => {
    //   return {
    //     id: data.id,
    //     status: data.state ? 0 : 1,
    //   };
    // });
    // updateList(data).then(() => {});
    // console.log(data)
    // console.log(this.state);
  },
  created() {
    if (this.mapState) {
      this.getDraws();
    } else {
      this.$loadMap(() => {
        setTimeout(() => {
          this.getDraws();
        }, 500);
      });
    }
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
      span {
        font-size: 30px;
        margin-right: 30px;
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
