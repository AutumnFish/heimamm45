// 导入 抽取的 请求对象
import userRequest from '../utils/request'

// 抽取的接口方法
// 获取列表
export function userList(params){
    return userRequest({
        url:"/user/list",
        method:'get',
        params
    })
}
// 添加用户
export function userAdd(data){
    return userRequest({
        url:"/user/add",
        method:'post',
        data
    })
}
// 状态修改
export function userStatus(data){
    return userRequest({
        url:"/user/status",
        method:'post',
        data
    })
}
// 删除用户
export function userRemove(data){
    return userRequest({
        url:"/user/remove",
        method:'post',
        data
    })
}
// 获取编辑用户
export function userEdit(data){
    return userRequest({
        url:"/user/edit",
        method:'post',
        data
    })
}
