<template>
  <div class="subject-container">
    <el-card class="header-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="small" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="small" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="normal" v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubject">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearQuery">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="$refs.addDialog.dialogFormVisible = true" type="primary" icon="el-icon-plus"
            >新增学科</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="main-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180"> </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="学科名称"> </el-table-column>
        <el-table-column prop="short_name" label="简称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <!-- 进入编辑状态 -->
            <el-button @click="enterEdit(scope.row)" type="text">编辑</el-button>
            <!-- scope.row这是一整行的数据 全部传到了 changeStatus这个方法中  -->
            <el-button @click="changeStatus(scope.row)" type="text">{{
              scope.row.status == 0 ? "启用" : "禁用"
            }}</el-button>
            <el-button @click="removeSubject(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
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
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <!-- 使用 新增框组件 -->
    <addDialog ref="addDialog"></addDialog>
    <!-- 使用 编辑框组件 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
// 导入 新增框
import addDialog from "./components/addDialog.vue";
// 导入 编辑框
import editDialog from "./components/editDialog.vue";
// 导入 学科接口
import { subjectList, subjectStatus, subjectRemove } from "@/api/subject.js";
export default {
  name: "subject",
  // 注册组件
  components: {
    addDialog,
    editDialog // addDialog:addDialog
  },
  created() {
    // 获取数据
    this.getList();
  },
  data() {
    return {
      // 行内表单的数据
      formInline: {
        rid: "", // 学科编号
        name: "", // 学科名称
        username: "", // 创建者
        status: "" // 状态
      },
      // 表格的数据
      tableData: [],
      // 默认的页码
      page: 1,
      // 页容量选项,
      pageSizes: [2, 4, 6, 8],
      // 页容量
      size: 2,
      // 总条数
      total: 0
    };
  },
  methods: {
    // 每一页的数据量 改变（页容量）
    handleSizeChange(size) {
      // window.console.log("页容量:" + size);
      // 把页码保存起来
      this.size = size;
      // 会到第一页
      this.page = 1;
      // 通过新的页面去调用数据
      this.getList();
    },
    // 页码
    handleCurrentChange(current) {
      window.console.log("页码:" + current);
      // 把页码保存起来
      this.page = current;
      // 通过新的页面去调用数据
      this.getList();
    },
    // 获取数据的方法
    getList() {
      subjectList({
        // 使用定义好的数据，方便后期维护
        // 页码
        page: this.page,
        // 页容量
        limit: this.size,
        // 将formInline合并进来
        ...this.formInline
      }).then(res => {
        // window.console.log(res)
        // 赋值 数据
        this.tableData = res.data.items;
        // 赋值 总条数
        this.total = res.data.pagination.total;
      });
    },
    // 修改状态
    changeStatus(item) {
      // window.console.log(item)
      // window.console.log(item.id)
      subjectStatus({
        id: item.id
      }).then(res => {
        // window.console.log(res);
        if (res.code == 200) {
          this.$message.success("修改成功");
          // 重新获取数据
          this.getList();
        }
      });
    },
    // 删除数据
    removeSubject(item) {
      // 弹框
      this.$confirm("你真的要把他删掉吗？哭唧唧", "友情提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击确认
          subjectRemove({
            id: item.id
          }).then(res => {
            // window.console.log(res)
            if (res.code === 200) {
              this.$message.success("删除成功了哦");
              this.getList();
            }
          });
        })
        .catch(() => {});
    },
    // 查询数据
    searchSubject() {
      // 传递参数
      this.getList();
    },
    // 清空搜索
    clearQuery() {
      // 清空表单
      this.$refs.formInline.resetFields();
      // 调用接口
      this.getList();
    },
    // 进入编辑状态
    enterEdit(item) {
      // 显示编辑框
      this.$refs.editDialog.dialogFormVisible = true;
      // window.console.log(item)
      // 设置编辑框的数据
      // this.$refs.editDialog.editForm = item;
      this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
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

  // 红色的span
  span.red {
    color: #ff3d3d;
  }
}
</style>
