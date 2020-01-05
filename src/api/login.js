// 导入axios
import axios from "axios";

// 定义一个登陆的方法 并暴露出去
export function login(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/login",
    method: "post",
    // 跨域 是否携带 cookie
    withCredentials: true,
    data // data: data
  });
}
