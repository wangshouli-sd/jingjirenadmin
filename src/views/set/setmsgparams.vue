<template>
  <div class="app-container">
    <div class="filter-container">
      <el-tabs v-model="activeName" class="tab-scroll">
        <el-tab-pane label="短信参数" name="first" class="el-tab-pane" style="margin-top: 2px;padding: 20px;">
          <keep-alive>
            <div v-if="activeName==&quot;first&quot;">
              <h6 class="item-title">短信参数设置</h6>
              <el-form label-width="180px" class="ruleForm">
                <el-form-item label="AccessKey" prop="keyid">
                  <el-input v-model="alisms.keyid"/>
                  <p class="el-p">AccessKey是访问阿里云API的密钥</p>
                </el-form-item>
                <el-form-item label="AccessKeySecret" prop="secret">
                  <el-input v-model="alisms.secret"/>
                  <p class="el-p">AccessKeySecret</p>
                </el-form-item>
                <el-form-item label="短信签名" prop="singname">
                  <el-input v-model="alisms.singname "/>
                  <p class="el-p">短信签名</p>
                </el-form-item>
                <el-form-item label="短信模板编号" prop="templateid">
                  <el-input v-model="alisms.templateid"/>
                  <p class="el-p">短信模板编号</p>
                </el-form-item>
                <el-form-item label="模板变量名" prop="code">
                  <el-input v-model="alisms.code"/>
                  <p class="el-p">模板变量模板变量名，选择的模板只能有一个变量，且为验证码变量</p>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handlesubmitForm">保存</el-button>
                  <!--<el-button>取消</el-button>-->
                </el-form-item>
              </el-form>
            </div>
          </keep-alive>
        </el-tab-pane>

        <el-tab-pane label="消息模板" name="second" class="el-tab-pane" >
          <keep-alive>
            <div v-if="activeName==&quot;second&quot;">
              <h6 class="item-title">模板消息参数</h6>
              <el-form label-width="180px" class="ruleForm">
                <el-form-item label="消息模板ID">
                  <el-input v-model="msgtemp.id"/>
                  <p class="el-p">微信公众平台-小程序-功能-模板消息，模板库中选择ID为AT0365的消息模板，设置好配置关键词提交，到个人模板库中复制模板ID提交到这个表单</p>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handlesubmitmsg">提交</el-button>
                  <!--<el-button>取消</el-button>-->
                </el-form-item>
              </el-form>
            </div>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getalisms, setalisms } from '@/api/set/ali.js'
import { getmsgtemp, setmsgtemp } from '@/api/set/index.js'
export default {
  data() {
    return {
      activeName: 'first',
      rules: {
        keyid: [
          { required: true, message: '请输入访问阿里云API的密钥', trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请输入AccessKeySecret', trigger: 'blur' }
        ],
        singname: [
          { required: true, message: '请输入短信签名', trigger: 'blur' }
        ],
        templateid: [
          { required: true, message: '请输入短信模板编号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入模板变量名', trigger: 'blur' }
        ]
      },
      alisms: {},
      msgtemp: {
        id: '12'
      }
    }
  },
  created() {
    this.getparmas()
    // this.getmsgparmas()
  },
  methods: {
    // 短信参数
    getparmas() {
      getalisms(this).then((res) => {
        this.alisms = res
      })
    },
    // 模板消息参数
    getmsgparmas() {
      getmsgtemp(this).then((res) => {
        this.msgtemp.id = res.id
      })
    },
    handlesubmitForm() {
      this.$confirm('确认提交更改短信验证参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setalisms(this.alisms).then((res) => {
          if (res.status.state === 'success') {
            this.getparmas()
            this.$message({
              type: 'success',
              message: '设置成功!'
            })
          }
        })
      }).catch(() => {
      })
    },
    handlesubmitmsg() {
      this.$confirm('确认提交模板消息设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setmsgtemp(this.msgtemp).then((res) => {
          if (res.status.state === 'success') {
            this.getmsgparmas()
            this.$message({
              type: 'success',
              message: '设置成功!'
            })
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /*start*/
  .filter-container {
    .el-tab-pane {
      background: white;
      min-height: 300px;
      padding: 20px 50px 50px 50px !important;
      .item-title {
        font-size: 14px;
        /*max-width: 600px;*/
        color: #373737;
        text-align: center;
      }
      .ruleForm {
        max-width: 700px;
        margin: auto;
        .el-p {
          font-size: 12px;
          color: #898989;
          margin: 0px;
        }
      }
    }
  }
</style>
