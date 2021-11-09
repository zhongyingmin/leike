<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
      label-width="80px"
    >
      <div class="title-container">
        <h3 class="title">注册用户</h3>
      </div>

      <el-form-item label="用户名" prop="loginName">
        <!-- <span class="svg-container">
          <i class="el-icon-user"></i>
        </span> -->
        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          placeholder="用户名"
          name="loginName"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item label="密码" prop="passwd">
          <!-- <span class="svg-container">
            <i class="el-icon-lock"></i>
          </span> -->
          <el-input
            :key="passwordType"
            ref="passwd"
            v-model="loginForm.passwd"
            :type="passwordType"
            placeholder="密码"
            name="passwd"
            tabindex="2"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <!-- <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            /> -->
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item label="手机号" prop="phonenumber">
        <!-- <span class="svg-container">
          <i class="el-icon-user"></i>
        </span> -->
        <el-input
          ref="phonenumber"
          v-model="loginForm.phonenumber"
          placeholder="手机号"
          name="phonenumber"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <!-- <span class="svg-container">
          <i class="el-icon-user"></i>
        </span> -->
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="邮箱"
          name="email"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item label="职位" required>
        <el-select v-model="loginForm.postId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" required>
        <el-radio-group v-model="loginForm.sex">
          <el-radio :label="'0'">男</el-radio>
          <el-radio :label="'1'">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="Login">
        <router-link :to="{ name: 'Login' }">登录</router-link>
      </div>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.prevent="handleLogin"
        >注册</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validUsername, phoneFun,validEmail } from "@/utils/validate";
import { register } from "@/api/user";
export default {
  name: "Register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    const validatephone = (rule, value, callback) => {
      if (!phoneFun(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        loginName: "",
        passwd: "",
        phonenumber: "",
        postId: "4",
        roleId: 0,
        sex: "0",
        email:""
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
      loginRules: {
        loginName: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        passwd: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        phonenumber: [
          { required: true, trigger: "blur", validator: validatephone },
        ],
        email: [
          { required: true, trigger: "blur", validator: validateEmail },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.loginName === "") {
      this.$refs.loginName.focus();
    } else if (this.loginForm.passwd === "") {
      this.$refs.passwd.focus();
    } else if (this.loginForm.phonenumber === "") {
      this.$refs.phonenumber.focus();
    }
  },
  unmounted() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.passwd.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          register(this.loginForm)
            .then(() => {
              this.$router.push({
                name: "Login",
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("登陆异常!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  },
};
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  ::v-deep(.el-input),
  ::v-deep(.el-select) {
    display: inline-block;
    height: 47px;
    width: 100%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
    input {
      border: 1px solid rgba(0, 254, 228, 0.5);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #fff;
    }
  }
  ::v-deep(.el-form-item) {
    .el-form-item__label {
      color: #fff;
    }
    .el-radio__label {
      color: #fff;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: var(--el-color-primary);
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  // background-color: $bg;
  background: url("../../assets/images/loginbg.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .login-form {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 520px;
    max-width: 100%;
    padding: 60px 35px;
    margin: 0 auto;
    overflow: hidden;
    background: url("../../assets/images/denglubg.png") no-repeat;
    background-size: 100% 100%;
  }
  .Login {
    text-align: right;
    cursor: pointer;
    margin-bottom: 15px;
    a {
      color: #fff;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    color: #fff;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      text-shadow: 0 0 10px #00fee4;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
