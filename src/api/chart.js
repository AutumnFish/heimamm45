// 导入 抽取出来的请求对象
import chartRequest from '../utils/request.js';

// 抽取方法
// 新增企业方法
export function chartQuestion() {
  return chartRequest({
    url: '/data/statistics',
    method: 'post'
  });
}
