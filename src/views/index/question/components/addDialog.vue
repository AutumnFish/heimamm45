<template>
  <!-- opened 对话框完全打开之后触发 -->
  <el-dialog @opened="opened" class="question-add" fullscreen title="新增题库测试" :visible.sync="dialogFormVisible">
    <el-form class="question-form" :model="addForm">
      <el-form-item label="学科" :label-width="formLabelWidth">
        <el-select v-model="addForm.status" placeholder="请选择学科">
          <!-- 通过父组件 获取数据 -->
          <el-option
            v-for="item in $parent.subjectList"
            :label="item.short_name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" :label-width="formLabelWidth">
        <el-select v-model="addForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" :label-width="formLabelWidth">
        <el-select v-model="addForm.status" placeholder="请选择学科">
          <!-- 通过父组件 获取数据 -->
          <el-option
            v-for="item in $parent.enterpriseList"
            :label="item.short_name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <el-cascader v-model="addForm.city" :options="options" :props="{ expandTrigger: 'hover' }"></el-cascader>
      </el-form-item>
      <!-- 题型 -->
      <el-form-item label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="radio">
          <el-radio :label="3">单选</el-radio>
          <el-radio :label="6">多选</el-radio>
          <el-radio :label="9">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 难度 -->
      <el-form-item label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="radio">
          <el-radio :label="3">简单</el-radio>
          <el-radio :label="6">一般</el-radio>
          <el-radio :label="9">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 试题标题 -->
      <el-form-item label="试题标题"> </el-form-item>
      <div class="title-toolbar"></div>
      <div class="title-content">
        <p>请在这里输入</p>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入 省市区数据
import { regionData } from "element-china-area-data";
// 导入 富文本编辑器的 构造函数
import wangeditor from "wangeditor";
export default {
  name: "addDialog",
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      //   文本宽度
      formLabelWidth: "60px",
      // 新增表单
      addForm: {},
      // 选项
      options: regionData
    };
  },
  methods: {
    opened() {
      // 创建编辑器
      // title 标题
      // editor 编辑器
      const titleEditor = new wangeditor(".title-toolbar", ".title-content");
      // create方法
      titleEditor.create();
    }
  }
};
</script>

<style lang="less">
.question-add {
  .el-input {
    width: 364px;
  }
  .question-form {
    width: 832px;
    margin: 0 auto;
  }
  .title-toolbar {
    border: 1px solid #cbcbcb;
    border-bottom: none;
  }
  .title-content {
    height: 100px;
    border: 1px solid #cbcbcb;
  }
  .w-e-text::-webkit-scrollbar {
    display: none;
  }
}
</style>
