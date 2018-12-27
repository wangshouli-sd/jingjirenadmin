<template>
  <div class="app-container">
    <div class="filter-container">
      <el-tabs v-model="activeName" class="tab-scroll">
        <el-tab-pane label="基础设置" name="first" class="el-tab-pane" style="margin-top: 2px;padding: 20px;">
          <keep-alive>
            <div v-if="activeName==&quot;first&quot;">
              <h6 class="item-title">分销基础设置</h6>
              <el-form ref="form" label-width="180px" class="ruleForm">
                <el-form-item label="分销层级">
                  <el-radio-group v-model="fenxiao.fenxiao" @change="handleChange">
                    <el-radio label="0">不开启</el-radio>
                    <el-radio label="1">一级分销</el-radio>
                    <el-radio label="2">二级分销</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="一级佣金提成">
                  <el-input v-model="fenxiao.one" placeholder="请输入数值"/>
                  <p class="el-p">请输入一级佣金提成比例,输入数值(0-100)(%)</p>
                </el-form-item>
                <el-form-item label="二级佣金提成">
                  <el-input v-model="fenxiao.two" placeholder="请输入数值"/>
                  <p class="el-p">请输入二级佣金提成比例,输入数值(0-100)(%)</p>
                </el-form-item>
                <div style="padding-left: 100px;margin: 20px 0px;">
                  <p class="el-p">*注:修改分销参数，进行中的业务将使用设置后的参数进行佣金比例计算，已完成的业务不受影响</p>
                </div>
                <el-form-item>
                  <el-button type="primary" @click="handleSubmit">保存</el-button>
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
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import setinfo from './components/setinfo'
import waves from '@/directive/waves' // 水波纹指令
import { fenxiaoinfo, setfenxiao } from '@/api/fenxiao/index.js' // 获取参数列表、设置参数
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: {
    setinfo
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return type
    }
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  computed: {
    author() {
      return this.$store.state.agentaudit.author
    },
    ...mapState({
      fenxiao: state => state.fenxiaoindex // 获取分销参数 srore
    })
  },
  created() {
    this.getparmas()
  },
  methods: {
    getparmas() {
      fenxiaoinfo(this).then((res) => {
        this.$store.dispatch('fenxiaoindex/fenxiaoinfo', res)
      })
    },
    // 修改提交
    handleSubmit() {
      this.$confirm('确认修改分销参数设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setfenxiao(this.fenxiao).then((res) => {
          if (res.status.state === 'success') {
            this.getparmas()
            this.$message({
              type: 'success',
              message: '更改成功!'
            })
          }
        })
      }).catch(() => {
      })
    },
    // radio change
    handleChange(value) {
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /*start*/
  .filter-container{
    .el-tab-pane{
      background: white;
      min-height: 300px;
      padding: 20px 50px 50px 50px !important;
      .item-title{
        font-size: 14px;
        /*max-width: 600px;*/
        color: #373737;
        text-align: center;
      }
      .ruleForm{
        max-width: 700px;
        margin: auto;
        .el-p{
          font-size: 12px;
          color: #898989;
          margin: 0px;
        }
      }
    }
  }

</style>
