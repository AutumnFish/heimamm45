<template>
  <!-- 新增的对话框 -->
  <el-dialog center width="600px" title="新增学科" :visible.sync="dialogFormVisible">
    <el-form :model="addForm" :rules="addRules" ref="addForm">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
        <el-input type="textarea" :rows="2" v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { subjectAdd } from "../../../../api/subject.js";
// @等同于 /src
import { subjectAdd } from "@/api/subject.js";

export default {
  methods: {
    submitAdd() {
      // 表单校验
      // 登录点击事件
      // 等同于 this.$refs.ruleForm
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // this.$message.success("验证成功");
          // 调用接口
          subjectAdd(this.addForm).then(res => {
            // window.console.log(res);
            if(res.code===200){
              this.$message.success("新增成功");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 清空内容
              this.$refs.addForm.resetFields();

            }else if(res.code===201){
              // id重复
              this.$message.warning('学科的编号不能重复哦！！！');
            }
          });
        } else {
          this.$message.error("格式不对哦，检查一下呗！");
          return false;
        }
      });
    }
  },
  data() {
    return {
      // 对话框中 文本的尺寸
      formLabelWidth: "122px",
      // 是否显示对话框
      dialogFormVisible: false,
      // 新增表单
      addForm: {
        rid: "", // 学科编号
        name: "", // 学科名称
        short_name: "", // 学科简称
        intro: "", // 学科简介
        remark: "" // 学科备注
      },
      // 表单的验证规则
      addRules: {
        rid: [
          {
            required: true,
            message: "学科编号，不能为空",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "学科名称，不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    window.console.log(subjectAdd);
  }
};
</script>

<style></style>
