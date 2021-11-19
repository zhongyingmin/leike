<template>
  <div class="layer">
    <div class="header-wrapper">
      <CheckBoxs v-model:checkbox="dataItem" @boxs-change="handleChange" />
    </div>
    <div class="app-right wrapper">
      <div class="content-wrapper">
        <div class="r1" v-show="!dataItem[1].input">
          <div class="header">
            <my-title :name="$t('shapeValue')"></my-title>
          </div>
          <div class="content">
            <div class="form-item">
              <div class="label">{{$t('shapeMinValue')}}:</div>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="form.xbmin"
                  @blur="handleUpdate('xb', true)"
                  spellcheck="false"
                  placeholder=""
                />
              </div>
            </div>
            <div class="form-item">
              <div class="label">{{$t('shapeMaxValue')}}:</div>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="form.xbmax"
                  @blur="handleUpdate('xb', true)"
                  spellcheck="false"
                  placeholder=""
                />
              </div>
            </div>
            <div class="form-item">
              <div class="label">{{$t('opacity')}}:</div>
              <el-slider
                style="width: calc(100% - 120px);"
                @change="handleUpdate('xb', true)"
                v-model="form.xbopacity"
                :format-tooltip="formatTooltip"
              ></el-slider>
            </div>
          </div>
        </div>
        <div class="r2" v-show="!dataItem[2].input">
          <div class="header">
            <my-title :name="$t('speedValue')"></my-title>
          </div>
          <div class="content">
            <div class="form-item">
              <div class="label">{{$t('speedMinValue')}}:</div>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="form.xbsdmin"
                  @blur="handleUpdate('xbsd', true)"
                  spellcheck="false"
                  placeholder=""
                />
              </div>
            </div>
            <div class="form-item">
              <div class="label">{{$t('speedMaxValue')}}:</div>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="form.xbsdmax"
                  @blur="handleUpdate('xbsd', true)"
                  spellcheck="false"
                  placeholder=""
                />
              </div>
            </div>
            <div class="form-item">
              <div class="label">{{$t('opacity')}}:</div>
              <el-slider
                style="width: calc(100% - 120px);"
                @change="handleUpdate('xbsd', true)"
                v-model="form.xbsdopacity"
                :format-tooltip="formatTooltip"
              ></el-slider>
            </div>
          </div>
        </div>
        <div class="r3" v-show="!dataItem[3].input">
          <div class="header">
            <my-title :name="$t('acceleratedValue')"></my-title>
          </div>
          <div class="content">
            <div class="form-item">
              <div class="label">{{$t('acceleratedMinValue')}}:</div>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="form.xbjsdmin"
                  @blur="handleUpdate('xbjsd', true)"
                  spellcheck="false"
                  placeholder=""
                />
              </div>
            </div>
            <div class="form-item">
              <div class="label">{{$t('acceleratedMaxValue')}}:</div>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="form.xbjsdmax"
                  @blur="handleUpdate('xbjsd', true)"
                  spellcheck="false"
                  placeholder=""
                />
              </div>
            </div>
            <div class="form-item">
              <div class="label">{{$t('opacity')}}:</div>
              <el-slider
                style="width: calc(100% - 120px);"
                @change="handleUpdate('xbjsd', true)"
                v-model="form.xbjsdopacity"
                :format-tooltip="formatTooltip"
              ></el-slider>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="left-item-wrapper" v-if="state">
      <div
        class="left-item"
        v-for="(data, index) in dataItem.filter(
          (data) => data.name != '地形图层'
        )"
        :key="index"
        :ref="'item' + index"
        v-show="!data.input"
      >
        <ColorPicker
          v-model:gradient="data.gradient"
          @change="handleColor(data)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CheckBoxs from "@/components/CheckBoxs";
