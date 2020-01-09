<template>
  <el-dialog center width="600px" title="新增企业" :visible.sync="dialogFormVisible">
    <el-form :model="addForm" :rules="addRules" ref="addForm">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="addForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input type="textarea" rows="2" v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <!-- submitAdd 提交新增 -->
      <el-button type="primary" @click="submitAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入接口
import { enterpriseAdd } from "@/api/enterprise.js";
export default {
  data() {
    return {
      // 是否显示 对话框
      dialogFormVisible: false,
      // 表单的数据
      addForm: {
        eid: "", // 企业编号
        name: "", // 企业名称
        short_name: "", // 企业简称
        intro: "", // 企业简介
        remark: "" // 企业备注
      },
      // 新增的校验规则
      addRules: {
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
    submitAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 调用接口
          // this.addForm 和接口要的数据格式 完全一致，直接写进去即可
          enterpriseAdd(this.addForm).then(res => {
            // window.console.log(res)
            if (res.code === 200) {
              // .then
              // 200 成功
              // 提示用户
              this.$message.success('恭喜你新增成功啦')
              // 关闭对话框
              this.dialogFormVisible=false;
              // 清空数据
              // 通过refs获取到 设置了ref的 饿了么的表单 调用 他的 resetFields 重置表单
              this.$refs.addForm.resetFields()
            } else if (res.code === 201) {
              // 否则 失败
              this.$message.error("企业编号已经存在了，换一个吧");
            }
          });
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
