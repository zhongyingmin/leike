<template>
  <div class="action">
    <div class="app-right wrapper">
      <div class="header">
        <my-title :name="$t(title)"></my-title>
        <div class="size"></div>
      </div>
      <div class="content">
        <div class="form-item">
          <div class="label">{{ $t("positionName") }}:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.name"
              @input="mapUpdate"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("showName") }}</div>
          <div class="botton-wrapper">
            <el-radio-group v-model="form.showLabel" @change="mapUpdate">
              <el-radio :label="'1'">{{ $t("yes") }}</el-radio>
              <el-radio :label="'0'">{{ $t("no") }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="title">
          <div class="line"></div>
          {{ $t("pointInfo") }}
        </div>
        <div class="form-item">
          <div class="label">{{ $t("positionInfo") }}:</div>
          <div class="input-wrapper">
            <textarea
              type="text"
              v-model="form.positions"
              @blur="mapUpdate"
              rows="5"
              cols="30"
              placeholder=""
            ></textarea>
          </div>
          <!-- <div class="text-wrapper">{{ form.positions }}</div> -->
        </div>
        <div v-show="type == 'point'">
          <div class="form-item">
            <div class="label">{{ $t("height") }}:</div>
            <div class="text-wrapper">{{ form.height }}</div>
          </div>
          <div class="form-item">
            <div class="label">{{ $t("slope") }}:</div>
            <div class="text-wrapper">{{ form.slopeStr1 }}</div>
          </div>
          <div class="form-item">
            <div class="label">{{ $t("direction") }}:</div>
            <div class="text-wrapper">{{ form.direction }}</div>
          </div>
        </div>
        <div class="title">
          <div class="line"></div>
          {{ $t("pointSet") }}
        </div>
        <div class="form-item">
          <div class="label">{{ $t("color") }}:</div>
          <div class="input-wrapper">
            <div class="tagColor-wrapper">
              <div
                :style="{
                  width: '15px',
                  height: '15px',
                  marginRight: '5px',
                  background: form.color,
                }"
              ></div>
              <div>{{ form.color }}</div>
            </div>
            <el-color-picker
              v-model="form.color"
              @change="mapUpdate"
              size="mini"
            ></el-color-picker>
          </div>
        </div>
        <div class="form-item" v-show="type == 'line' || type == 'area'">
          <div class="label">{{ $t("opacity") }}:</div>
          <el-slider
            style="width: calc(100% - 120px);"
            @change="mapUpdate"
            v-model="form.opacity"
            :format-tooltip="formatTooltip"
          ></el-slider>
        </div>
        <div class="form-item" v-show="type == 'area'">
          <div class="label">{{ $t("borderColor") }}:</div>
          <div class="input-wrapper">
            <div class="tagColor-wrapper">
              <div
                :style="{
                  width: '15px',
                  height: '15px',
                  marginRight: '5px',
                  background: form.outlineColor,
                }"
              ></div>
              <div>{{ form.outlineColor }}</div>
            </div>
            <el-color-picker
              v-model="form.outlineColor"
              @change="mapUpdate"
              size="mini"
            ></el-color-picker>
          </div>
        </div>
        <!-- <div class="form-item" v-show="type == 'area'">
          <div class="label">{{$t('borderOpacity')}}:</div>
          <el-slider
            style="width: calc(100% - 120px);"
            @change="mapUpdate"
            v-model="form.outlineOpacity"
            :format-tooltip="formatTooltip"
          ></el-slider>
        </div> -->
        <!-- <div class="form-item">
          <div class="label">字体打点:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.fontPoint"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div> -->
        <!-- <div class="form-item">
          <div class="label">字体颜色:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.fontColor"
              spellcheck="false"
              placeholder=""
              @input="mapUpdate"
            />
          </div>
        </div> -->
        <div class="form-item" v-show="type == 'line'">
          <div class="label">{{ $t("width") }}:</div>
          <el-slider
            style="width: calc(100% - 120px);"
            @change="mapUpdate"
            v-model="form.width"
          ></el-slider>
        </div>
        <div class="form-item" v-show="type == 'point'">
          <div class="label">{{ $t("fontSize") }}:</div>
          <el-slider
            style="width: calc(100% - 120px);"
            @change="mapUpdate"
            v-model="form.size"
          ></el-slider>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("popupInfo") }}:</div>
          <div class="input-wrapper">
            <textarea
              rows="5"
              cols="30"
              @blur="mapUpdate"
              v-model="form.info"
            ></textarea>
          </div>
        </div>
        <div class="form-item">
          <div class="label"></div>
          <div class="botton-wrapper">
            <div class="confirm" @click="confirm">{{ $t("confirm") }}</div>
            <div class="remove" @click="cancel">{{ $t("cancel") }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRaw } from "@vue/reactivity";
