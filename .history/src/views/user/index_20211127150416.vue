<template>
  <div class="user">
    <div class="user-content">
      <div class="header-wrapper">
        <div class="left">
          <span>
          {{$t('UserManage')}}
          </span>
          <!-- <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
        </div>
        <div class="right">
          <el-button @click="handleAdd">{{$t('create')}}</el-button>
          <!-- <my-search v-model="input"></my-search> -->
        </div>
      </div>
      <div class="table-wrapper">
        <div class="head">
          <div>id</div>
          <div>{{$t('UserName')}}</div>
          <div>{{$t('phonenumber')}}</div>
          <div>{{$t('createTime')}}</div>
          <div>{{$t('handle')}}</div>
        </div>
        <div class="body">
          <div class="coll" v-for="(data, index) in tableData" :key="index">
            <div>{{ data.userId }}</div>
            <div>{{ data.userName }}</div>
            <div>{{ data.phonenumber }}</div>
            <div>{{ data.createTime }}</div>
            <div class="handle">
              <div class="edit" @click="handleInfo(data)">{{$t('edit')}}</div>
              <div class="edit" @click="resetPassWord(data)">{{$t('resetPassword')}}</div>
              <div
                class="edit"
                v-if="data.status == 2"
                @click="handleStatus(data, 0)"
              >
                {{$t('through')}}
              </div>
              <div
                class="edit"
                v-if="data.status == 1"
                @click="handleStatus(data, 0)"
              >
                {{$t('start')}}
              </div>
              <div
                class="remove"
                v-if="data.status == 0"
                @click="handleStatus(data, 1)"
              >
                {{$t('disable')}}
              </div>
              <div class="remove" @click="handleRemove(data)">{{$t('remove')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      @close="cancel"
      width="28%"
    >
      <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
        <el-form-item :label="$t('UserName')" required>
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('password')" required v-show="show">
          <el-input type="password" v-model="form.passwd"></el-input>
        </el-form-item>
        <el-form-item :label="$t('phonenumber')" required>
          <el-input v-model="form.phonenumber"></el-input>
        </el-form-item>
        <el-form-item :label="$t('email')" required>
          <!-- <span class="svg-container">
          <i class="el-icon-user"></i>
        </span> -->
          <el-input
            ref="email"
            v-model="form.email"
            placeholder="邮箱"
            name="email"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item :label="$t('post')" required>
          <el-select v-model="form.postId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('role')" required>
          <el-radio-group v-model="form.roleId">
            <el-radio :label="0">普通用户</el-radio>
            <el-radio :label="1">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('sex')" required>
          <el-radio-group v-model="form.sex">
            <el-radio :label="'0'">男</el-radio>
            <el-radio :label="'1'">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">{{$t('cancel')}}</el-button>
          <el-button type="primary" @click="confirm('form')">{{$t('confirm')}}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { users, update, remove, create, modifyPasswd } from "@/api/user";
import { validUsername } from "@/utils/validate";
export default {
  components: {},
  props: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      show: false,
      title: "",
      dialogVisible: false,
      tableData: [],
      input: "",
      value: "0",
      form: {
        postId: "4",
        roleId: 0,
        sex: "0",
      },
      formRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      options: [
        {
          value: "1",
          label: "董事长",
        },
        {
          value: "2",
          label: "项目经理",
        },
        {
          value: "3",
          label: "人力资源",
        },
        {
          value: "4",
          label: "普通员工",
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleStatus(row, status) {
      let self = this;
      this.$confirm(`是否${status ? "禁用" : "启用"}此用户状态?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          // console.log(row, status);
          update({ userId: row.userId, status }).then(() => {
            self.getUsers();
            self.$message({
              showClose: true,
              message: "操作成功!",
              type: "success",
            });
          });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "取消修改",
            showClose: true,
          });
        });
    },
    resetPassWord(row) {
      this.$prompt("请输入的新密码?", "重置", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[a-zA-Z0-9]{6,}$/,
        inputErrorMessage: "密码格式不正确(密码长度要大于6位)",
      })
        .then(async ({ value }) => {
          let data = { userId: row.userId, passwd: value };
          await modifyPasswd(data);
          this.$message({
            showClose: true,
            message: "操作成功!",
            type: "success",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    confirm(formName) {
      let self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (self.title == "用户新增") {
            self.handleCreate();
          } else {
            self.handleUpdate();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.form = {
        postId: "4",
        roleId: 0,
        sex: "0",
      };
      this.show = false;
    },
    handleAdd() {
      this.title = "用户新增";
      this.show = true;
      this.dialogVisible = true;
    },
    handleCreate() {
      let self = this;
      create(this.form).then(() => {
        self.getUsers();
        self.$message({
          showClose: true,
          message: "新增成功!",
          type: "success",
        });
        self.dialogVisible = false;
      });
    },
    handleRemove(data) {
      let self = this;
      this.$confirm("是否删除此用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          await remove({ userId: data.userId });
          self.getUsers();
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
    getUsers() {
      let self = this;
      users().then((res) => {
        // console.log(res);
        self.tableData = res.data;
      });
    },
    handleInfo(row) {
      //   console.log(row);
      this.title = "用户修改";
      this.form = { ...row };
      this.dialogVisible = true;
    },
    handleUpdate() {
      let self = this;
      update(this.form).then(() => {
        self.getUsers();
        self.$message({
          showClose: true,
          message: "修改成功!",
          type: "success",
        });
        self.dialogVisible = false;
      });
    },
  },
  created() {
    this.getUsers();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
::v-deep(.el-select),
::v-deep(.el-input) {
  width: 100%;
  // input {
  //   background-color: transparent;
  //   border: 1px solid #32f1b4;
  //   color: #fff;
  //   &::-webkit-input-placeholder {
  //     color: #fff;
  //   }
  // }
  // i {
  //   color: #fff;
  // }
}
.user {
  padding: 80px 10px 10px 10px;
  height: 100%;
  .user-content {
    height: 100%;
    border: 1px solid #32f1b4;
    background: rgba(0, 0, 0, 0.9);
    padding: 40px 60px;
    .header-wrapper {
      display: flex;
      justify-content: space-between;
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
