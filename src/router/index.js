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
import chart from '../views/index/chart/chart.vue';
import user from '../views/index/user/user.vue';
import question from '../views/index/question/question.vue';
import enterprise from '../views/index/enterprise/enterprise.vue';
import subject from '../views/index/subject/subject.vue';

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
      children:[
        {
          path:'chart',// 解析为 /index/chart
          component:chart
        },
        {
          path:'user',// 解析为 /index/user
          component:user
        },
        {
          path:'question',// 解析为 /index/question
          component:question
        },
        {
          path:'enterprise',// 解析为 /index/enterprise
          component:enterprise
        },
        {
          path:'subject',// 解析为 /index/subject
          component:subject
        },
      ]
    }
  ]
});

// 暴露出去
export default router;