import { setConfig, getConfig } from "@/api/user";
import ColorPicker from "@/components/ColorPickerGather";
import { toRaw } from "@vue/reactivity";
export default {
  components: {
    CheckBoxs,
    ColorPicker,
  },
  props: {},
  data() {
    return {
      state: false,
      color: "",
      dataItem: [
        {
          input: false,
          name: "地形图层",
          type: "isShowTerrain",
          gradient: ["#FFFA15", "#00ff00", "#0000ff"],
        },
        {
          input: false,
          name: "形变图层",
          type: "xb",
          gradient: ["#FFFA15", "#00ff00", "#0000ff"],
        },
        {
          input: true,
          name: "形变速度图层",
          type: "xbsd",
          gradient: ["#FFFA15", "#00ff00", "#0000ff"],
        },
        {
          input: true,
          name: "形变加速度图层",
          type: "xbjsd",
          gradient: ["#FFFA15", "#00ff00", "#0000ff"],
        },
      ],
      form: {
        xbmin: "-10",
        xbmax: "10",
        xbsdmin: "-10",
        xbsdmax: "10",
        xbjsdmin: "-10",
        xbjsdmax: "10",
        xbjsdopacity: 20,
        xbsdopacity: 20,
        xbopacity: 20,
      },
      // dataItem: JSON.parse(localStorage["checkbox"] || null) || [
      //   {
      //     input: false,
      //     name: "地形图层",
      //     type: "isShowTerrain",
      //     gradient: ["#FFFA15", "#00ff00", "#0000ff"],
      //   },
      //   {
      //     input: false,
      //     name: "形变图层",
      //     type: "xb",
      //     gradient: ["#FFFA15", "#00ff00", "#0000ff"],
      //   },
      //   {
      //     input: true,
      //     name: "形变速度图层",
      //     type: "xbsd",
      //     gradient: ["#FFFA15", "#00ff00", "#0000ff"],
      //   },
      //   {
      //     input: true,
      //     name: "形变加速度图层",
      //     type: "xbjsd",
      //     gradient: ["#FFFA15", "#00ff00", "#0000ff"],
      //   },
      // ],
      // form: JSON.parse(localStorage["layer"] || null) || {
      //   xbmin: "-10",
      //   xbmax: "10",
      //   xbsdmin: "-10",
      //   xbsdmax: "10",
      //   xbjsdmin: "-10",
      //   xbjsdmax: "10",
      // },
    };
  },
  watch: {},
  computed: {
    mapState() {
      return this.$store.getters.status;
    },
  },
  methods: {
    formatTooltip(val) {
      return val / 100;
    },
    mapUpdate() {
      // console.log(this.form);
      let userConfig = {
        layer: {
          dataItem: this.dataItem,
          form: this.form,
        },
      };
      let data = JSON.stringify(userConfig);
      this.handleSave(data);
    },
    handleColor(row, state) {
      let dataItem = { ...row };
      let data = {};
      for (const key in dataItem) {
        data[key] = toRaw(dataItem[key]);
      }
      this.$sendIframe("updateColor", data);
      console.log(state)
      if (!state) this.mapUpdate();
    },
    handleSave(data) {
      // let self = this;
      setConfig({ jsonStr: data }).then(() => {
        // self.$message({
        //   showClose: true,
        //   message: "操作成功!",
        //   type: "success",
        // });
      });
    },
    handleUpdate(type, state) {
      let dataItem = { ...this.form };
      let data = {};
      for (const key in dataItem) {
        data[key] = toRaw(dataItem[key]);
      }
      this.$sendIframe("layer", {
        type,
        data,
      });
      // console.log(state);
      if (state) this.mapUpdate();
    },
    selectLayer(row) {
      // console.log(row);
      if (row.name == "地形图层") {
        this.$sendIframe("isShowTerrain", !row.input);
      } else {
        this.$sendIframe("isShowXbLayer", { type: row.type, show: !row.input });
      }
      this.mapUpdate();
    },
    handleChange(row) {
      // this.mapUpdate();
      // console.log(row);
      // if (!row.input) {
      //   this.handleColor(row, false);
      //   this.handleUpdate(row.type, false);
      // }
      this.selectLayer(row);
      // localStorage["checkbox"] = JSON.stringify(checkbox);
    },
    initColorHtml(con1, colors) {
      if (con1) {
        var div = document.createElement("div");
        div.style.cssText = "width: 100%;height: 100%;";
        div.style.background = `linear-gradient(${colors.join()})`;
        con1.appendChild(div);
      }
    },
    getUserConfig() {
      let self = this;
      getConfig().then((res) => {
        // console.log(res);
        if (JSON.stringify(res.config) != "{}") {
          let data = JSON.parse(res.config.jsonStr);
          // console.log(data);
          self.form = data.layer.form;
          self.dataItem = data.layer.dataItem.map((data) => {
            // data.input = true;
            // if (data.name == "地形图层") {
            //   data.input = false;
            // }
            // if (data.name == "形变图层") {
            //   data.input = false;
            // }
            return data;
          });
        }
        self.state = true;
      });
    },
  },
  created() {
    if (this.mapState) {
      this.getUserConfig();
    } else {
      this.$loadMap(() => {
        this.getUserConfig();
      });
    }
  },
  mounted() {
    // window.onbeforeunload = () => {
    //   localStorage.removeItem("layer");
    //   localStorage.removeItem("checkbox");
    // };
  },
};
</script>
<style lang="scss" scoped>
.layer {
  > .header-wrapper {
    position: absolute;
    top: 0;
    left: 720px;
    z-index: 21;
    display: flex;
    align-items: center;
    height: 80px;
  }
  .left-item-wrapper {
    position: absolute;
    bottom: 40px;
    left: 40px;
    display: flex;
    .left-item {
      // width: 50px;
      // height: 200px;
      margin-right: 40px;
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
    }
    .content {
      position: relative;
      height: calc(100% - 40px);
      background: rgba(0, 0, 0, 0.7);
      padding: 30px 20px;
      .checkbox-wrapper {
        position: absolute;
        z-index: 10;
        right: 10px;
        top: 10px;
      }
      .form-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 30px;
        .label {
          margin-top: 4px;
          width: 120px;
          color: #22e2cb;
        }
        .input-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: calc(100% - 120px);
          border: 1px solid #fff;
          border-radius: 2px;
          .tagColor-wrapper {
            display: flex;
            align-items: center;
            margin-left: 10px;
          }
          ::v-deep(.el-color-picker) {
            .el-color-picker__trigger {
              border: none;
            }
          }
        }
        .text-wrapper {
          width: calc(100% - 120px);
          display: flex;
          justify-content: flex-end;
        }
        .botton-wrapper {
          display: flex;
          > div {
            padding: 4px 20px;
            cursor: pointer;
          }
          .confirm {
            background: #22e2cb;
            border-radius: 4px;
            margin-right: 20px;
          }
          .remove {
            border: 1px solid red;
            color: red;
            border-radius: 4px;
          }
        }
      }
      input {
        // position: absolute;
        width: 100%;
        height: 28px;
        // top: 7px;
        // right: 39px;
        font-size: 16px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        border: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        outline: none;
        padding: 2px 10px;
        background: rgba(0, 0, 0, 0);
        color: #fff;
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
    .content-wrapper {
      height: 100%;
    }
  }
}
</style>
