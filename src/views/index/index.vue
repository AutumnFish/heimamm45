<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <!-- 左侧 -->
      <div class="left">
        <!-- 左上角的小图标 -->
        <i @click="collapse = !collapse" class="icon el-icon-s-fold"></i>
        <img class="logo" src="../../assets/index_logo.png" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <img class="avatar" :src="userInfo.avatar" alt="" />
        <span class="username">{{ userInfo.username }},您好</span>
        <el-button @click="logout" size="small" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- width:auto 自动改变  如果不给 或者给死 就不会变
          因为导航菜单是他的子元素
       -->
      <el-aside class="my-aside" width="auto">
        <!-- 导航菜单 -->
        <el-menu router :collapse="collapse" :default-active="$route.path" class="el-menu-vertical-demo">
          <el-menu-item index="/index/chart">
            <!-- e-charts -->
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入api方法
import { info, logout } from "../../api/login.js";
// 导入 删除token方法
import { removeToken } from "../../utils/token.js";

export default {

  

  name: "index",
  data() {
    return {
      userInfo: {},
      // 是否折叠菜单
      collapse: false
    };
  },
  beforeCreate() {
    // // 获取token 并判断
    // const token = getToken();
    // // window.console.log(token)
    // if (token == null) {
    //   // 提示用用户 去登录页
    //   this.$message.warning("小老弟，请先登录");
    //   this.$router.push("/login");
    // }
  },
  created() {
    info().then(res => {
      window.console.log(res);
      // 判断 token是否有问题
      if (res.data.code === 206) {
        // token错误
        // 提示用户
        this.$message.warning("你是假的登录！！！！ 滑稽");
        // 删除token
        removeToken();
        // 去登录页
        this.$router.push("/login");
        return;
      }
      // 保存数据
      this.userInfo = res.data.data;
      // 头像没有基地址 自己拼接
      this.userInfo.avatar = process.env.VUE_APP_BASEURL + "/" + this.userInfo.avatar;
    });

    // window.console.log(this.$route)
  },
  methods: {
    logout() {
      // 对话框
      this.$confirm("你确认要走?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击确定
          logout().then(res => {
            // window.console.log(res)
            if (res.data.code === 200) {
              // 成功了
              removeToken();
              // 去登录页
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          // 点击取消
        });
    }
  }
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .my-header {
    // background: yellow;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
        margin-right: 22px;
      }
      .logo {
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
        font-weight: 400;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .username {
        font-size: 14px;
        color: #636363;
        margin-right: 38px;
      }
    }
  }
  .my-aside {
    // background: pink;
  }
  .my-main {
    background: #0094ff;
  }
  // 导航菜单的 样式
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
