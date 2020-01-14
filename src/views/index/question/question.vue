<template>
  <div class="question-container">
    <!-- 头部 header 头部-->
    <el-card class="header-card">
      <el-form
        ref="formInline"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="学科" prop="status">
          <el-select
            class="normal"
            v-model="formInline.status"
            placeholder="请选择学科"
          >
            <el-option
              v-for="item in subjectList"
              :label="item.short_name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="status">
          <el-select
            class="normal"
            v-model="formInline.status"
            placeholder="请选择阶段"
          >
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="status">
          <el-select
            class="normal"
            v-model="formInline.status"
            placeholder="请选择企业"
          >
            <el-option
              v-for="item in enterpriseList"
              :label="item.short_name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="status">
          <el-select
            class="normal"
            v-model="formInline.status"
            placeholder="请选择题型"
          >
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <br />

        <el-form-item label="难度" prop="status">
          <el-select
            class="normal"
            v-model="formInline.status"
            placeholder="请选择难度"
          >
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="name">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            class="normal"
            v-model="formInline.status"
            placeholder="请选择状态"
          >
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker
            class="normal"
            v-model="value1"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题" prop="name">
          <el-input class="normal title" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item class="control">
          <!-- search 搜索 -->
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item class="control">
          <!-- clear 清除 query查询 -->
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item class="control">
          <!-- plus 加 -->
          <el-button
            @click="$refs.addDialog.dialogFormVisible = true"
            type="primary"
            icon="el-icon-plus"
            >新增试题</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 身体  body 身体-->
    <el-card class="body-card">
      <!-- 表格 -->
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column prop="title" label="题目" width="180">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column prop="subject_name" label="学科.阶段">
          <!-- 
              var obj = {name:"jack",age:18}
              obj['name']  ==>jack
              obj['age']  ==>18
              var question = {1:"初级",2:'中级'}
              question[1]  ==>初级
              question[2]  ==>中级
           -->
          <template slot-scope="scope">
            {{
              scope.row.subject_name +
                '.' +
                { 1: '初级', 2: '中级', 3: '高级' }[scope.row.step]
            }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            {{ { 1: '单选', 2: '多选', 3: '简答' }[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- enter 进入 edit 编辑 -->
            <el-button @click="enterEdit(scope.row)" type="text"
              >编辑</el-button
            >
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
    <!-- 新增对话框 -->
    <addDialog ref="addDialog"></addDialog>
    <!-- 编辑对话框 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
// 导入学科的接口方法
import { subjectList } from '@/api/subject.js';
// 导入企业的接口方法
import { enterpriseList } from '@/api/enterprise.js';
// 导入 新增框
import addDialog from './components/addDialog.vue';
// 导入 编辑框
import editDialog from './components/editDialog.vue';
// 导入 题库 接口
import { questionList } from '@/api/question.js';
export default {
  name: 'question',
  // 注册组件
  components: {
    addDialog,
    editDialog
  },
  data() {
    return {
      formInline: {},
      // 页码
      page: 1,
      // 页容量
      size: 4,
      // 页容量选项
      pageSizes: [2, 4, 6, 8],
      // 总条数
      total: 0,
      // 学科的数据
      subjectList: [],
      // 企业的数据
      enterpriseList: [],
      // 表格的数据
      tableData: [],
      // 日期的数据
      value1:""
    };
  },
  created() {
    // 学科数据
    subjectList().then(res => {
      // window.console.log(res)
      this.subjectList = res.data.items;
    });
    // 企业数据
    enterpriseList().then(res => {
      // window.console.log(res)
      this.enterpriseList = res.data.items;
    });

    // 获取数据
    this.getList();
  },
  methods: {
    // 页容量改变
    sizeChange(size) {
      window.console.log(size);
    },
    // 页码改变
    pageChange(page) {
      window.console.log(page);
    },
    // 获取列表数据
    getList() {
      // 题库数据
      questionList({
        page: this.page,
        limit: this.size
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.items;
      });
    },
    // 进入编辑
    enterEdit(item) {
      // 弹框
      this.$refs.editDialog.dialogFormVisible = true;
      // 把数据 设置给编辑框 避免影响 ，使用深拷贝
      const editForm = JSON.parse(JSON.stringify(item));
      // 转换数据 省市区
      editForm.city = editForm.city.split(',');
      // 转化数据 多选的选项
      editForm.multiple_select_answer = editForm.multiple_select_answer.split(
        ','
      );
      // 排序  数字，字母 默认就可以排序
      editForm.multiple_select_answer.sort();
      // 把处理好的数据 赋值给 编辑框
      this.$refs.editDialog.editForm = editForm;
      // 新的选项数组
      const options = [];
      // 循环 把 A B C D 的顺序 调整为 正确的
      editForm.select_options.forEach(v => {
        if (v.label == 'A') {
          options[0] = v;
        } else if (v.label == 'B') {
          options[1] = v;
        } else if (v.label == 'C') {
          options[2] = v;
        } else {
          options[3] = v;
        }
      });
      editForm.select_options = options;

      // 挨个的设置 图片 视频地址
      if (editForm.select_options[0].image != '') {
        this.$refs.editDialog.imageAUrl =
          process.env.VUE_APP_BASEURL + '/' + editForm.select_options[0].image;
      }
      if (editForm.select_options[1].image != '') {
        this.$refs.editDialog.imageBUrl =
          process.env.VUE_APP_BASEURL + '/' + editForm.select_options[1].image;
      }
      if (editForm.select_options[2].image != '') {
        this.$refs.editDialog.imageCUrl =
          process.env.VUE_APP_BASEURL + '/' + editForm.select_options[2].image;
      }
      if (editForm.select_options[3].image != '') {
        this.$refs.editDialog.imageDUrl =
          process.env.VUE_APP_BASEURL + '/' + editForm.select_options[3].image;
      }
      if (editForm.video != '') {
        this.$refs.editDialog.videoUrl =
          process.env.VUE_APP_BASEURL + '/' + editForm.video;
      }
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
  .title {
    width: 388px;
  }
  .body-card {
    margin-top: 30px;
  }
  .my-pagination {
    margin-top: 20px;
    text-align: center;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
  }
}
</style>
