<template>
  <div class="enterprise-container">
    <!-- 头部 header 头部-->
    <el-card class="header-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="small" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="small" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="normal" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- search 搜索 -->
          <el-button @click="searchEnterprise" type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <!-- clear 清除 query查询 -->
          <el-button @click="clearQuery">清除</el-button>
        </el-form-item>
        <el-form-item>
          <!-- plus 加 -->
          <el-button @click="$refs.addDialog.dialogFormVisible = true" type="primary" icon="el-icon-plus"
            >新增企业</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体  body 身体-->
    <el-card class="body-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180"> </el-table-column>
        <el-table-column prop="eid" label="企业编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="企业名称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <!-- 如果行内的数据显示 是自定义的 那么 prop可以移除 -->
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span class="red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">{{ scope.row.status == 1 ? "禁用" : "启用" }}</el-button>
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
    <!-- 新增框 -->
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>

<script>
// 导入 新增对话框
import addDialog from "./components/addDialog.vue";
// 导入接口
import { enterpriseList } from "@/api/enterprise.js";
export default {
  name: "enterprise",
  // 注册组件
  components: {
    addDialog
  },
  // 生命周期钩子
  created() {
    // 初始数据获取
    this.getList();
  },
  data() {
    return {
      // 顶部 行内表单的数据
      formInline: {
        // 企业编号
        eid: "",
        // 企业名称
        name: "",
        // 创建者
        username: "",
        // 状态
        status: ""
      },
      // 表格的数据
      tableData: [],
      // 分页器用到的 数据
      page: 1, // 当前页码
      pageSizes: [2, 4, 6, 8], // 页容量的选项
      size: 2, // 当前的页容量
      total: 0 // 总条数
    };
  },
  methods: {
    // 页容量改变
    // newSize 新的页容量
    sizeChange(newSize) {
      window.console.log(newSize);
    },
    // 页码改变
    // newPage 新的页码
    pageChange(newPage) {
      window.console.log(newPage);
    },
    // 抽取 获取企业列表的方法
    getList() {
      enterpriseList({
        // 页码
        page: this.page,
        // 页容量
        limit: this.size,
        // 展开运算符，相当于 把formInline的属性
        // c+v到这里
        ...this.formInline
      }).then(res => {
        // window.console.log(res)
        // 设置table的数据
        this.tableData = res.data.items;
        // 保存 总条数
        this.total = res.data.pagination.total;
      });
    },
    // 查询企业
    searchEnterprise() {
      // 调用接口
      this.getList();
    },
    // 清空查询
    clearQuery() {
      // 清空表单
      this.$refs.formInline.resetFields();
      // 调用接口
      this.getList();
    }
  }
};
</script>

<style lang="less">
/* 
  enterprise 企业
  container 容器
 */
.enterprise-container {
  .small {
    width: 100px;
  }
  .normal {
    width: 150px;
  }
  .body-card {
    margin-top: 20px;
  }
  .my-pagination {
    margin-top: 30px;
    text-align: center;
  }
  span.red {
    color: #ff4949;
  }
}
</style>
