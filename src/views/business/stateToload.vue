<template>
  <div class="app-container">
    <div class="filter-container">
      <el-tabs v-model="activeName" class="tab-scroll">
        <el-tab-pane label="上传合同" name="first" class="el-tab-pane">
          <keep-alive>
            <div name="first">
              <el-row :gutter="3" style="margin-bottom: 0px">
                <el-col :span="4" style="height: 100%;">
                  <div class="grid-content left-title">
                    业务信息
                  </div>
                </el-col>
                <el-col :span="10">
                  <div class="grid-content">
                    <el-form :model="formDatadetail" label-position="right" label-width="100px" style="padding: 0 30px" >
                      <el-form-item label="业务ID">
                        <div class="input-item">{{ formDatadetail.task_number }}</div>
                      </el-form-item>
                      <el-form-item label="所属项目名称">
                        <div class="input-item">{{ formDatadetail.projectname }}</div>
                      </el-form-item>
                      <el-form-item label="业务联系人">
                        <div class="input-item">{{ formDatadetail.username }}</div>
                      </el-form-item>
                      <el-form-item label="业务联系方式">
                        <div class="input-item">{{ formDatadetail.userphone }}</div>
                      </el-form-item>
                      <el-form-item label="提交时间">
                        <div class="input-item">{{ formDatadetail.create_time }}</div>
                      </el-form-item>
                      <el-form-item label="签约时间">
                        <div class="input-item">{{ formDatadetail.time }}</div>
                      </el-form-item>
                      <el-form-item label="提交备注">
                        <div class="input-item input-item-text">{{ formDatadetail.describe }}</div>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
                <el-col :span="10">
                  <div class="grid-content bg-purple" style="padding:16px 0;">
                    <div class="grid-content-rt" style="border-bottom: 3px solid rgb(239,244,250)">
                      <el-form :model="formDatadetail" label-position="left" label-width="80px" style="padding: 0 30px;max-width: 500px;margin: auto;" size="mini">
                        <el-form-item label="经纪人" style="margin-bottom: 10px">
                          <div class="input-item-rt">{{ formDatadetail.main_name }}</div>
                        </el-form-item>
                        <el-form-item label="联系方式" style="margin-bottom: 10px">
                          <div class="input-item-rt">{{ formDatadetail.main_phone }}</div>
                        </el-form-item>
                        <el-form-item label="预计佣金" style="margin-bottom: 10px">
                          <div class="input-item-rt">{{ formDatadetail.min_vtmoney }} -- {{ formDatadetail.max_vtmoney}}元 </div>
                        </el-form-item>
                        <el-form-item label="累计佣金" style="margin-bottom: 10px">
                          <div class="input-item-rt">{{ formDatadetail.main_allmoney }}元</div>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div class="grid-content-rb" style="padding:0 30px">
                      <el-row>
                        <el-col :span="12">
                          <div class=" bg-purple-dark" style="padding: 0;">
                            <h6>一级分销商</h6>
                            <el-form v-if="!formDatadetail.one_name" :model="formDatadetail" label-position="left" label-width="80px" size="mini" >
                              <el-form-item label="无" style="margin-bottom: 10px">
                              </el-form-item>
                            </el-form>
                            <el-form v-else :model="formDatadetail" label-position="left" label-width="80px" size="mini">
                              <el-form-item label="姓名:" style="margin-bottom: 10px">
                                <div class="input-item-rb">{{ formDatadetail.one_name }}</div>
                              </el-form-item>
                              <el-form-item label="联系方式:" style="margin-bottom: 10px">
                                <div class="input-item-rb">{{ formDatadetail.one_phone }}</div>
                              </el-form-item>
                              <el-form-item label="加入时间:" style="margin-bottom: 10px">
                                <div class="input-item-rb">{{ formDatadetail.one_time }}</div>
                              </el-form-item>
                              <el-form-item label="预计佣金:" style="margin-bottom: 10px">
                                <div class="input-item-rb">￥{{ formDatadetail.one_thismoney }}</div>
                              </el-form-item>
                            </el-form>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="bg-purple-dark" style="padding: 0;">
                            <h6>二级分销商</h6>
                            <el-form v-if="!formDatadetail.two_name" :model="formDatadetail" label-position="left" label-width="80px" size="mini" >
                              <el-form-item label="无" style="margin-bottom: 10px">
                              </el-form-item>
                            </el-form>
                            <el-form v-else :model="formDatadetail" label-position="left" label-width="80px" size="mini">
                              <el-form-item label="姓名:" style="margin-bottom: 10px">
                                <div class="input-item-rb">{{ formDatadetail.two_name }}</div>
                              </el-form-item>
                              <el-form-item label="联系方式:" style="margin-bottom: 10px">
                                <div class="input-item-rb">{{ formDatadetail.two_phone }}</div>
                              </el-form-item>
                              <el-form-item label="加入时间:" style="margin-bottom: 10px">
                                <div class="input-item-rb">{{ formDatadetail.two_time }}</div>
                              </el-form-item>
                              <el-form-item label="预计佣金:" style="margin-bottom: 10px">
                                <div class="input-item-rb">￥{{ formDatadetail.two_thismoney }}</div>
                              </el-form-item>
                            </el-form>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="3" style="padding-top:0px ;border-top:3px solid rgb(239,244,250);margin-bottom: 0px;">
                <el-col :span="4" style="height: 100%;">
                  <div class="grid-content  grid-content-l left-title" style="min-height: 100px">
                    业务签约金额
                  </div>
                </el-col>
                <el-col :span="20" class="grid-content-wrapper">
                  <div class="grid-content grid-content-r" style="min-height: 100px">
                    <el-form label-position="right" label-width="0px" style="padding: 0 30px" >
                      <el-form-item>
                        <el-input
                          v-model="formDatadetail.total_price"
                          placeholder="请输入签约金额"
                          style="width: 300px;margin-top: 10px"/>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="5" style="padding-top:0px ;border-top:3px solid rgb(239,244,250);margin-bottom: 0px;background: white;">
                <el-col :span="4" style="height: 100%;">
                  <div class="grid-content  grid-content-l left-title" style="min-height: 200px">
                    合同上传
                  </div>
                </el-col>
                <el-col :span="20" class="grid-content-wrapper" style="border-left: 3px solid rgb(239,244,250);">
                  <div class="grid-content grid-content-r" style="min-height: 200px">
                    <upload-contract/>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="3" style="background: white;margin-top: 3px;padding: 20px;">
                <el-col :span="24" style="background: white;text-align: right;">
                  <el-button type="primary" @click="handlesubmit">提交</el-button>
                </el-col>
              </el-row>
            </div>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="服务流程设计" name="third" class="el-tab-pane" >
          <keep-alive>
            <div name="third">
              <el-row :gutter="3" style="margin-bottom: 0px;background: white;">
                <el-col :span="5" style="height: 100%;">
                  <div class="grid-content left-title" >
                    流程设置
                  </div>
                </el-col>
                <el-col :span="19">
                  <div class="grid-content grid-content-r grid-content-xm" style="border-left: 2px solid rgba(239, 244, 250, 1);">
                    <set-process/>
                    <el-row :gutter="3" style="background: white;margin-top: 3px;padding: 20px;border-top: 2px solid rgba(239, 244, 250, 1);">
                      <el-col :span="24" style="background: white;text-align: right;">
                        <el-button type="primary" @click="handleProcesssubmit">提交流程</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import waves from '@/directive/waves'
