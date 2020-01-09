// 导入Vue
import Vue from 'vue'
// 导入 moment.js
import moment from 'moment'
// 创建全局过滤器-- 处理时间
Vue.filter('formatTime',function(value){
  // 处理 并 返回
  return moment(value).format('YYYY🐹MM😻DD')
})