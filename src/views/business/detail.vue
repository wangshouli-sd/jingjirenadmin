<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="3">
        <el-col :span="4" style="height: 100%;">
          <div class="grid-content bg-purple left-title" style="">
            业务信息
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form label-position="right" label-width="100px"
                     style="padding: 0 30px">
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
              <el-form-item label="签单总额">
                <div class="input-item">{{ formDatadetail.total_price }}</div>
              </el-form-item>
              <el-form-item label="佣金比例">
                <div class="input-item">{{ formDatadetail.back_percent }}%</div>
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
              <el-form label-position="left" label-width="80px"
                       style="padding: 0 30px;max-width: 500px;margin: auto;" size="mini">
                <el-form-item label="经纪人" style="margin-bottom: 10px">
                  <div class="input-item-rt">{{ formDatadetail.main_name }}</div>
                </el-form-item>
                <el-form-item label="联系方式" style="margin-bottom: 10px">
                  <div class="input-item-rt">{{ formDatadetail.main_phone }}</div>
                </el-form-item>
                <el-form-item label="发放佣金" style="margin-bottom: 10px">
                  <div class="input-item-rt">{{ formDatadetail.main_thismoney }} 元
                  </div>
                </el-form-item>
                <el-form-item label="累计佣金" style="margin-bottom: 10px">
                  <div class="input-item-rt">{{ formDatadetail.main_allmoney }}元</div>
                </el-form-item>
              </el-form>
            </div>
            <div class="grid-content-rb" style="padding:0 30px">
              <el-row>
                <el-col :span="12">
                  <div class=" bg-purple-dark" style="padding: 0 16px">
                    <h6>一级分销商</h6>
                    <el-form v-if="!formDatadetail.one_name" :model="formDatadetail"
                             label-position="left" label-width="80px" size="mini">
                      <el-form-item label="无" style="margin-bottom: 10px">
                      </el-form-item>
                    </el-form>
                    <el-form v-else :model="formDatadetail" label-position="left" label-width="80px"
                             size="mini">
                      <el-form-item label="姓名:" style="margin-bottom: 10px">
                        <div class="input-item-rb">{{ formDatadetail.one_name }}</div>
                      </el-form-item>
                      <el-form-item label="联系方式:" style="margin-bottom: 10px">
                        <div class="input-item-rb">{{ formDatadetail.one_phone }}</div>
                      </el-form-item>
                      <el-form-item label="加入时间:" style="margin-bottom: 10px">
                        <div class="input-item-rb">{{ formDatadetail.one_time }}</div>
                      </el-form-item>
                      <el-form-item label="发放佣金:" style="margin-bottom: 10px">
                        <div class="input-item-rb">￥{{ formDatadetail.one_thismoney }}</div>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class=" bg-purple-dark" style="padding: 0 16px">
                    <h6>二级分销商</h6>
                    <el-form v-if="!formDatadetail.two_name" :model="formDatadetail" label-position="left" label-width="80px" size="mini">
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
                      <el-form-item label="发放佣金:" style="margin-bottom: 10px">
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
      <el-row :gutter="3" class="info-ewrapper">
        <el-col :span="4">
          <div class="info-wrapper-item info-wrapper-l">
            <div v-waves class="info-tab" style="border-bottom: 3px solid rgb(239,244,250)" @click="dialogFormVisible = 'liucheng'">
              流程操作
            </div>
            <div v-waves class="info-tab" @click="dialogFormVisible = 'hetong'">
              项目合同
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="info-wrapper-item info-wrapper-r">
            <div v-if="dialogFormVisible == 'liucheng'" class="info-liucheng">
              <div class="info-wrapper-r-t">
                <div class="info-item">
                  业务状态:
                  <el-tag v-if="formDatadetail.is_stop == '1'" type="danger">已停止服务</el-tag>
                  <el-tag v-else-if="formDatadetail.state_progress == '3'" type="success">已完成</el-tag>
                  <el-tag v-else type="success">服务中</el-tag>
                </div>
                <div v-if="formDatadetail.is_stop == '1'" class="info-item">
                  停止原因: {{ formDatadetail.stop_remark }}
                </div>
              </div>
              <h6 class="info-liucheng-title">业务流程服务</h6>
              <div class="info-liucheng-content">
                <el-steps :active="steps.active" align-center finish-status="success">
                  <el-step v-for="item in steps.steps" :title="item | processNameFilter(steps.stopstate)" :description="item | processStateFilter"/>
                </el-steps>
              </div>
            </div>

            <div v-if="dialogFormVisible == 'hetong'" class="info-hetong">
              <div v-for="item in contract" class="info-hetong-item">
                <img :src="item.path" alt="" class="info-hetong-img" @click="handlePictureCardPreview">
              </div>
              <!--图片预览用-->
              <el-dialog :visible.sync="dialogVisible">
                <img :src="dialogImageUrl" width="100%" alt="">
              </el-dialog>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { mapState } from 'vuex'
