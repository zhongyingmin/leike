<template>
  <div class="local">
    <div class="local-content">
      <div class="form-wrapper">
        <div class="form-item">
          <div class="label-title">{{ $t("localWarningSet") }}</div>
          <div class="botton-wrapper"></div>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("shapeWarningValue") }}:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.alarmValue"
              oninput="this.value=this.value.replace(/[^\-?\d.]/g,'');this.dispatchEvent(new Event('input'))"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <!-- <div class="form-item">
          <div class="label">覆盖类型:</div>
          <el-select v-model="value" @change="getDraws" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div> -->
        <div class="form-item">
          <div class="label">{{ $t("coverage") }}:</div>
          <el-select
            v-model="form.drawPictureId"
            multiple
            :placeholder="$t('please')"
          >
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("speedWarningValue") }}:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.alarmSpeed"
              oninput="this.value=this.value.replace(/[^\-?\d.]/g,'');this.dispatchEvent(new Event('input'))"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("acceleratedWarningValue") }}:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.alarmAcceleratedSpeed"
              oninput="this.value=this.value.replace(/[^\-?\d.]/g,'');this.dispatchEvent(new Event('input'))"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("contact") }}:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.alarmContact"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("phone") }}:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.telephone"
              spellcheck="false"
              placeholder=""
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{ $t("email") }}:</div>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.email"
              spellcheck="false"
              placeholder=""
            />
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
import { update, create } from "@/api/warning";
import { draws } from "@/api/map";
export default {
  components: {},
  props: {
    updated: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
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
      value: "",
      form: {},
      tableData: [],
      default: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    confirm() {
      if (this.form) {
        this.form.platformAlarmType = 1;
        let form = {
          platformAlarmType: 1,
          alarmValue: this.form.alarmValue,
          drawPictureId: this.form.drawPictureId.join(),
          alarmSpeed: this.form.alarmSpeed,
          alarmAcceleratedSpeed: this.form.alarmAcceleratedSpeed,
          alarmContact: this.form.alarmContact,
          telephone: this.form.telephone,
          email: this.form.email,
        };
        if (this.updated) {
          form.id = JSON.parse(localStorage["local"]).id;
          this.handleUpdate(form);
        } else {
          this.handleCreate(form);
        }
      } else {
        this.$message({
          showClose: true,
          message: "数据不能为空!",
          type: "info",
        });
      }
    },
    handleUpdate(form) {
      let self = this;
      update(form).then(() => {
        self.$message({
          showClose: true,
          message: "修改成功!",
          type: "success",
        });
        self.cancel();
      });
    },
    handleCreate(form) {
      let self = this;
      create(form).then(() => {
        self.$message({
          showClose: true,
          message: "新增成功!",
          type: "success",
        });
        self.cancel();
      });
    },
    cancel() {
      this.$router.push({ name: "Local" });
    },
    getDraws() {
      let self = this;
      draws({ dataType: this.value }).then((res) => {
        self.tableData = res.data.map((data) => {
          return { id: Number(data.id), name: data.name };
        });
        self.initData();
      });
    },
    // eslint-disable-next-line no-unused-vars
    beforeRouteLeave(to, from, next) {
      localStorage.removeItem("local");
      next();
    },
    initData() {
      if (this.updated) {
        let local = localStorage["local"];
        if (!local) {
          return;
        }
        let form = JSON.parse(local);
        form.drawPictureId = form.drawFeatureId
          .split(",")
          .map((data) => Number(data));
        // console.log(form);
        this.form = form;
      } else {
        return;
      }
    },
  },
  created() {},
  mounted() {
    this.getDraws();
  },
};
</script>
<style lang="scss" scoped>
.local {
  position: relative;
  height: 100%;
  .local-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    height: 600px;
    transform: translate(-50%, -50%);
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.9);
    padding: 40px 60px;
    .form-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
      .label {
        margin-top: 4px;
        width: 150px;
        color: #22e2cb;
      }
      .label-title {
        color: #fff;
        font-size: 18px;
      }
      .input-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 150px);
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
      ::v-deep(.el-select) {
        width: calc(100% - 150px);
        background: transparent;
        input {
          border: 1px solid #fff;
          border-radius: 2px;
          background: transparent;
          color: #fff;
        }
      }
      ::v-deep(.el-select-v2) {
        width: calc(100% - 150px) !important;
        background: transparent;
        .el-select-v2__wrapper {
          width: 100%;
          border: 1px solid #fff;
          border-radius: 2px;
          background: transparent;
          input {
            background: transparent;
          }
        }
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
          border: 1px solid #22e2cb;
          color: #fff;
          border-radius: 4px;
        }
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
</style>
