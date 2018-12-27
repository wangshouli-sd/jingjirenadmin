<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-aside width="200px">用户协议</el-aside>
        <el-container>
          <el-main>
            <tinymce :height="460" v-model="content" class="tinycetext"/>
          </el-main>
          <el-footer>
            <el-button type="primary" @click="handleUpload">提交</el-button>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getagreement, setagreement } from '@/api/set/index' // 初始化获取图片，上传用户协议
import Tinymce from '@/components/Tinymce'
export default {
  name: 'ComplexTable',
  components: {
    Tinymce
  },
  filters: {
  },
  data() {
    return {
      content: '<p>用户协议</p>'
    }
  },
  computed: {
    ...mapState({
      // addagreement: state => state.setindex.addagreement // 获取
    })
  },
  created() {
    this.getparmas()
  },
  methods: {
    // 获取已设置的图片
    getparmas() {
      getagreement().then((res) => {
        this.content = res.xieyi
      })
    },
    // 提交
    handleUpload() {
      let that= this
      this.$confirm('确认提交修改内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setagreement(that.content).then((res) => {
          if (res.status.state === 'success') {
            that.getparmas()
            that.$message({
              type: 'success',
              message: '设置成功!'
            })
          }
        }).catch(() => {
          that.$message({
            type: 'danger',
            message: '设置失败，请稍后重试'
          })
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-aside{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    vertical-align: center;
    padding: 16px;
    background: white;
    font-size: 14px;
    margin-right: 3px;
  }
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    padding: 10px;
    .tinycetext{
      width: 100%;
    }
  }
  .el-footer {
    background: #ffffff;
    text-align: right;
    margin-top: 3px;
    /*padding: 20px;*/
  }
  .el-footer button{
    margin-top: 10px;
  }
</style>