import { getstatemember } from '@/api/business/details.js' // 获取详情信息、流程 、合同
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    },
    timeFilter(time) {
      if (time === '' || time == null) {
        return '--/--'
      } else {
        return time
      }
    },
    processStateFilter(item) {
      switch (item.state) {
        case '3':
          return item.finish_time
          break
        case '2':
          return '进行中'
          break
        case '4':
          return '进度中止'
          break
        default:
          return '未开始'
      }
    },
    processNameFilter(item) {
      if (item.content_type == '2') {
        return item.process_name + '(' + item.price + '%)'
      } else {
        return item.process_name
      }
    }
  },
  data() {
    return {
      dialogFormVisible: 'liucheng',
      dialogImageUrl: '',
      dialogVisible: false,
      active: 1
    }
  },
  computed: {
    steps() {
      let process = this.$store.state.ywdetails.process
      let stopstate = this.$store.state.ywdetails.member.is_stop
      let active = 0
      if (process[process.length - 1].state === '3') {
        active = process.length
      } else {
        for (var i = 0; i < process.length; i++) { // 判断当前进行到哪一步
          if (process[i].state === '2') {
            active = i
            if (stopstate === '1') {
              process[i].state = '4'
            }
            break
          }
        }
      }
      return { steps: process, active: active, stopstate: stopstate }
    },
    ...mapState({
      processTypeOptions: state => state.projectindex.list, // 分类列表，下拉搜索框选项
      id: state => state.ywstate2.selectitemID, // 选中项id
      formDatadetail: state => state.ywdetails.member, // 信息
      // steps: state => state.ywdetails.process, // 流程
      contract: state => state.ywdetails.contract // 合同
    })
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      getstatemember(this.$route.query.id).then((res) => {
        this.$store.dispatch('ywdetails/getstatedetail', res)
      })
    },
    // 图片预览
    handlePictureCardPreview(event) {
      this.dialogImageUrl = event.target.src
      this.dialogVisible = true
    },
    // 展示 选中项 流程
    handleUpdate1(row) {
      this.steps = this.selectitem.process
      var step = this.selectitem.process
      for (var i = 0; i < step.length; i++) { // 判断当前进行到哪一步
        if (step[i].state === '2') {
          this.active = i
          break
        }
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-icon {
    margin: 0 5px;
    /*border: 1px solid rgba(162, 162, 162, 0.99);*/
    /*padding: 2px;*/
    font-size: 20px;
    vertical-align: middle;
    /*-webkit-border-radius: 3px;*/
    /*-moz-border-radius: 3px;*/
    /*border-radius: 3px;*/
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .left-title {
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
    min-height: 590px;
    background: white;
  }
  .input-item {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: rgb(240, 240, 240);
    color: #7a7a7a;
    padding: 0 20px;
  }
  .input-item-text {
    height: 72px;
  }
  .input-item-rt, .input-item-rb {
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: rgb(240, 240, 240);
    color: #7a7a7a;
    padding: 0 20px;
  }
  .input-item-rb {
    background: white;
  }
  .info-ewrapper {
    .info-wrapper-item {
      border-radius: 4px;
      vertical-align: center;
      min-height: 400px;
      background: white;
    }
    .info-wrapper-l {
      .info-tab {
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #181818;
        font-size: 14px;
        color: #7a7a7a;
        cursor: pointer;
      }
    }
    .info-wrapper-r {
      border: 1px solid rgba(0, 0, 0, 0);
      .info-liucheng {

        .customer-info{
          /*padding: 30px;*/
          /*font-size: 16px;*/
          /*color: #606266;*/
        }
        .info-item{
          padding: 16px;
          font-size: 14px;
          color: #606266;
          border-bottom: 1px solid #f0f0f0;
          margin: 0 20px;
        }

        /*height: 400px;*/
        .info-liucheng-title {
          font-weight: normal;
          text-align: center;
          font-size: 14px;
          margin-top: 50px;
        }
        .info-liucheng-content {
          padding: 20px;
          margin-top: 50px;
          overflow-x: scroll;
        }
      }
      .info-hetong {
        .info-hetong-item {
          float: left;
          border: 1px solid #d9d9d9;
          border-radius: 6px;
          height: 220px;
          width: 180px;
          padding: 8px;
          text-align: center;
          margin: 10px;
          .info-hetong-img {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
      }
    }

  }
</style>
