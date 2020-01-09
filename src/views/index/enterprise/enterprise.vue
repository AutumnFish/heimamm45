<template>
  <div class="enterprise-container">
    <!-- 头部 header 头部-->
    <el-card class="header-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input class="small" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input class="normal" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="small" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="normal" v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <!-- plus 加 -->
          <el-button type="primary" icon="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体  body 身体-->
    <el-card class="body-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180"> </el-table-column>
        <el-table-column prop="name" label="企业编号" width="180"> </el-table-column>
        <el-table-column prop="address" label="企业名称"> </el-table-column>
        <el-table-column prop="address" label="创建者"> </el-table-column>
        <el-table-column prop="address" label="创建日期"> </el-table-column>
        <el-table-column prop="address" label="状态"> </el-table-column>
        <el-table-column prop="address" label="操作"> </el-table-column>
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
export default {
  name: "enterprise",
  data() {
    return {
      // 顶部 行内表单的数据
      formInline: {},
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
}
</style>
