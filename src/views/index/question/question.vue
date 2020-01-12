<template>
  <div class="question-container">
    <!-- 头部 header 头部-->
    <el-card class="header-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科" prop="status">
          <el-select class="normal" v-model="formInline.status" placeholder="请选择学科">
            <el-option v-for="item in subjectList" :label="item.short_name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="status">
          <el-select class="normal" v-model="formInline.status" placeholder="请选择阶段">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="status">
          <el-select class="normal" v-model="formInline.status" placeholder="请选择企业">
            <el-option v-for="item in enterpriseList" :label="item.short_name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="status">
          <el-select class="normal" v-model="formInline.status" placeholder="请选择题型">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <br />

        <el-form-item label="难度" prop="status">
          <el-select class="normal" v-model="formInline.status" placeholder="请选择难度">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="name">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="normal" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="标题" prop="name">
          <el-input class="normal title" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item class='control'>
          <!-- search 搜索 -->
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item class='control'>
          <!-- clear 清除 query查询 -->
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item class='control'>
          <!-- plus 加 -->
          <el-button type="primary" icon="el-icon-plus">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体  body 身体-->
    <el-card class="body-card">
      <!-- 表格 -->
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180"> </el-table-column>
        <el-table-column prop="eid" label="题目" width="180"> </el-table-column>
        <el-table-column prop="name" label="学科.阶段"> </el-table-column>
        <el-table-column prop="username" label="题型"> </el-table-column>
        <el-table-column prop="username" label="企业"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column label="状态">
          <template>
            <span class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="访问量"> </el-table-column>

        <el-table-column label="操作">
          <template>
            <el-button type="text">编辑</el-button>
            <el-button type="text">启用</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="my-pagination"
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// 导入学科的接口方法
import {subjectList} from '@/api/subject.js'
// 导入企业的接口方法
import {enterpriseList} from '@/api/enterprise.js'
export default {
  name: "question",
  data() {
    return {
      formInline: {},
      // 页码
      page: 1,
      // 页容量
      size: 4,
      // 页容量选项
      pageSize: [2, 4, 6, 8],
      // 总条数
      total: 0,
      // 学科的数据
      subjectList:[],
      // 企业的数据
      enterpriseList:[],
    };
  },
  created(){
    // 学科数据
    subjectList().then(res=>{
      // window.console.log(res)
      this.subjectList = res.data.items;
    })
    // 企业数据
    enterpriseList().then(res=>{
      // window.console.log(res)
      this.enterpriseList = res.data.items;
    })
  },
  methods: {
    // 页容量改变
    sizeChange(size) {
      window.console.log(size);
    },
    // 页码改变
    pageChange(page) {
      window.console.log(page);
    }
  }
};
</script>

<style lang="less">
.question-container {
  .el-input {
    width: 150px;
  }
  .el-form--inline .el-form-item:not(.control) {
    margin-right: 30px;
  }
  .el-form-item__label {
    padding-right: 30px;
  }
  .title{
    width: 388px;
  }
  .body-card{
    margin-top: 30px;
  }
  .my-pagination{
    margin-top: 20px;
    text-align: center;
  }
}
</style>
