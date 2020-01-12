<template>
  <!-- opened 对话框完全打开之后触发 -->
  <el-dialog
    @opened="opened"
    class="question-add"
    fullscreen
    title="新增题库测试"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :rules="addRules"
      :label-position="position"
      class="question-form"
      :model="addForm"
      ref="addForm"
    >
      <!-- 学科  -->
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <el-select v-model="addForm.subject" placeholder="请选择学科">
          <!-- 通过父组件 获取数据 -->
          <el-option
            v-for="item in $parent.subjectList"
            :label="item.short_name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 阶段 -->
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="addForm.step" placeholder="请选择活动区域">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <!-- 企业 -->
      <el-form-item
        label="企业"
        prop="enterprise"
        :label-width="formLabelWidth"
      >
        <el-select v-model="addForm.enterprise" placeholder="请选择学科">
          <!-- 通过父组件 获取数据 -->
          <el-option
            v-for="item in $parent.enterpriseList"
            :label="item.short_name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 城市 -->
      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <el-cascader
          v-model="addForm.city"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
      <!-- 题型 -->
      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="addForm.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 难度 -->
      <el-form-item
        label="难度"
        prop="difficulty"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="addForm.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 试题标题 -->
      <el-form-item label="试题标题" prop="title"></el-form-item>
      <div class="title-toolbar"></div>
      <div class="title-content">
        <p>请在这里输入</p>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 单选区域 -->
      <el-form-item
        label="单选"
        prop="single_select_answer"
        :label-width="formLabelWidth"
        v-if="addForm.type === 1"
      >
        <!-- 单选框组 -->
        <el-radio-group v-model="addForm.single_select_answer">
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
      <!-- 多选区域 -->
      <el-form-item
        label="多选"
        prop="multiple_select_answer"
        :label-width="formLabelWidth"
        v-else-if="addForm.type === 2"
      >
        <!-- 多选框组 -->
        <el-checkbox-group v-model="addForm.multiple_select_answer">
          <!-- 选项A  option 选项 box 盒子-->
          <div class="option-box">
            <el-checkbox label="A">A</el-checkbox>
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
            <el-checkbox label="B">B</el-checkbox>
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
            <el-checkbox label="C">C</el-checkbox>
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
            <el-checkbox label="D">D</el-checkbox>
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
        </el-checkbox-group>
      </el-form-item>
      <!-- 简答区域 -->
      <el-form-item
        label="简答"
        prop="short_answer"
        :label-width="formLabelWidth"
        v-else
      >
        <el-input
          type="textarea"
          rows="2"
          v-model="addForm.short_answer"
        ></el-input>
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
          :show-file-list="false"
        >
          <el-button size="small" type="success">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传视频MP4文件，且不超过2MB
          </div>
        </el-upload>
        <video
          class="video"
          controls
          autoplay
          loop
          v-if="videoUrl"
          :src="videoUrl"
        ></video>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 答案解析 -->
      <el-form-item label="答案解析" prop="answer_analyze"> </el-form-item>
      <div class="answer-toolbar"></div>
      <div class="answer-content">
        <p>请在这里输入</p>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <el-form-item
        label="试题备注"
        prop="remark"
        :label-width="formLabelWidth"
      >
      </el-form-item>
      <el-input v-model="addForm.remark" type="textarea" rows="2"></el-input>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入 省市区数据
