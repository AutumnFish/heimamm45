import Vue from 'vue'
import App from './App.vue'
// 导入路由对象
import router from './router/index.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载 注入 Vue实例
  router
}).$mount('#app')
