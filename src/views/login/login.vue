<template>
  <div class="login-container">
    <!-- 左侧的盒子 -->
    <div class="left">
      <!-- 标题盒子 -->
      <div class="title-box">
        <img src="../../assets/logo.png" alt="" />
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
      <!-- 表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="43px" class="demo-ruleForm login-form">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input
            class="high-input"
            prefix-icon="el-icon-user"
            v-model="ruleForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <!-- 验证码 -->
            <el-col :span="18">
              <el-input prefix-icon="el-icon-key" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col class="code-col" :span="6">
              <!-- 验证码 -->
              <!-- <img src="../../assets/code.jpg" alt="" /> -->
              <img @click="changeCode" :src="codeUrl" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button class="login-btn reset-btn" type="primary" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img class="bg" src="../../assets/login_banner_ele.png" alt="" />

    <!-- 注册对话框 -->
    <el-dialog center width="603px" title="用户注册" :visible.sync="dialogFormVisible">
      <el-form :model="registerForm">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input show-password v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.name" autocomplete="off"></el-input>
              </el-col>
            <el-col :offset="1" :span="7">
              <img src="../../assets/code.jpg" alt="">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <el-button >获取用户验证码</el-button>
            </el-col>
          </el-row>
          
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入 axios
// import axios from "axios";
// 导入抽取好的 api 方法
import { login } from "../../api/login.js";

// 定义验证手机号的方法
const validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("手机号不能为空"));
  } else {
    // 定义正则 正则  对象
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    // 验证
    if (reg.test(value) == true) {
      // 对
      callback();
    } else {
      // 错
      callback(new Error("小老弟，手机号，写错了哟 O(∩_∩)O哈哈~"));
    }
  }
};
export default {
  name: "login",
  data() {
    return {
      // 验证码的地址
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        // 是否勾选
        checked: false
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "change" }
        ],
        code: [
          { required: true, message: "验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在必须为4", trigger: "change" }
        ]
      },
      // 注册对话框相关
      dialogFormVisible: false,
      // 注册表单
      registerForm: {},
      // 左侧间隙
      formLabelWidth:'60px'
    };
  },
  methods: {
    // 登录点击事件
    submitForm(formName) {
      // 是否勾选
      if (this.ruleForm.checked == false) {
        // 提示
        this.$message.warning("亲爱的用户，请先勾选用户协议哦！(づ￣ 3￣)づ");
        return;
      }
      // 等同于 this.$refs.ruleForm
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$message.success("验证成功");
          // 调用接口
          login({
            phone: this.ruleForm.phone,
            password: this.ruleForm.password,
            code: this.ruleForm.code
          }).then(res => {
            // window.console.log(res);
            if (res.data.code === 202) {
              // 错误
              this.$message.error(res.data.message);
            } else if (res.data.code === 200) {
              this.$message.success("老铁，你可算回来啦！！！");
            }
          });
        } else {
          this.$message.error("格式不对哦，检查一下呗！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 切换验证码
    changeCode() {
      // 必须要有分隔符
      // this.codeUrl=process.env.VUE_APP_BASEURL+'/captcha?type=login&'+Date.now()
      // this.codeUrl=process.env.VUE_APP_BASEURL+'/captcha?type=login&'+Math.random()
      this.codeUrl = process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Date.now();
    }
  }
};
</script>

<style lang="less">
.login-container {
  display: flex;
  /* 侧轴方向 居中 */
  align-items: center;
  /* 线型渐变 */
  background: linear-gradient(225deg, rgba(1, 198, 250, 1), rgba(20, 147, 250, 1));
  /* 主轴方向 均分 */
  justify-content: space-around;
  height: 100%;
  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 44px;
    // 盒模型 让padding不会撑开盒子
    box-sizing: border-box;
    // 标题盒子
    .title-box {
      display: flex;
      // 上下居中
      align-items: center;
      margin-left: 48px;
      img {
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }
      .title {
        font-size: 24px;
        font-weight: 400;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #dfdfdf;
        margin-right: 12px;
        height: 28px;
      }
      .sub-title {
        font-size: 22px;
        font-weight: 400;
      }
    }
    // 登录表单
    .login-form {
      padding-right: 41px;
      margin-top: 27px;
      // 栅格 验证码
      .code-col {
        height: 40px;
        img {
          width: 100%;
          height: 100%;
          // 小手手
          cursor: pointer;
        }
      }
      // 更高的文本框
      .high-input > input {
        height: 45px;
        line-height: 45px;
      }
    }
    // 表单内部的 按钮
    .login-btn {
      width: 100%;
      margin-left: 0;
    }
    .reset-btn {
      margin-top: 28px;
    }
  }
  // 对话框
  .el-dialog__header{
    background:linear-gradient(to right,rgba(1, 198, 250, 1),rgba(20, 147, 250, 1));
  }
  // 对话框的颜色
  .el-dialog__title{
    color:white;
  }
  .bg {
  }
}
</style>
