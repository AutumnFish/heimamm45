// 导入 抽取出来的请求对象
import questionRequest from '../utils/request.js'

// 抽取方法
// 新增题库方法
export function questionAdd(data){
    return questionRequest({
        url:"/question/add",
        method:"post",
        data
    })
}


// 编辑题库方法
// edit 编辑
export function questionEdit(data){
    return questionRequest({
        url:"/question/edit",
        method:"post",
        data
    })
}


// 删除题库方法
// remove 删除
export function questionRemove(data){
    return questionRequest({
        url:"/question/remove",
        method:"post",
        data
    })
}

// 获取题库列表方法
// list 列表
export function questionList(params){
    return questionRequest({
        url:"/question/list",
        method:"get",
        params
    })
}

// 修改题库状态方法
// status 状态
export function questionStatus(data){
    return questionRequest({
        url:"/question/status",
        method:"post",
        data
    })
}

