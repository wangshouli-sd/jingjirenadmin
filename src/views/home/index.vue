<template>
  <div class="dashboard-editor-container">
    <sy-card/>
    <el-row :gutter="16" style="margin-top: 0px;">
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="16">
        <div class="grid-content bg-purple">
          <el-container>
            <el-header style="height: 45px;font-size: 14px;">进行中业务</el-header>
            <el-main style="padding: 0">
              <el-table :data="list" style="width: 100%" height="450px">
                <el-table-column label="序号" type="index" width="60"/>
                <el-table-column align="center" prop="taskname" label="项目名称"/>
                <el-table-column align="center" prop="time" label="签约时间" width="180"/>
                <el-table-column align="center" prop="name" label="经纪人" width="180"/>
                <el-table-column label="业务状态" width="180" align="center">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.state_check !== '2'" :type="scope.row.state_check | statusFilterState" size="small">{{ scope.row.state_check === '0'?'审核未通过':'审核中' }}
                    </el-tag>
                    <el-tag v-else-if="scope.row.is_stop === '1'" type="danger" size="small">
                      {{ scope.row.state_progress | statusFilterStop }}
                    </el-tag>
                    <el-tag v-else :type="scope.row.state_progress | statusFilterProcess" size="small">
                      {{ scope.row.state_progress | statusFilterValue }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                  <template slot-scope="scope">
                    <!--:to="{path:'/business/stateToload',query:{id:scope.row.id}}"-->
                    <router-link :to="scope.row | srcFilter">
                      <i class="el-icon-view el-icon" />
                    </router-link>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
          </el-container>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="8">
        <div class="grid-content bg-purple">
          <el-container>
            <el-header style="height: 45px;font-size: 14px;">业务类别统计</el-header>
            <el-main style="background: white">
              <sy-piechart />
            </el-main>
          </el-container>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="margin-bottom:30px;">
        <el-container>
          <el-header style="height: 45px;font-size: 14px;">业务收入统计</el-header>
          <el-main style="background: white">
            <sy-linechart/>
          </el-main>
        </el-container>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <el-container>
          <el-header style="height: 45px;font-size: 14px;">财务中心</el-header>
          <el-main style="background: white">
            <el-row :gutter="12">
              <el-col :span="24">
                <el-card shadow="always" style="background: rgb(115,90,243)">
                  <div class="el-card-top">
                    <div>本月签单总额</div>
                    <div>￥{{ money.money }}</div>
                  </div>
                  <p>{{ time }}</p>
                </el-card>
              </el-col>
              <el-col :span="24">
                <el-card shadow="hover" style="background: rgb(28,198,218)">
                  <div class="el-card-top">
                    <div>本月发放佣金</div>
                    <div>￥{{ money.getmoney }}</div>
                  </div>
                  <p>{{ time }}</p>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <el-container>
          <el-header style="height: 45px;font-size: 14px;">意见反馈</el-header>
          <el-main style="background: white;padding: 0;overflow: hidden;">
            <sy-opinion/>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SyPiechart from './components/SyPiechart'
import SyCard from './components/SyCard'
import SyLinechart from './components/SyLinechart'
import SyOpinion from './components/SyOpinion'
import { typemoney } from '@/api/financial/index.js'
import { indextask } from '@/api/home/index.js'
export default {
  name: 'DashboardAdmin',
  components: {
    SyOpinion,
    SyPiechart,
    SyCard,
    SyLinechart
  },

  filters: {
    statusFilterState(status) {
      const statusMap = ['danger', '']
      return statusMap[status]
    },
    statusFilterProcess(status) {
      const statusMap2 = ['', '', 'success', 'success', 'warning']
      return statusMap2[status]
    },
    statusFilterValue(status) {
      const statusMap3 = ['', '洽谈中', '服务中', '已完成', '待传合同']
      return statusMap3[status]
    },
    statusFilterStop(status) {
      const statusMap3 = ['', '洽谈失败', '服务终止']
      return statusMap3[status]
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
            // path:'/business/detailqiatan',query:{id:scope.row.id}}"
            return { path: '/business/detailqiatan', query: { id: row.id }}// 洽谈中
          } else if (row.state_progress === '2') {
            // return '/business/state2'// 服务中
            return { path: '/business/detail', query: { id: row.id }}// 服务中
          } else if (row.state_progress === '3') {
            // return '/business/state3'// 已完成
            return { path: '/business/detail', query: { id: row.id }} // 已完成
          } else {
            // return '/business/state1after'// 待传合同
            return { path: '/business/stateToload', query: { id: row.id }} // 待传合同
          }
        }
      }
    }
  },
  data() {
    return {
      time: '',
      list: []
    }
  },
  computed: {
    ...mapState({
      tongji: state => state.homeindex.tongji, // 折线图表数据
      money: state => state.homeindex.money // 财务中心数值
    })
  },
  mounted() {
    this.handleinit()
  },
  methods: {
    handleinit() {
      // 初始化首页业务列表
      indextask({ limit: 10 }).then((res) => {
        this.list = res.list
      })
      typemoney(this) // 初始化提现方式列表 api
      const newdate = new Date()
      const time = newdate.getFullYear() + '.' + (parseInt(newdate.getMonth()) + 1) + '.' + newdate.getDate()
      this.time = time
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-icon {
    margin: 0 5px;
    border: 1px solid rgba(162, 162, 162, 0.99);
    padding: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    cursor: pointer;
  }

  .dashboard-editor-container {
    padding: 12px;
    padding-top: 0px;
    background-color: rgb(239,244,250);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  .el-row {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-container {
    background: white;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    overflow: hidden;
  }

  .el-header, .el-footer {
    /*background-color: #E2E7EE;*/
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 42px;
    border-bottom: 1px solid #ebeef5;
  }

  .el-header {
    text-align: left;
  }

  .el-main {
    color: #333;
    text-align: center;
    height: 450px;
    /*line-height: 160px;*/
  }

  .el-table th {
    text-align: center !important;
  }

  /*财务card*/
  .el-card {
    margin-top: 20px;
    text-align: left;
    color: #ffffff;
    padding: 0px;
    padding: 5px 20px;
  }

  .el-card__body {
    padding: 15px 30px !important;
  }

  .el-card-top div {
    display: inline-block;
    font-size: 14px;
  }

  .el-card-top div:nth-child(1) {
    width: 60%;
  }

  .el-card-top div:nth-child(2) {
    font-size: 16px;
    width: 30%;
  }

  .el-card p {
    font-size: 13px;
    /*border: 1px solid black;*/
  }

</style>
