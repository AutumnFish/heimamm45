// 导入 axios
import axios from "axios";

// 导入 工具函数
import { getToken } from "../utils/token.js";

// 创建 新的请求对象
// enterprise 企业
// request 请求
const enterpriseRequest = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
});
// 拦截器
// 添加请求  拦截器(回调函数)
enterpriseRequest.interceptors.request.use(
  function(config) {
    // 在发送之前 干一些 事情
    // 设置请求头 携带token
    config.headers.token = getToken();
    return config;
  },
  function(error) {
    // 在请求错误的时候 干一些 事情
    return Promise.reject(error);
  }
);

// 添加响应  拦截器(回调函数)
enterpriseRequest.interceptors.response.use(
  function(response) {
    // 对响应的数据 做 一些 事情
    // .then 还没有触发
    // 把 .data 处理掉 .then中少写一个 .data
    return response.data;
  },
  function(error) {
    // 响应出错时，干一些事情
    return Promise.reject(error);
  }
);

// 抽取方法
// 新增企业方法
export function enterpriseAdd(data){
    return enterpriseRequest({
        url:"/enterprise/add",
        method:"post",
        data
    })
}


// 编辑企业方法
// edit 编辑
export function enterpriseEdit(data){
    return enterpriseRequest({
        url:"/enterprise/edit",
        method:"post",
        data
    })
}


// 删除企业方法
// remove 删除
export function enterpriseRemove(data){
    return enterpriseRequest({
        url:"/enterprise/remove",
        method:"post",
        data
    })
}

// 获取企业列表方法
// list 列表
export function enterpriseList(params){
    return enterpriseRequest({
        url:"/enterprise/list",
        method:"get",
        params
    })
}

// 修改企业状态方法
// status 状态
export function enterpriseStatus(data){
    return enterpriseRequest({
        url:"/enterprise/status",
        method:"post",
        data
    })
}

