<template>
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
</template>

<script>
export default {
  data() {
    return {
      // 对话框中 文本的尺寸
      formLabelWidth: "122px",
      // 是否显示对话框
      dialogFormVisible: false,
      // 新增表单
      addForm: {}
    };
  }
};
</script>

<style></style>
