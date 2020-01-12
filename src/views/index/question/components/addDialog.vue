<template>
  <!-- opened 对话框完全打开之后触发 -->
  <el-dialog @opened="opened" class="question-add" fullscreen title="新增题库测试" :visible.sync="dialogFormVisible">
    <el-form :label-position="position" class="question-form" :model="addForm">
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
      <!-- 分割线 -->
      <el-divider></el-divider>
      <el-form-item label="单选" :label-width="formLabelWidth">
        <el-radio-group v-model="radio">
          <!-- 选项A  option 选项 box 盒子-->
          <div class="option-box">
            <el-radio label="A">A</el-radio>
            <el-input v-model="addForm.select_options[0].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项B  option 选项 box 盒子-->
          <div class="option-box">
            <el-radio label="B">B</el-radio>
            <el-input v-model="addForm.select_options[1].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleBvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项C  option 选项 box 盒子-->
          <div class="option-box">
            <el-radio label="C">C</el-radio>
            <el-input v-model="addForm.select_options[2].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleCvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项D  option 选项 box 盒子-->
          <div class="option-box">
            <el-radio label="D">D</el-radio>
            <el-input v-model="addForm.select_options[3].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleDvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 解析视频 -->
      <el-form-item label="解析视频" :label-width="formLabelWidth">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
        >
          <el-button size="small" type="success">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传视频MP4文件，且不超过2MB</div>
        </el-upload>
        <video class="video" controls autoplay loop v-if="videoUrl" :src="videoUrl"></video>
      </el-form-item>

      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 答案解析 -->
      <el-form-item label="答案解析"> </el-form-item>
      <div class="answer-toolbar"></div>
      <div class="answer-content">
        <p>请在这里输入</p>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <el-form-item label="试题备注" :label-width="formLabelWidth"> </el-form-item>
      <el-input v-model="addForm.xxx" type="textarea" rows="2"></el-input>
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
      formLabelWidth: "120px",
      // 文件的上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/question/upload",
      // 本地预览地址 A
      imageAUrl: "",
      // 本地预览地址 B
      imageBUrl: "",
      // 本地预览地址 C
      imageCUrl: "",
      // 本地预览地址 D
      imageDUrl: "",
      // 视频上传之后的 预览地址
      videoUrl: "",
      // 对其方式
      position:'left',
      // 新增表单
      addForm: {
        // 选项
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ],
        // 视频
        video: ""
      },
      // 选项
      options: regionData,
      // 编辑器 标题
      titleEditor: undefined,
      // 编辑器 答案
      answerEditor: undefined
    };
  },
  methods: {
    opened() {
      if (this.titleEditor == undefined) {
        // 创建编辑器
        // title 标题
        // editor 编辑器
        this.titleEditor = new wangeditor(".title-toolbar", ".title-content");
        // create方法
        this.titleEditor.create();
      }
      if (this.answerEditor == undefined) {
        // 创建编辑器
        // answer 回答，答案
        // editor 编辑器
        this.answerEditor = new wangeditor(".answer-toolbar", ".answer-content");
        // create方法
        this.answerEditor.create();
      }
    },
    // 选项A的 上传组件钩子
    handleAvatarSuccess(res, file) {
      this.imageAUrl = URL.createObjectURL(file.raw);
      //   window.console.log(res);
      this.addForm.select_options[0].image = res.data.url;
    },
    // 选项B的 上传组件钩子
    handleBvatarSuccess(res, file) {
      this.imageBUrl = URL.createObjectURL(file.raw);
      // window.console.log(res);
      this.addForm.select_options[1].image = res.data.url;
    },
    // 选项C的 上传组件钩子
    handleCvatarSuccess(res, file) {
      this.imageCUrl = URL.createObjectURL(file.raw);
      //   window.console.log(res);
      this.addForm.select_options[2].image = res.data.url;
    },
    // 选项D的 上传组件钩子
    handleDvatarSuccess(res, file) {
      this.imageDUrl = URL.createObjectURL(file.raw);
      // window.console.log(res);
      this.addForm.select_options[3].image = res.data.url;
    },
    // 视频 上传组件钩子
    handleVideoSuccess(res, file) {
      // 视频预览地址
      this.videoUrl = URL.createObjectURL(file.raw);
      //   window.console.log(res);
      this.addForm.video = res.data.url;
    },
    // 验证规则
    beforeAvatarUpload(file) {
      //   window.console.log(file)
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 视频的校验规则
    beforeVideoUpload(file) {
      //   window.console.log(file);
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传视频只能是 MP4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.question-container {
  .question-add {
    .el-input {
      width: 364px;
    }
    .question-form {
      width: 832px;
      margin: 0 auto;
    }
    .title-toolbar,
    .answer-toolbar {
      border: 1px solid #cbcbcb;
      border-bottom: none;
    }
    .title-content,
    .answer-content {
      height: 100px;
      border: 1px solid #cbcbcb;
    }
    .w-e-text::-webkit-scrollbar {
      display: none;
    }

    // 上传组件的样式
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .option-box {
      display: flex;
      align-items: center;
      .el-input {
        width: 476px;
        margin-right: 20px;
      }
    }
    .video {
      width: 320px;
    }
  }
}
</style>