import { create, update } from "@/api/map";
export default {
  components: {},
  props: {
    type: {
      type: String,
      required: true,
    },
    updated: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      state: false,
      // show: false,
      title: "",
      form: {
        showLabel: "1",
      },
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
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Graphic" });
    },
    rules(form) {
      if (form.name == "" || form.name == null) {
        this.$message({
          showClose: true,
          message: `名称不能为空!`,
          type: "warning",
        });
        return false;
      }
      try {
        JSON.parse(form.positions);
      } catch (error) {
        this.$message({
          showClose: true,
          message: `坐标信息格式不正确!`,
          type: "warning",
        });
        return false;
      }
      if (form.positions == "" || form.positions == null) {
        this.$message({
          showClose: true,
          message: `坐标信息不能为空!`,
          type: "warning",
        });
        return false;
      }
      if (this.type == "area") {
        if (Number(form.mianji) > 6000) {
          this.$message({
            showClose: true,
            message: `面积不能大于6000!`,
            type: "warning",
          });
          return false;
        }
      }
      if (this.type == "line") {
        if (Number(form.distance) > 200) {
          this.$message({
            showClose: true,
            message: `长度不能大于200!`,
            type: "warning",
          });
          return false;
        }
      }
      return true;
    },
    confirm() {
      let self = this;
      if (self.form) {
        if (this.rules(self.form)) {
          const form = {
            name: this.form.name,
            // positions: JSON.stringify(this.form.positions),
            positions: this.form.positions,
            dataType: this.type,
            showLabel: this.form.showLabel,
            elevationValue: this.form.height || 0,
            slope: this.form.slopeStr1 || 0,
            aspect: this.form.direction || 0,
            dataDetail: JSON.stringify(this.form),
            status: this.updated ? this.form.status : 1,
          };
          // console.log(form)
          if (this.updated) {
            self.handleUpdate(form);
          } else {
            self.handleCreate(form);
          }
        }
      } else {
        self.$message({
          showClose: true,
          message: "未绘制点位图形!",
          type: "warning",
        });
      }
    },
    handleCreate(form) {
      let self = this;
      create(form).then((res) => {
        // console.log(res)
        self.$message({
          showClose: true,
          message: "新增成功!",
          type: "success",
        });
        self.state = true;
        let checked = [...self.checkedArr];
        checked.push(res.fid);
        self.$store.dispatch("user/updateChecked", checked);
        self.$router.push({ name: "Home" });
      });
    },
    handleUpdate(form) {
      let self = this;
      let graphic = localStorage["graphic"];
      const row = JSON.parse(graphic);
      form.id = row.id;
      update(form).then(() => {
        self.$message({
          showClose: true,
          message: "操作成功!",
          type: "success",
        });
        self.state = true;
        self.$router.push({ name: "Home" });
      });
    },
    mapUpdate() {
      let form = { ...this.form };
      try {
        JSON.parse(form.positions);
      } catch (error) {
        this.$message({
          showClose: true,
          message: `坐标信息格式不正确!`,
          type: "warning",
        });
        return false;
      }
      let data = {};
      for (const key in form) {
        data[key] = toRaw(this.form[key]);
      }
      // console.log(form);
      this.$sendIframe(this.type, data);
    },
    formatTooltip(val) {
      return val / 100;
    },
    initData() {
      if (this.updated) {
        let graphic = localStorage["graphic"];
        if (!graphic) {
          return;
        }
        const row = JSON.parse(graphic);
        // console.log(row);
        this.form = JSON.parse(row.dataDetail);
        // console.log(this.form)
        this.show = true;
      } else {
        this.$sendIframe("drawTool", this.type);
      }
    },
    isJSON(str) {
      if (typeof str == "string") {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      }
    },
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteLeave(to, from, next) {
    // next()
    // console.log(this.state);
    if (this.state) {
      this.$sendIframe("removeMeasure", "");
      next();
    } else {
      let self = this;
      this.$confirm("是否取消绘制或编辑(本次编辑不做保留)?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          let form = {};
          localStorage.removeItem("graphic");
          if (!self.updated) {
            for (const key in this.form) {
              form[key] = toRaw(this.form[key]);
            }
            self.$sendIframe("removeGraphic", form);
          }
          self.$sendIframe("removeMeasure", "");
          next();
        })
        .catch(() => {});
    }
  },
  created() {},
  mounted() {
    // console.log(this.type);
    switch (this.type) {
      case "point":
        this.title = "action.point";
        break;
      case "line":
        this.title = "action.line";
        break;
      case "area":
        this.title = "action.area";
        break;

      default:
        break;
    }
    let self = this;
    window.addEventListener(
      "message",
      async function(e) {
        // console.log(e);
        let data = e.data;
        if (
          data.eve === "point" ||
          data.eve === "line" ||
          data.eve === "polygon"
        ) {
          // console.log(data);
          let obj = data.attr;
          if (!self.isJSON(obj.positions)) {
            obj.positions = JSON.stringify(obj.positions);
          }
          console.log(obj);
          self.form = obj;
          // self.show = true;
        }
      },
      true
    );
    if (this.mapState) {
      this.initData();
    } else {
      this.$loadMap(() => {
        setTimeout(() => {
          this.initData();
        }, 500);
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.action {
  .content {
    position: relative;
    height: calc(100% - 40px);
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.7);
    padding: 20px 10px;
    .title {
      display: flex;
      align-items: center;
      color: #fff;
      margin-bottom: 20px;
      .line {
        width: 5px;
        height: 15px;
        background: #31ffe9;
        margin-right: 10px;
      }
    }
    .form-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
      .label {
        margin-top: 4px;
        width: 100px;
        color: #22e2cb;
      }
      .input-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 120px);
        border: 1px solid rgba(99, 114, 123, 0.5);
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
      ::v-deep(.el-radio) {
        height: 30px;
        color: #fff;
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
    textarea {
      width: 100%;
      font-size: 16px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      border: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      outline: none;
      padding: 10px;
      background: rgba(0, 0, 0, 0);
      color: #fff;
    }
  }
}
</style>
