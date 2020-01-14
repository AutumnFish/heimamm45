<template>
  <div class="chart-container">
    <!-- 头部 -->
    <el-card class="card-header">
      <ul class="circle-box">
        <li class="circle-item">
          <div class="circle primary">0</div>
          <span>今日新增用户</span>
        </li>
        <li class="circle-item">
          <div class="circle primary">1</div>
          <span>今日新增用户</span>
        </li>
        <li class="circle-item">
          <div class="circle warning">2</div>
          <span>总用户量</span>
        </li>
        <li class="circle-item">
          <div class="circle warning">3</div>
          <span>新增试题</span>
        </li>
        <li class="circle-item">
          <div class="circle success">4</div>
          <span>总试题量</span>
        </li>
        <li class="circle-item">
          <div class="circle success">5</div>
          <span>今日新增用户</span>
        </li>
      </ul>
    </el-card>
    <!-- 底部 -->
    <el-card class="card-main">
      <h2 class="title">整体数据</h2>
      <div ref="chartsBox" class="charts-box"></div>
    </el-card>
  </div>
</template>

<script>
// 导包
import echarts from 'echarts';
// 导入接口
import { chartQuestion } from '@/api/chart.js';

export default {
  name: 'chart',
  // 使用 依赖于接口数据，并且依赖于 dom元素的 初始化逻辑
  // 一般 全部写在 mounted中
  mounted() {
    chartQuestion().then(res => {
      window.console.log(res);
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.querySelector('.charts-box'));
      // map方法 返回一个新的数组
      // 传入回调函数 每次会把 每一项 传给V
      // return 的值 最终会拼成一个 新的数组
      const nameArr = res.data.map(v => {
        return v.name;
      });
      window.console.log(nameArr);

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          data: res.data.map(v => {
            return v.name;
          })
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            color: ['#0094ff', '#f76137', '#f9b358','#e91e56'],
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: res.data
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less">
.chart-container {
  ul {
    list-style: none;
  }
  .card-header {
    height: 149px;
    .el-card__body {
      padding-top: 10px;
    }
    .circle-box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .circle {
        width: 99px;
        height: 99px;
        border: 2px solid black;
        border-radius: 50%;
        font-size: 35px;
        text-align: center;
        line-height: 99px;

        &.primary {
          border-color: #0086fa;
          color: #0086fa;
        }
        &.warning {
          border-color: #f76137;
          color: #f76137;
        }
        &.success {
          border-color: #55cd78;
          color: #55cd78;
        }
      }
      .circle-item {
        span {
          font-size: 16px;
          margin-top: 10px;
          color: #737373;
          display: block;
          margin-top: 10px;
          text-align: center;
        }
      }
    }
  }
  .card-main {
    margin-top: 19px;
    position: relative;
    .title {
      position: absolute;
      left: 55px;
      top: 34px;
      color: #666666;
      font-weight: normal;
    }
    .charts-box {
      height: 571px;
    }
  }
}
</style>
