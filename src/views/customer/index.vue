<template>
  <div class="app-container" style="padding: 20px;">
    <div class="filter-container" style="background: #ffffff;padding: 16px;text-align: left;">
      <el-input v-model="listQuery.name" style="width: 200px;" class="filter-item" placeholder="姓名" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.phone" style="width: 200px;" class="filter-item" placeholder="手机号" @keyup.enter.native="handleFilter"/>
      <!--<el-input v-model="listQuery.agentname" style="width: 200px;" class="filter-item" placeholder="经纪人" @keyup.enter.native="handleFilter"/>-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%;padding: 20px">
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.customer_name }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.customer_phone }}
        </template>
      </el-table-column>
      <el-table-column label="业务数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.task_count }}
        </template>
      </el-table-column>
      <el-table-column label="所属经纪人" align="center">
        <template slot-scope="scope">
          {{ scope.row.jing_name }}
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center" width="160">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="{path:'/customer/customerdetail',query:{id:scope.row.id}}">
            <el-tooltip class="item" effect="dark" content="查看客户详情" placement="top">
              <i class="el-icon-view el-icon" />
            </el-tooltip>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="page.data_total | pageFilters" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>

<script>
import waves from '@/directive/waves'
import { getcustomerlist } from '@/api/customer/index.js'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    pageFilters(page) {
      return parseInt(page)
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        phone: undefined,
        agentname: undefined
      },
      list: [],
      page: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getcustomerlist(this, this.listQuery).then((res) => {
        this.list = res.list
        this.page = res.page
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
</style>

