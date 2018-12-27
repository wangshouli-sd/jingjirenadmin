<template>
  <div class="app-container" style="padding: 20px;">
    <!--顶部操作按钮-->
    <div class="filter-container" style="background: #ffffff;padding: 16px;text-align: right;">
      <el-select v-model="listQuery.type" clearable class="filter-item" style="width: 130px" placeholder="提现方式">
        <el-option v-for="item in withdrawalType" v-if="item.type === '1'" :key="item.key"
                   :label="item.name | txTypeFilter" :value="item.id"/>
      </el-select>
      <el-input v-model="listQuery.number" style="width: 200px;margin-right: 10px;" class="filter-item"
                placeholder="提现单号" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.name" style="width: 200px;margin-right: 10px;" class="filter-item" placeholder="姓名"
                @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%;padding: 20px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <template v-if=" props.row.type === '1' ">
              <el-form-item label="提现方式">
                <span>{{ props.row.typename }}</span>
              </el-form-item>
              <el-form-item label="支付宝账号">
                <span>{{ props.row.alipay }}</span>
              </el-form-item>
              <el-form-item label="支付宝实名">
                <span>{{ props.row.truename }}</span>
              </el-form-item>
            </template>
            <template v-else-if=" props.row.type === '2' ">
              <el-form-item label="提现方式">
                <span>{{ props.row.typename }}</span>
              </el-form-item>
              <el-form-item label="银行卡账号">
                <span>{{ props.row.bank_card }}</span>
              </el-form-item>
              <el-form-item label="提现银行">
                <span>{{ props.row.bankname }}</span>
              </el-form-item>
            </template>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="60" align="center"/>
      <el-table-column prop="code" label="提现单号" align="center">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column prop="code" label="真实姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="联系方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="待转金额" align="center">
        <template slot-scope="scope">
          <div style="color: red;">￥{{ scope.row.money }}</div>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column label="提现方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.typename }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag>待打款</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="260" class-name="small-padding">
        <template slot-scope="scope">
          <!--<el-button type="primary" size="mini">支付宝自动打款</el-button>-->
          <el-button v-if=" scope.row.type === '1' " type="primary" size="mini" @click="handlePay(scope.row)">支付宝自动打款
          </el-button>
          <i v-else class="el-icon-check el-icon" @click="handleUpdate(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     :total="page.data_total | pageFilters" background layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import waves from '@/directive/waves'
import { fecthlist, pushmoney, alipaymoney, typemoney } from '@/api/financial/index.js' // 待打款列表、审核、删除
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
    txTypeFilter(status) {
      var value = status.slice(9)
      const txTypeMap = {
        alipay: '支付宝',
        bank: '银行卡',
        wechat: '微信零钱'
      }
      return txTypeMap[value]
    },
    pageFilters(page) {
      return parseInt(page)
    }
  },
  data() {
    return {
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        type: undefined,
        number: undefined,
        name: undefined,
        state: 2
      },
      downloadLoading: false,
      multipleSelection: [],
      list: [],
      page: {}
    }
  },
  computed: {
    ...mapState({
      withdrawalType: state => state.financial.withdrawaltype, // 分类列表，下拉搜索框选项
      formDataProject: state => state.projectlist.post // 项目详情
    })
  },
  created() {
    this.getList()
    this.getTypemoneyList()
  },
  methods: {
    getList() {
      fecthlist(this.listQuery).then((res) => {
        this.list = res.list
        this.page = res.page
      })
    },
    getTypemoneyList() {
      typemoney(this) // 获取提现方式列表 api
    },
    handlePay(row) {
      this.$confirm('点击完成支付宝自动打款, 钱将进入对方账户，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        alipaymoney(row.id).then((res) => {
          if (res.status.state === 'success') {
            this.getList() // 更改成功，重新加载列表
            this.$message({
              type: 'success',
              message: '打款成功!'
            })
          } else if (res.status.state === 'error') {
            this.$message({
              type: 'error',
              message: '打款失败，请检查支付宝参数是否正确或者收款方账户是否正确!'
            })
          } else if (res.status.state === 'paynull') {
            this.$message({
              type: 'error',
              message: '支付宝自动打款的必要参数没有设置，请检查!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '打款失败,请稍后重试'
            })
          }
        })
      }).catch(() => {
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 更改状态为已完成
    handleUpdate(row) {
      this.$confirm('确认已完成打款, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pushmoney(row.id).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '提交成功!'
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
  .el-icon {
    margin: 0 5px;
    border: 1px solid rgba(162, 162, 162, 0.99);
    padding: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;

  }

  .user-img-box {
    text-align: center;
    .user-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  .ywitem-r {
    text-align: left;
    padding-left: 20px;
    .ywitem-r-title {
      text-align: left;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  /*.demo-table-expand {*/
  /*font-size: 0;*/
  /*}*/
  /*.demo-table-expand label {*/
  /*width: 90px;*/
  /*color: #99a9bf;*/
  /*}*/
  /*.demo-table-expand .el-form-item {*/
  /*margin-right: 0;*/
  /*margin-bottom: 0;*/
  /*width: 50%;*/
  /*}*/

</style>
