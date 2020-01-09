// 导入 axios
import axios from "axios";

// 导入 工具函数
import { getToken } from "../utils/token.js";

// 创建 新的请求对象
// enterprise 企业
// request 请求
const request = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
});
// 拦截器
// 添加请求  拦截器(回调函数)
request.interceptors.request.use(
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
request.interceptors.response.use(
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

// 暴露出去 
// 把创建出来的 请求对象 暴露出去
export default request;