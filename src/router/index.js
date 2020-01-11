// 导入Vue
import Vue from "vue";
// 导入路由
import VueRouter from "vue-router";

// 导入 组件
// 注册组件
import login from "../views/login/login.vue";
// 首页组件
import index from "../views/index/index.vue";

// 嵌套路由的组件
import chart from "../views/index/chart/chart.vue";
import user from "../views/index/user/user.vue";
import question from "../views/index/question/question.vue";
import enterprise from "../views/index/enterprise/enterprise.vue";
import subject from "../views/index/subject/subject.vue";

// 导入 获取token的函数
import { getToken, removeToken } from "@/utils/token.js";

// 按需导入 弹框
// 和组件中 this.$message是个东西
import { Message } from "element-ui";

// 导入 获取用户信息的接口
import { info } from "@/api/login.js";

// 导入 仓库
import store from "@/store/index.js";

// 注册
Vue.use(VueRouter);

// 创建路由对象
const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: login
    },
    {
      path: "/index",
      component: index,
      // 嵌套路由的规则
      children: [
        {
          path: "chart", // 解析为 /index/chart
          component: chart
        },
        {
          path: "user", // 解析为 /index/user
          component: user
        },
        {
          path: "question", // 解析为 /index/question
          component: question
        },
        {
          path: "enterprise", // 解析为 /index/enterprise
          component: enterprise
        },
        {
          path: "subject", // 解析为 /index/subject
          component: subject
        }
      ]
    }
  ]
});

// 定义一个 白名单 就是一个 地址的数组
const whitePaths = ["/login"];

// 注册 导航守卫（回调函数）
// to 去的路由信息
// from 来的路由信息
// next 下一个（放走）
router.beforeEach((to, from, next) => {
  // window.console.log(to);
  // window.console.log(from);
  // window.console.log(next);
  // 登录页面，不用登录页可以访问
  // window.console.log( whitePaths.indexOf(to.path))
  // if ( whitePaths.indexOf(to.path)!=-1) {
  // window.console.log(whitePaths.includes(to.path.toLocaleLowerCase()));
  // 如果存在

  if (whitePaths.includes(to.path.toLocaleLowerCase()) == true) {
    // 必须执行
    next();
  } else {
    // 除了登录页面 都需要登录
    // 判断token 是否为空
    // 获取token 并判断
    const token = getToken();
    // window.console.log(token)
    if (token == null) {
      // 提示用用户 去登录页
      // vue实例，才可以 通过this.$message 访问弹框，这里我们先 用alert
      // window.alert("先登录");
      Message.warning("请先登录");
      next("/login");
    } else {
      // 如果token存在 就下一步
      // 调用接口，如果数据回去成功，token对的 反之错误的
      info().then(res => {
        // window.console.log(res);
        // 判断 token是否有问题
        if (res.data.code === 206) {
          // token错误
          // 提示用户
          Message.warning("你是假的登录！！！！ 滑稽");
          // 删除token
          removeToken();
          // 去登录页
          next("/login");
        } else {
          // token 是对的
          // window.console.log(res);
          // 如果状态 为 禁用 提示，打回登录页
          if (res.data.data.status === 0) {
            Message.warning("你当前是禁用状态，请等待管理员将你启用，在访问");
            next("/login");
          } else {
            // 如果状态 为 启用 放过去
            // 保存数据 保存到 仓库中
            store.state.userInfo = res.data.data;
            // 头像没有基地址 自己拼接
            store.state.userInfo.avatar = process.env.VUE_APP_BASEURL + "/" + store.state.userInfo.avatar;
            // 继续向后走
            next();
          }
        }
      });
    }
  }
});

// 暴露出去
export default router;
