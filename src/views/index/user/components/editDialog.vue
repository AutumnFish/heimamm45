<template>
  <!-- 编辑的对话框 -->
  <el-dialog center width="600px" title="编辑用户" :visible.sync="dialogFormVisible">
    <el-form :model="editForm" :rules="editRules" ref="editForm">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="editForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="editForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
        <el-select class="normal" v-model="editForm.role_id" placeholder="请选择角色">
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
        <el-select class="normal" v-model="editForm.status" placeholder="请选择状态">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { subjectAdd } from "../../../../api/subject.js";
// @等同于 /src
import { userEdit } from "@/api/user.js";
// 导入 验证的方法
import { validatePhone, validateEmail } from "@/utils/validator.js";

export default {
  methods: {
    submitEdit() {
      // 表单校验
      // 登录点击事件
      // 等同于 this.$refs.ruleForm
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // this.$message.success("验证成功");
          // 调用接口
          userEdit(this.editForm).then(res => {
            // window.console.log(res);
            if (res.code === 200) {
              this.$message.success("编辑成功");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 重新获取数据
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
      // 编辑表单
      editForm: {
        username: "", // 用户名
        email: "", // 邮箱
        phone: "", // 电话
        role_id: "", // 角色
        status: "", // 状态
        remark: "" // 备注
      },
      // 表单的验证规则
      editRules: {
        username: [
          {
            required: true,
            message: "用户名，不能为空",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            validator: validateEmail,
            trigger: "change"
          }
        ],
        phone: [
          {
            required: true,
            validator: validatePhone,
            trigger: "change"
          }
        ],
        role_id: [
          {
            required: true,
            message: "用户角色，不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    // window.console.log(subjectAdd);
  }
};
</script>

<style></style>