import UploadContract from './components/UploadContract'
import SetProcess from './components/SetProcess'
import { mapState } from 'vuex'
import { getstate1member, setcontract, setstate1process } from '@/api/business/state1after.js' // 获取详情信息、上传合同和签约金额、提交服务流程
export default {
  directives: {
    waves
  },
  components: {
    UploadContract,
    SetProcess
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
      signamount: '',
      activeName: 'first'
    }
  },
  computed: {
    ...mapState({
      processTypeOptions: state => state.projectindex.list, // 分类列表，下拉搜索框选项
      id: state => state.state1after.selectitemID, // 选中项id
      formDatadetail: state => state.state1after.details, // 项目详情
      steps: state => state.state1after.steps, // 流程temp
      uploadcontractID: state => state.state1after.details.contract_id // 合同id arr
    })
  },
  created() {
    this.getinfo()
  },
  methods: {
    getinfo() {
      getstate1member(this.$route.query.id).then((res) => {
        this.$store.dispatch('state1after/getstate1member', res)
      })
    },
    handlesubmit() { // 上传合同
      this.$confirm('是否确认提交合同', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setcontract(this.$route.query.id, this.formDatadetail.total_price, this.uploadcontractID).then((res) => {
          if (res.status.state === 'success') {
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
          }
        })
      }).catch(() => {
      })
    },
    handleProcesssubmit() { // 上传流程
      var steps = this.steps
      var amount = 0
      for (var i = 0; i < steps.length; i++) {
        amount += parseInt(steps[i].price === null ? 0 : steps[i].price)
      }
      if (amount !== 100) {
        this.$message({
          message: '请输入正确的收款比例数值，所有步骤总和为100%',
          type: 'warning'
        })
        return false
      }
      this.$confirm('是否确认提交流程设置, 提交后该业务自动进入服务中状态', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setstate1process(this.$route.query.id, this.steps).then((res) => {
          if (res.status.state === 'success') {
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
            this.$router.go(-1)
          } else if (res.status.state === 'contract') {
            this.$message({
              type: 'warning',
              message: '未上传合同，设置服务流程前请先上传合同并设置签约金额！'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '上传失败，请稍后重试'
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
  .filter-container{
    .el-tab-pane{
      .left-title{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #181818;
        font-size: 14px;
      }
      .grid-content {
        border-radius: 4px;
        vertical-align: center;
        padding: 16px;
        min-height: 500px;
        background: white;
        .input-item{
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          background: rgb(240,240,240);
          color: #7a7a7a;
          padding: 0 20px;
        }
        .input-item-text{
          height: 72px;
        }
        .input-item-rt,.input-item-rb{
          height: 30px;
          line-height: 30px;
          font-size: 13px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          background: rgb(240,240,240);
          color: #7a7a7a;
          padding: 0 20px;
        }
        .input-item-rb{
          background: white;
        }
      }
    }
  }
</style>
