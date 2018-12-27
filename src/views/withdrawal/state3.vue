<template>
  <div class="app-container" style="padding: 20px;">
    <!--顶部操作按钮-->
    <div class="filter-container" style="background: #ffffff;padding: 16px;text-align: right;">
      <el-select v-model="listQuery.type" clearable class="filter-item" style="width: 130px" placeholder="提现方式">
        <el-option v-for="item in withdrawalType" v-if="item.type === '1'" :key="item.key" :label="item.name | txTypeFilter" :value="item.id"/>
      </el-select>
      <el-input v-model="listQuery.number" style="width: 200px;margin-right: 10px;" class="filter-item" placeholder="提现单号" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.name" style="width: 200px;margin-right: 10px;" class="filter-item" placeholder="姓名" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%;padding: 20px">
      <el-table-column label="序号" type="index" width="60" align="center"/>
      <el-table-column prop="code" label="提现单号" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column prop="code" label="真实姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="联系方式" align="center" width="160">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="申请金额" align="center">
        <template slot-scope="scope">
          <div style="color: red;">￥{{ scope.row.money }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="账户余额" align="center">
        <template slot-scope="scope">
          <div >￥{{ scope.row.havemoney }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="申请时间" align="center" width="160">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag type="danger">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="退回原因" align="center" width="180" >
        <template slot-scope="scope">
          <div style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;">
            {{ scope.row.remarks }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <i class="el-icon-delete el-icon" @click="handleDelete(scope.row,'deleted')"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="page.data_total | pageFilters" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import waves from '@/directive/waves'
import { fecthlist, delmoney, typemoney } from '@/api/financial/index.js' // 已完成、删除
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
        title: undefined,
        type: undefined,
        number: undefined,
        name: undefined,
        state: 0
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
    // 删除一条数据
    handleDelete(row) {
      this.$confirm('确认删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delmoney(row.id).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
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

</style>
