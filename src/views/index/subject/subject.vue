<template>
  <div class="subject-container">
    <el-card class="header-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="small" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
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
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = true" type="primary" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="main-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180"> </el-table-column>
        <el-table-column prop="name" label="学科编号" width="180"> </el-table-column>
        <el-table-column prop="address" label="学科名称"> </el-table-column>
        <el-table-column prop="address" label="简称"> </el-table-column>
        <el-table-column prop="address" label="创建者"> </el-table-column>
        <el-table-column prop="address" label="创建日期"> </el-table-column>
        <el-table-column prop="address" label="状态"> </el-table-column>
        <el-table-column prop="address" label="操作"> </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="my-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        background
      >
      </el-pagination>
    </el-card>

    <!-- 新增的对话框 -->
    <el-dialog center width="600px" title="新增学科" :visible.sync="dialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="学科编号" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "subject",
  data() {
    return {
      // 行内表单的数据
      formInline: {},
      tableData: [],
      // 默认的页码
      page: 1,
      // 页容量选项,
      pageSizes: [5, 10, 15, 20],
      // 页容量
      size: 5,
      // 对话框中 文本的尺寸
      formLabelWidth: "122px",
      // 是否显示对话框
      dialogFormVisible: false,
      // 新增表单
      addForm: {}
    };
  },
  methods: {
    // 每一页的数据量 改变（页容量）
    handleSizeChange(size) {
      window.console.log("页容量:" + size);
    },
    // 页码
    handleCurrentChange(current) {
      window.console.log("页码:" + current);
    }
  }
};
</script>

<style lang="less">
.subject-container {
  .small {
    width: 100px;
  }
  .normal {
    width: 150px;
  }
  .main-card {
    margin-top: 20px;
  }
  .my-pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
