<template>
  <div class="app-container" style="padding: 20px;">
    <!--表格-->
    <el-row style="background: white;border-top: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding: 20px 10px;">
      <el-col :span="4" style="text-align: center">
        <div class="idcard-wrapper" style="text-align: center;">
          <img :src="main.touxiang" class="head-img">
        </div>
        <div @click="handlePictureCardPreview" >
          <svg-icon icon-class="sfz" style="font-size: 40px;color: rgb(147,194,58)"/>
          <svg-icon icon-class="sfzback" style="font-size: 36px;color: rgb(147,194,58)"/>
        </div>
      </el-col>
      <el-col :span="6">
        <el-form label-position="left" class="demo-table-expand">
          <el-form-item label="真实姓名:" style="margin-bottom: 0px;">
            <span>{{ main.name }}</span>
          </el-form-item>
          <el-form-item label="身份证号:" style="margin-bottom: 0px;">
            <span>{{ main.idcard }}</span>
          </el-form-item>
          <el-form-item label="联系方式:" style="margin-bottom: 0px;">
            <span>{{ main.phone }}</span><el-tag type="success" size="mini">已认证</el-tag>
          </el-form-item>
          <el-form-item label="认证时间:" style="margin-bottom: 0px;">
            {{ main.isjng_time }}
          </el-form-item>
          <el-form-item label="累计佣金:" style="margin-bottom: 0px;">
            <div style="color: red;">￥{{ main.allmoney }}</div>
          </el-form-item>
          <el-form-item label="完成业务:" style="margin-bottom: 0px;">
            {{ main.all_task }}次
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="14">
        <el-row>
          <el-col :span="12">
            <div class=" bg-purple-dark" style="padding: 0;">
              <h6 style="margin: 0px;line-height: 36px;">一级分销商</h6>
              <el-form v-if="!parent.name" :model="parent" label-position="left" label-width="80px" size="mini">
                <el-form-item label="无" style="margin-bottom: 10px"></el-form-item>
              </el-form>
              <el-form v-else :model="parent" label-position="left" label-width="80px" size="mini">
                <el-form-item label="姓名:" style="margin-bottom: 10px">
                  <div class="input-item-rb">{{ parent.name }}</div>
                </el-form-item>
                <el-form-item label="联系方式:" style="margin-bottom: 10px">
                  <div class="input-item-rb">{{ parent.phone }}</div>
                </el-form-item>
                <el-form-item label="加入时间:" style="margin-bottom: 10px">
                  <div class="input-item-rb">{{ parent.isjng_time }}</div>
                </el-form-item>
                <el-form-item label="累计佣金:" style="margin-bottom: 10px">
                  <div class="input-item-rb">￥{{ parent.allmoney }}</div>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="bg-purple-dark" style="padding: 0;">
              <h6 style="margin: 0px;line-height: 36px;">二级分销商</h6>
              <el-form v-if="!grend.name" :model="grend" label-position="left" label-width="80px" size="mini">
                <el-form-item label="无" style="margin-bottom: 10px"></el-form-item>
              </el-form>
              <el-form v-else :model="grend" label-position="left" label-width="80px" size="mini">
                <el-form-item label="姓名:" style="margin-bottom: 10px">
                  <div class="input-item-rb">{{ grend.name }}</div>
                </el-form-item>
                <el-form-item label="联系方式:" style="margin-bottom: 10px">
                  <div class="input-item-rb">{{ grend.phone }}</div>
                </el-form-item>
                <el-form-item label="加入时间:" style="margin-bottom: 10px">
                  <div class="input-item-rb">{{ grend.isjng_time }}</div>
                </el-form-item>
                <el-form-item label="累计佣金:" style="margin-bottom: 10px">
                  <div class="input-item-rb">￥{{ grend.allmoney }}</div>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--图片预览用-->
    <el-dialog :visible.sync="dialogVisible">
      <img :src="main.idcard_img[0]" width="100%" alt="">
      <img :src="main.idcard_img[1]" width="100%" alt="">
    </el-dialog>
    <!--佣金列表 -- 提现列表-->
    <el-tabs v-model="activeName" class="tab-scroll">
      <el-tab-pane label="佣金明细" name="first" class="el-tab-pane">
        <keep-alive>
          <div>
            <div class="filter-container" style="background: #ffffff;padding: 16px;">
              <el-input v-model="listQuery_yj.code" style="width: 200px;" class="filter-item" placeholder="订单编号" @keyup.enter.native="handleFilterYj"/>
              <el-select v-model="listQuery_yj.type" clearable class="filter-item" style="width: 130px" placeholder="收入类型">
                <el-option v-for="item in shourutype" :key="item.value" :label="item.name" :value="item.value"/>
              </el-select>
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilterYj">搜索</el-button>
            </div>
            <el-table
              ref="multipleTable"
              :data="list_yj"
              tooltip-effect="dark"
              style="width: 100%;padding: 20px">
              <el-table-column label="序号" type="index" width="60" align="center"/>
              <el-table-column prop="code" label="收入类型" align="center">
                <template slot-scope="scope">
                  {{ scope.row.name | shouruTypeFilter }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="收入金额" align="center">
                <template slot-scope="scope">
                  <div style="color:red">￥{{ scope.row.change_money }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="业务单号" align="center">
                <template slot-scope="scope">
                  {{ scope.row.task_number }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="业务步骤" align="center">
                <template slot-scope="scope">
                  {{ scope.row.processname }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="签约总额" align="center">
                <template slot-scope="scope">
                  ￥{{ scope.row.allmoney }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.time }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="查看订单详情" placement="top">
                    <router-link :to="{path:'/business/detail',query:{id:scope.row.task_id}}">
                      <i class="el-icon-view el-icon"/>
                    </router-link>
                  </el-tooltip>
                  <!--<i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>-->
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
              <el-pagination :current-page="listQuery_tx.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery_tx.limit" :total="page_yi.data_total | pageFilters_yi" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChangeYj" @current-change="handleCurrentChangeYj"/>
            </div>
          </div>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="提现记录" name="second" class="el-tab-pane">
        <keep-alive>
          <div>
            <div class="filter-container" style="background: #ffffff;padding: 16px;">
              <el-input v-model="listQuery_tx.code" style="width: 200px;" class="filter-item" placeholder="提现单号" @keyup.enter.native="handleFilterTx"/>
              <el-select v-model="listQuery_tx.type" clearable class="filter-item" style="width: 130px" placeholder="提现方式">
                <el-option v-for="item in withdrawalType" v-if="item.type === '1'" :key="item.key" :label="item.name | txTypeFilter" :value="item.id"/>
              </el-select>
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilterTx">搜索</el-button>
            </div>
            <el-table
              ref="multipleTable"
              :data="list_tx"
              tooltip-effect="dark"
              style="width: 100%;padding: 20px">
              <el-table-column label="序号" type="index" width="60" align="center"/>
              <el-table-column prop="name" label="提现金额" align="center">
                <template slot-scope="scope">
                  <div style="color:red">￥{{ scope.row.money }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="提现单号" align="center">
                <template slot-scope="scope">
                  {{ scope.row.number }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="提现方式" align="center">
                <template slot-scope="scope">
                  {{ scope.row.type | tixianTypeFilter }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.endtime }}
                </template>
              </el-table-column>
              <!--<el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-tooltip class="item" effect="dark" content="查看订单详情" placement="top">-->
                    <!--<i class="el-icon-view el-icon" @click="handleBackto(scope.row)"/>-->
                  <!--</el-tooltip>-->
                <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
            <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
              <el-pagination :current-page="listQuery_tx.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery_tx.limit" :total="page_tx.data_total | pageFilters_tx" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChangeTx" @current-change="handleCurrentChangeTx"/>
            </div>
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import waves from '@/directive/waves'
import { agentdetail, detailmoney, detailtixian } from '@/api/agent/details.js' // 个人详情， 佣金列表， 提现列表
import { typemoney } from '@/api/financial/index.js' //  提现方式列表
const shourutype = [
  {
    name: '佣金收入',
    value: 'main'
  },
  {
    name: '一级佣金提成',
    value: 'son'
  },
  {
    name: '二级佣金提成',
    value: 'grand'
  }
]
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    shouruTypeFilter(status) {
      const typeMap = {
        main: '佣金收入',
        son: '一级佣金提成',
        grand: '二级佣金提成'
      }
      return typeMap[status]
    },
    tixianTypeFilter(status) {
      const tixianMap = {
        1: '支付宝',
        2: '银行卡',
        3: '微信'
      }
      return tixianMap[status]
    },
    txTypeFilter(status) {
      var value = status.slice(9)
      const txTypeMap = {
        alipay: '支付宝',
        bank: '银行卡',
        wechat: '微信零钱'
      }
      return txTypeMap[value]
    },
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    },
    showstateFilter(status) {
      const showstate = {
        true: '启用',
        false: '禁用'
      }
      return showstate[status]
    },
    pageFilters_yi(page_yi) {
      return parseInt(page_yi)
    },
    pageFilters_tx(page_tx) {
      return parseInt(page_tx)
    }
  },
  data() {
    return {
      activeName: 'first',
      listLoading: true,
      listQuery_yj: {
        page: 1,
        limit: 10,
        code: undefined,
        type: undefined
      },
      listQuery_tx: {
        page: 1,
        limit: 10,
        code: undefined,
        type: undefined
      },
      shourutype,
      downloadLoading: false,
      multipleSelection: [],
      dialogVisible: false
    }
  },
  computed: {
    ...mapState({
      list_yj: state => state.agentdetail.list_money, // 佣金明细列表
      page_yi: state => state.agentdetail.page, // 佣金明细列表
      list_tx: state => state.agentdetail.list_getmoney, // 提现明细列表
      page_tx: state => state.agentdetail.page_tixian, // 提现明细列表
      main: state => state.agentdetail.main, // 经纪人信息
      parent: state => state.agentdetail.parent, // 经纪人  上级 信息 (一级分销商)
      grend: state => state.agentdetail.grend, // 经纪人  上上级 信息 (二级分销商)
      withdrawalType: state => state.financial.withdrawaltype, // 提现方式，下拉搜索框选项
      processTypeOptions: state => state.projectindex.list // 分类列表，下拉搜索框选项
    })
  },
  created() {
    this.getdetails()
    this.getTypemoneyList()
  },
  methods: {
    getdetails() {
      this.getyjlist()
      this.gettxlist()
      this.getdetail()
    },
    getdetail() {
      agentdetail(this.$route.query.id).then((res) => {
        this.$store.dispatch('agentdetail/getdetail', res)
      })
    },
    // 佣金明细
    getyjlist() {
      detailmoney(this.$route.query.id, this.listQuery_yj).then((res) => {
        this.$store.dispatch('agentdetail/getmoneylist', res)
      })
    },
    // 提现列表
    gettxlist() {
      detailtixian(this.$route.query.id, this.listQuery_tx).then((res) => {
        this.$store.dispatch('agentdetail/tixianlist', res)
      })
    },
    getTypemoneyList() {
      typemoney(this) // 获取提现方式列表 api
    },
    // 收入部分列表查询
    handleFilterYj() {
      this.listQuery_yj.page = 1
      this.getyjlist()
    },
    handleSizeChangeYj(val) {
      this.listQuery_yj.limit = val
      this.getyjlist()
    },
    handleCurrentChangeYj(val) {
      this.listQuery_yj.page = val
      this.getyjlist()
    },
    // 提现部分列表查询
    handleFilterTx() {
      this.listQuery_tx.page = 1
      this.gettxlist()
    },
    handleSizeChangeTx(val) {
      this.listQuery_tx.limit = val
      this.gettxlist()
    },
    handleCurrentChangeTx(val) {
      this.listQuery_tx.page = val
      this.gettxlist()
    },
    // 图片预览
    handlePictureCardPreview() {
      this.dialogVisible = true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-icon{
    margin:0 5px;
    border: 1px solid rgba(162, 162, 162, 0.99);
    padding: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .user-img-box{
    text-align: center;
    .user-img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .operation-container{
    background: white;
    padding: 0px 20px;
    .operation-btn-wrapper{
      border-top: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      padding: 10px;
    }

  }
  .ywitem-r{
    text-align: left;
    padding-left: 20px;
    .ywitem-r-title{
      text-align: left;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .head-img{
    width: 100px;
    height: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
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
    background: white;
  }
</style>
