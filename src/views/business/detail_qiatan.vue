<template>
  <div class="app-container">
    <div class="filter-container">
      <el-container>
        <el-aside width="220px">
          <div class="title">
            业务信息
          </div>
        </el-aside>
        <el-main>
          <el-row>
            <el-form label-position="right" label-width="100px">
              <el-col :span="12">
                <el-form-item label="业务ID">
                  <div class="input-item">{{ formDatadetail.task_number }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="项目名称">
                  <div class="input-item">{{ formDatadetail.projectname }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="业务联系人">
                  <div class="input-item">{{ formDatadetail.username }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系方式">
                  <div class="input-item">{{ formDatadetail.userphone }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经纪人">
                  <div class="input-item">{{ formDatadetail.main_name }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系方式">
                  <div class="input-item">{{ formDatadetail.main_phone }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="佣金比例">
                  <div class="input-item">{{ formDatadetail.back_percent }}%</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="提交时间">
                  <div class="input-item">{{ formDatadetail.create_time }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="提交备注">
                  <div class="input-item-text">{{ formDatadetail.describe }}</div>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-main>
      </el-container>
      <el-container style="margin-top: 3px">
        <el-aside width="220px">
          <div class="title">
            洽谈进度
          </div>
        </el-aside>
        <el-main>
          <div class="info-wrapper-item info-wrapper-r">
            <div class="info-liucheng">
              <div class="info-wrapper-r-t">
                <div class="info-item">
                  业务状态:
                  <el-tag v-if="formDatadetail.is_stop == '1'" type="danger">洽谈失败</el-tag>
                  <el-tag v-else type="success">洽谈中</el-tag>
                </div>
                <div v-if="formDatadetail.is_stop == '1'" class="info-item">
                  失败原因: {{ formDatadetail.stop_remark }}
                </div>
              </div>
              <div class="info-liucheng-content">
                <el-steps :active="steps.active" align-center finish-status="success">
                  <el-step v-for="item in steps.steps" :title="item | processNameFilter(steps.stopstate)" :description="item | processStateFilter"/>
                </el-steps>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getdetailstate2 } from '@/api/business/details.js' // 获取详情信息
export default {
  name: 'ComplexTable',
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
      formDatadetail: {},
      steps: []
    }
  },
  computed: {
    ...mapState({
    })
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      getdetailstate2(this.$route.query.id).then((res) => {
        this.formDatadetail = res.member
        this.steps = this.stepformat(res.process)
      })
    },
    stepformat(process) {
      // let process = this.$store.state.ywdetails.process
      let stopstate = this.formDatadetail.is_stop
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-aside {
    background-color: #ffffff;
    color: #909399;
    padding: 30px;
    border-right: 3px solid rgb(235,238,245);
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    .title{
      padding: 20px;
      font-size: 14px;
      color: #409EFF;
    }
    .info-item{
      padding: 16px;
      font-size: 14px;
      color: #606266;
      /*border: 1px solid black;*/
    }
  }
  .el-main {
    background-color: #ffffff;
    padding: 30px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col{
      /*border: 1px solid black;*/
      padding: 2px 10px;
    }
    .info-liucheng-content {
      padding: 20px;
      margin-top: 50px;
      overflow-x: scroll;
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
      min-height: 72px;
      line-height: 36px;
      font-size: 14px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      background: rgb(240, 240, 240);
      color: #7a7a7a;
      padding: 0 20px;
    }
    .info-item{
      padding: 16px;
      font-size: 14px;
      color: #606266;
      border-bottom: 1px solid #f0f0f0;
      margin: 0 20px;
    }
  }

</style>
