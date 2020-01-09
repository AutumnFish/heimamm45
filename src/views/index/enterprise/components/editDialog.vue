<template>
  <el-dialog center width="600px" title="编辑企业" :visible.sync="dialogFormVisible">
    <el-form :model="editForm" :rules="editRules" ref="editForm">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="editForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input type="textarea" rows="2" v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <!-- submitAdd 提交新增 -->
      <el-button type="primary" @click="submitEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入接口
import { enterpriseEdit } from "@/api/enterprise.js";
export default {
  data() {
    return {
      // 是否显示 对话框
      dialogFormVisible: false,
      // 表单的数据
      editForm: {
        eid: "", // 企业编号
        name: "", // 企业名称
        short_name: "", // 企业简称
        intro: "", // 企业简介
        remark: "" // 企业备注
      },
      // 新增的校验规则
      editRules: {
        // 企业编号
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        // 企业名称
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }],
        // 企业简称
        short_name: [{ required: true, message: "企业简称不能为空", trigger: "blur" }],
        // 企业简介
        intro: [{ required: true, message: "企业简介不能为空", trigger: "blur" }]
      },
      // 文本的宽度
      formLabelWidth: "120px"
    };
  },
  methods: {
    submitEdit() {
      // 页面上面的 ref  和这里 点的 需要对应
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 验证通过
          enterpriseEdit(this.editForm).then(res=>{
            // window.console.log(res);
            if(res.code===201){
              this.$message.warning("企业编号不能重复，请检查");
            }else if(res.code===200){
              // 成功了
              this.dialogFormVisible = false;
              // 调用 父组件的 数据获取方法
              this.$parent.getList()
            }
          })
        } else {
          this.$message.warning("格式不太对哦，检查一下");
          return false;
        }
      });
    }
  }
};
</script>

<style></style>
