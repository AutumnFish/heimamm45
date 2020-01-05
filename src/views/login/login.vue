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
          <el-input v-model="registerForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input show-password v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7" class="code-col">
              <!-- 注册验证码 -->
              <img @click="changeRegCode" :src="regCodeUrl" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <!-- 如果 delayTime不等于0 返回的是 false -->
              <el-button :disabled="delayTime!=0" @click="getMessage">{{ btnMessage }}</el-button>
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
import { login, sendsms } from "../../api/login.js";

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
      // 登录验证码的地址
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
      registerForm: {
        // 手机号
        phone: "",
        // 图片验证码
        code: ""
      },
      // 左侧间隙
      formLabelWidth: "60px",
      // 注册验证码的地址
      regCodeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      // 定义按钮的文本
      btnMessage: "获取用户验证码",
      // 定义倒计时的时间
      delayTime: 0
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
    },
    // 切换注册验证码
    changeRegCode() {
      this.regCodeUrl = `${process.env.VUE_APP_BASEURL}/captcha?type=sendsms&t=${Date.now()}`;
    },
    // 获取短信
    getMessage() {
      // 手机号
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(this.registerForm.phone) == false) {
        return this.$message.error("小老弟，手机号不太对哦！！！");
      }
      // 图片验证码
      if (this.registerForm.code.length != 4) {
        return this.$message.error("小老弟，图形验证码不太对哦！！！");
      }
      // 如果没有倒计时 开启
      if (this.delayTime === 0) {
        // 改成60
        this.delayTime = 60;
        // 判断 一些值
        const interId = setInterval(() => {
          // 递减
          this.delayTime--;
          // 修改显示的文本
          this.btnMessage = `还剩下${this.delayTime}秒哦！`;
          if (this.delayTime === 0) {
            // 倒计时结束
            // 清除定时器
            clearInterval(interId);
            // 还原文本
            this.btnMessage = "获取用户验证码";
          }
        }, 100);
      } else {
        // 正在倒计时中
        return;
      }

      // 调用接口
      sendsms({
        code: this.registerForm.code,
        phone: this.registerForm.phone
      }).then(res => {
        // window.console.log(res)
        if (res.data.code == 200) {
          this.$message.success("短信验证码是:" + res.data.data.captcha);
        }
      });
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
  .el-dialog__header {
    background: linear-gradient(to right, rgba(1, 198, 250, 1), rgba(20, 147, 250, 1));
  }
  // 对话框的颜色
  .el-dialog__title {
    color: white;
  }

  // 验证码的样式
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
  .bg {
  }
}
</style>
