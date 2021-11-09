<template>
  <div class="shielding">
    <div class="app-right wrapper">
      <div class="header">
        <my-title name="区域屏蔽列表"></my-title>
        <div class="size"></div>
      </div>
      <div class="content">
        <div
          class="item-wrapper"
          v-for="(data, index) in dataItem"
          :key="index"
        >
          <div>{{ data.name }}</div>
          <div class="box_checkbox">
            <input
              type="checkbox"
              :id="'point' + index"
              v-model="data.input"
              @change="handelClick(data)"
            />
            <label :for="'point' + index"></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { draws } from "@/api/map";
import { toRaw } from "@vue/reactivity";
import { update } from "@/api/map";
export default {
  components: {},
  props: {},
  data() {
    return {
      query: {
        dataType: "area",
      },
      dataItem: [],
    };
  },
  watch: {},
  computed: {
    mapState() {
      return this.$store.getters.status;
    },
  },
  methods: {
    handelClick(row) {
      let data = this.dataItem
        .filter((data) => {
          return !data.input;
        })
        .map((data) => {
          return toRaw(JSON.parse(data.dataDetail));
        });
      // console.log(row);
      this.handleUpdate({ id: row.id, shield: !row.input ? 1 : 0 });
      this.$sendIframe("shielding", data);
    },
    handleUpdate(obj) {
      let self = this;
      update(obj).then(() => {
        self.$message({
          showClose: true,
          message: "操作成功!",
          type: "success",
        });
      });
    },
    getDraws() {
      let self = this;
      draws(this.query).then((res) => {
        self.dataItem = res.data.map((data) => {
          data.input = data.shield ? false : true;
          return data;
        });
        let data = res.data.filter((item) => {
          return item.shield == 1;
        });
        self.$sendIframe("shielding", data);
      });
    },
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteLeave(to, from, next) {
    this.$sendIframe("shielding", []);
    next();
  },
  created() {
    if (this.mapState) {
      this.getDraws();
    } else {
      this.$loadMap(() => {
        this.getDraws();
      });
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.box_checkbox {
  position: relative;
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
  visibility: hidden;
}
.shielding {
  .content {
    position: relative;
    height: calc(100% - 40px);
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.7);
    padding: 30px 10px;
    .item-wrapper {
      display: flex;
      justify-content: space-between;
      padding: 0 50px;
      margin-bottom: 30px;
    }
  }
}
</style>