import { regionData } from 'element-china-area-data';
// 导入 富文本编辑器的 构造函数
import wangeditor from 'wangeditor';
// 导入 题库的 接口
import { questionAdd } from '@/api/question.js';
export default {
  name: 'addDialog',
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      //   文本宽度
      formLabelWidth: '120px',
      // 文件的上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + '/question/upload',
      // 本地预览地址 A
      imageAUrl: '',
      // 本地预览地址 B
      imageBUrl: '',
      // 本地预览地址 C
      imageCUrl: '',
      // 本地预览地址 D
      imageDUrl: '',
      // 视频上传之后的 预览地址
      videoUrl: '',
      // 对其方式
      position: 'left',
      // 新增表单
      addForm: {
        // 选项
        select_options: [
          {
            label: 'A',
            text: '狗不理',
            image: 'upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg'
          },
          {
            label: 'B',
            text: '猫不理',
            image: 'upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg'
          },
          {
            label: 'C',
            text: '麻花',
            image: 'upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg'
          },
          {
            label: 'D',
            text: '炸酱面',
            image: 'upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg'
          }
        ],
        // 多选的 答案
        multiple_select_answer: [],
        // 简答 的 答案
        short_answer: '',
        // 视频
        video: '',
        // 学科
        subject: '',
        // 阶段
        step: '',
        // 企业
        enterprise: '',
        // 城市
        city: '',
        // 题型
        type: '',
        // 难度
        difficulty: '',
        // 标题
        title: '',
        // 单选答案
        single_select_answer: '',
        // 答案解析
        answer_analyze: '',
        // 备注
        remark: ''
      },
      // 表单验证
      addRules: {
        // 学科
        subject: [
          { required: true, message: '学科不能为空', trigger: 'change' }
        ],
        // 简答
        short_answer: [
          { required: true, message: '简答题的答案不能为空', trigger: 'change' }
        ],
        // 多选的答案
        multiple_select_answer: [
          { required: true, message: '多选答案不能为空', trigger: 'change' }
        ],
        // 阶段
        step: [{ required: true, message: '阶段不能为空', trigger: 'change' }],
        // 企业
        enterprise: [
          { required: true, message: '企业不能为空', trigger: 'change' }
        ],
        // 城市
        city: [{ required: true, message: '城市不能为空', trigger: 'change' }],
        // 题型
        type: [{ required: true, message: '题型不能为空', trigger: 'change' }],
        // 难度
        difficulty: [
          { required: true, message: '难度不能为空', trigger: 'change' }
        ],
        // 标题
        title: [{ required: true, message: '标题不能为空', trigger: 'change' }],
        // 单选答案
        single_select_answer: [
          { required: true, message: '单选答案不能为空', trigger: 'change' }
        ],
        // 答案解析
        answer_analyze: [
          { required: true, message: '答案解析不能为空', trigger: 'change' }
        ],
        // 备注
        remark: [{ required: true, message: '备注不能为空', trigger: 'change' }]
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
        this.titleEditor = new wangeditor('.title-toolbar', '.title-content');
        // 注册 change事件
        // 创建的时候 把this 绑定 为 上一级的this
        this.titleEditor.customConfig.onchange = html => {
          // window.console.log(html);
          this.addForm.title = html;
        };
        // create方法
        this.titleEditor.create();
      }
      if (this.answerEditor == undefined) {
        // 创建编辑器
        // answer 回答，答案
        // editor 编辑器
        this.answerEditor = new wangeditor(
          '.answer-toolbar',
          '.answer-content'
        );
        // 注册 change事件
        // 创建的时候 把this 绑定 为 上一级的this
        this.answerEditor.customConfig.onchange = html => {
          // window.console.log(html);
          this.addForm.answer_analyze = html;
        };
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
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 视频的校验规则
    beforeVideoUpload(file) {
      //   window.console.log(file);
      const isJPG = file.type === 'video/mp4';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传视频只能是 MP4 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 提交表单
    submitForm() {
      // window.console.log(questionAdd)

      // this.answerEditor.txt.clear()
      // this.answerEditor.txt.clear()
      this.$refs.addForm.validate(valid => {
        if (valid) {
          questionAdd(this.addForm).then(res => {
            // window.console.log(res)
            if (res.code === 200) {
              this.$message.success('新增成功啦！');
              this.dialogFormVisible = false;
              // 清空表单
              this.$refs.addForm.resetFields();
              // 选项 去掉
              this.addForm.select_options.forEach(v => {
                // window.console.log(v);
                v.text = '';
                v.image = '';
              });

              this.titleEditor.txt.html('<p>请输入内容</p>');
              this.answerEditor.txt.html('<p>请输入内容</p>');
              this.videoUrl = '';
              this.imageAUrl = '';
              this.imageBUrl = '';
              this.imageCUrl = '';
              this.imageDUrl = '';
            }
          });
        } else {
          this.$message.error('格式不太对哦，检查一下');
          return false;
        }
      });
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
