<template>
  <div class="app-container" style="padding: 20px;">
    <!--表格-->
    <el-container>
      <!--<el-header>客户详情</el-header>-->
      <el-aside width="280px">
        <div class="title">
          <span>基础信息</span>
        </div>
        <div class="customer-info">
          <div class="info-item">
            姓名: {{ detail.customer_name }}
          </div>
          <div class="info-item">
            电话: {{ detail.customer_phone }}
          </div>
          <div class="info-item">
            时间: {{ detail.create_time }}
          </div>
          <div class="info-item">
            备注: {{ detail.remarks || '无' }}
          </div>
        </div>
      </el-aside>
      <el-main>
        <div v-if="detail.list&&detail.list.length > 0" class="yw-list">
          <div v-for="(item, index ) in detail.list" class="list-item">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ item.projectname }}</span>
                <el-tag :type="item | statuTypeFilter">{{ item | stateFilters }}</el-tag>
                <router-link :to="item | srcFilter">
                  <el-button style="float: right; padding: 3px 0" type="text">查看业务详情</el-button>
                </router-link>
              </div>
              <div>
                <div class="info-detail-content">
                  <div class="info-content-item">
                    <div class="content-item-left">任务单号:</div>
                    <div class="content-item-right">{{ item.task_number }}</div>
                  </div>
                  <div class="info-content-item">
                    <div class="content-item-left">佣金比例:</div>
                    <div class="content-item-right">{{ item.back_percent || '未设置' }}%</div>
                  </div>
                  <div class="info-content-item">
                    <div class="content-item-left">签约金额:</div>
                    <div class="content-item-right">{{ item.total_price || '未设置' }}</div>
                  </div>
                  <div class="info-content-item">
                    <div class="content-item-left">经纪人:</div>
                    <div class="content-item-right">{{ item.jing_name }}</div>
                  </div>
                  <div class="info-content-item">
                    <div class="content-item-left">联系方式:</div>
                    <div class="content-item-right">{{ item.jing_phone }}</div>
                  </div>
                  <div class="info-content-item">
                    <div class="content-item-left">订单备注:</div>
                    <div class="content-item-right" style="line-height: 20px;vertical-align: text-top;">{{ item.describe }}</div>
                  </div>
                </div>
                <div v-if="item.process.length > 0" class="info-liucheng-content">
                  <el-steps :active="item.process | activeFilter" align-center finish-status="success">
                    <el-step v-for="items in item.process" :title="items | processNameFilter" :description="items | processStateFilter"/>
                  </el-steps>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <div v-else class="nodata">
          暂无相关业务
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getcustomeritem } from '@/api/customer/index.js' // 客户详情
export default {
  name: 'ComplexTable',
  filters: {
    processNameFilter(item) {
      if (item.content_type == '2') {
        return item.process_name + '(' + item.price + '%)'
      } else {
        return item.process_name
      }
    },
    processStateFilter(item) {
      switch (item.state) {
        case '3':
          return item.finish_time
        case '2':
          return '进行中'
        default:
          return '未开始'
      }
    },
    stateFilters(item) {
      let state_check = item.state_check
      let state_progress = item.state_progress
      let is_stop = item.is_stop
      if (state_check === '0') {
        return '审核未通过'
      } else if (state_check === '1') {
        return '审核中'
      } else {
        if (is_stop === '1') {
          if (state_progress === '1') {
            return '洽谈失败'
          } else {
            return '服务终止'
          }
        } else {
          if (state_progress === '1') {
            return '洽谈中'
          } else if (state_progress === '2') {
            return '服务中'
          } else if (state_progress === '3') {
            return '已完成'
          } else {
            return '待传合同'
          }
        }
      }
    },
    statuTypeFilter(item) {
      let state_check = item.state_check
      let state_progress = item.state_progress
      let is_stop = item.is_stop
      if (is_stop === '1' || state_check === '0') {
        return 'danger'
      } else {
        if (state_progress === '3') {
          return 'success'
        }
      }
    },
    srcFilter(row) {
      if (row.state_check === '0') {
        return '/business/state4' // 审核不通过
      } else if (row.state_check === '1') {
        return '/business/state0'// 审核中
      } else {
        if (row.is_stop === '1') {
          if (row.state_progress === '1') {
            return { path: '/business/detailqiatan', query: { id: row.id }}// 洽谈失败
          } else {
            return { path: '/business/detail', query: { id: row.id }}// 服务终止
          }
        } else {
          if (row.state_progress === '1') {
            return { path: '/business/detailqiatan', query: { id: row.id }}// 洽谈中
          } else if (row.state_progress === '2') {
            return { path: '/business/detail', query: { id: row.id }}// 服务中
          } else if (row.state_progress === '3') {
            return { path: '/business/detail', query: { id: row.id }} // 已完成
          } else {
            return { path: '/business/stateToload', query: { id: row.id }} // 待传合同
          }
        }
      }
    },
    activeFilter(process) {
      let active = 0
      if (process[process.length - 1].state === '3') {
        active = process.length
      } else {
        for (var i = 0; i < process.length; i++) { // 判断当前进行到哪一步
          if (process[i].state === '2') {
            active = i
            break
          }
        }
      }
      return active
    }
  },
  data() {
    return {
      listLoading: true,
      downloadLoading: false,
      detail: {}
    }
  },
  computed: {
    ...mapState({
    })
  },
  created() {
    this.getdetails()
  },
  methods: {
    getdetails() {
      getcustomeritem(this.$route.query.id).then((res) => {
        this.detail = res
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

  .el-header, .el-footer {
    background-color: #ffffff;
    color: #909399;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #ffffff;
    color: #909399;
    padding: 30px;
    border-right: 3px solid rgb(235,238,245);
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }
  .el-main {
    background-color: #ffffff;
    padding: 30px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .box-card{
     margin-bottom: 30px;
  }
  .title{
    padding: 20px;
    font-size: 14px;
    color: #409EFF;
  }
  .customer-info{
    /*padding: 30px;*/
    /*font-size: 16px;*/
    /*color: #606266;*/
  }
  .info-item{
    padding: 16px;
    font-size: 14px;
    color: #606266;

  }
  .info-detail-content {
    .info-content-item{
      padding: 10px 16px ;
      font-size: 14px;
      color: #606266;
      border-bottom: 1px solid #f2f2f2;
      .content-item-left{
        width: 80px;
        display: inline-block;
      }
      .content-item-right{
        display: inline-block;
        width: 80%;
      }
    }
  }
  .info-liucheng-content {
    padding: 20px;
    margin-top: 50px;
  }
  .nodata{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    font-size: 14px;
    color: #606266;
  }
</style>
