// 导入 抽取出来的请求对象
import enterpriseRequest from '../utils/request.js'

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

