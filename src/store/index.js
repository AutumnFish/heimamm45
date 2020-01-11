// 导入Vue
import Vue from 'vue'
// 导入Vuex
import Vuex from 'vuex'
// use一下
Vue.use(Vuex)
// 创建仓库对象
const store = new Vuex.Store({
    // 仓库中保存的数据
    state:{
        // 初始值为 空 默认是没有用户信息的
        userInfo:undefined
    }
})
// 暴露出去
export default store;