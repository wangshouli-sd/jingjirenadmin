<template>
  <div class="app-container">
    <h6 class="item-title">客服信息设置</h6>
    <el-form :model="kefuinfo" label-width="100px" class="weixin-ruleForm">
      <el-form-item label="昵称">
        <el-input v-model="kefuinfo.name"/>
      </el-form-item>
      <el-form-item label="手机号" prop="telphone">
        <el-input v-model="kefuinfo.phone"/>
        <!--<p class="el-p">客服手机号</p>-->
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="kefuinfo.qq"/>
        <!--<p class="el-p">qq</p>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlesubmitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getkefu, setkefu } from '@/api/set/kefu.js' // 获取客服参数、设置客服参数
export default {
  data() {
    return {
      kefuinfo: {}
    }
  },
  computed: {
    ...mapState({
    })
  },
  created() {
    this.getparmas()
  },
  methods: {
    getparmas() {
      getkefu().then((res) => {
        this.kefuinfo = res
      })
    },
    handlesubmitForm() {
      this.$confirm('确认提交修改内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setkefu(this.kefuinfo).then((res) => {
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
  .app-container{
    margin: 10px;
    background: white;
    .item-title{
      font-size: 14px;
      /*max-width: 600px;*/
      color: #373737;
      text-align: center;
    }
    .weixin-ruleForm{
      max-width: 660px;
      margin: auto;
      .el-p{
        font-size: 12px;
        color: #898989;
        margin: 0px;
      }
    }
  }

</style>
