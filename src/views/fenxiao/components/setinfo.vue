<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="weixin-ruleForm">
    <el-form-item label="海报名称" prop="appid">
      <el-input v-model="ruleForm.appid"/>
    </el-form-item>
    <el-form-item label="海报类型" prop="typesigning">
      <el-radio-group v-model="ruleForm.typesigning">
        <el-radio label="商城海报"/>
        <el-radio label="商城海报1"/>
        <el-radio label="商城海报2"/>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="回复关键词" prop="appid">
      <el-input v-model="ruleForm.appid"/>
    </el-form-item>
    <el-form-item label="是否默认" prop="typesigning">
      <el-radio-group v-model="ruleForm.typesigning">
        <el-radio label="是"/>
        <el-radio label="否"/>
      </el-radio-group>
      <p class="el-p">是否是海报类型的默认设置</p>
    </el-form-item>
    <el-form-item label="生成海报文字" prop="secretkey">
      <el-input v-model="ruleForm.secretkey" type="textarea" autosize/>
      <p class="el-p"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        appid: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        typesigning: '',
        typevalidation: '',
        secretkey: '',
        publickey: ''
      },
      rules: {
        appid: [
          { required: true, message: '请输入开放平台应用的APPID', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        typesigning: [
          { required: true, message: '请选择签约方式', trigger: 'change' }
        ],
        typevalidation: [
          { required: true, message: '请选择验签方式', trigger: 'change' }
        ],
        secretkey: [
          { required: true, message: '请输入应用私钥', trigger: 'blur' }
        ],
        publickey: [
          { required: true, message: '请输入支付宝公钥', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
  .weixin-ruleForm{
    max-width: 660px;
    margin: auto;
    .el-p{
      font-size: 12px;
      color: #898989;
      margin: 0px;
    }
  }
</style>
