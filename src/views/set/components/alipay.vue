<template>
  <el-form :model="alipay" :rules="rules" label-width="100px" class="weixin-ruleForm">
    <el-form-item label="APPID" prop="appid">
      <el-input v-model="alipay.appid"/>
      <p class="el-p">开放平台应用的id</p>
    </el-form-item>
    <el-form-item label="验签方式" prop="singtype">
      <el-radio-group v-model="alipay.singtype">
        <el-radio label="RSA"/>
        <el-radio label="RSA2"/>
      </el-radio-group>
      <p class="el-p">请选择正确的验证签名方式，否则支付宝支付不起作用(建议使用RSA2)</p>
    </el-form-item>
    <el-form-item label="支付宝公钥" prop="public">
      <el-input v-model="alipay.public" type="textarea" autosize/>
      <p class="el-p">一行且不能有空格</p>
    </el-form-item>
    <el-form-item label="应用私钥" prop="private">
      <el-input v-model="alipay.private" type="textarea" autosize/>
      <p class="el-p">一行且不能有空格</p>
    </el-form-item>
    <el-form-item label="付款方名字">
      <el-input v-model="alipay.showname" type="textarea" autosize/>
      <p class="el-p">输入付款方名字，可用公司名，不填写默认转账支付宝账号</p>
    </el-form-item>
    <el-form-item label="转账备注">
      <el-input v-model="alipay.remark" type="textarea" autosize/>
      <p class="el-p">付款备注(理由)</p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handlesubmitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getalipay, setalipay } from '@/api/set/ali.js'
export default {
  data() {
    return {
      rules: {
        appid: [
          { required: true, message: '请输入开放平台应用的APPID', trigger: 'blur' }
        ],
        singtype: [
          { required: true, message: '请选择签约方式', trigger: 'change' }
        ],
        private: [
          { required: true, message: '请输入应用私钥', trigger: 'blur' }
        ],
        public: [
          { required: true, message: '请输入支付宝公钥', trigger: 'blur' }
        ]
      },
      alipay: {}
    }
  },
  created() {
    this.getparmas()
  },
  methods: {
    getparmas() {
      getalipay().then((res) => {
        this.alipay = res
      })
    },
    handlesubmitForm() {
      this.$confirm('确认提交更改支付宝打款参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setalipay(this.alipay).then((res) => {
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
