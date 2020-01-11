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
import { getToken } from "@/utils/token.js";

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

// 注册 导航守卫（回调函数）
router.beforeEach((to, from, next) => {
  window.console.log(to);
  window.console.log(from);
  window.console.log(next);
  // 登录页面，不用登录页可以访问
  if (to.path === "/login") {
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
      window.alert("先登录");
      next("/login");
    }
  }
});

// 暴露出去
export default router;
