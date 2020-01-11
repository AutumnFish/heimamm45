<template>
  <!-- 新增的对话框 -->
  <el-dialog center width="600px" title="新增用户" :visible.sync="dialogFormVisible">
    <el-form :model="addForm" :rules="addRules" ref="addForm">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="addForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="addForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="addForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth" >
        <el-select class="normal" v-model="addForm.role_id" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" :label-width="formLabelWidth" >
        <el-select class="normal" v-model="addForm.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
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
import { userAdd } from "@/api/user.js";

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
          userAdd(this.addForm).then(res => {
            window.console.log(res);
            if (res.code === 200) {
              this.$message.success("新增成功");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 清空内容
              this.$refs.addForm.resetFields();
              // 调用父组件的 方法 重新获取数据
              this.$parent.getList();
            } else if (res.code === 201) {
              // id重复
              this.$message.warning(res.message);
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
        username: "", // 用户名
        email: "", // 邮箱
        phone: "", // 电话
        role_id: "", // 角色
        status: "", // 状态
        remark: "" // 备注
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
  // created() {
  //   // window.console.log(subjectAdd);
  // }
};
</script>

<style></style>
