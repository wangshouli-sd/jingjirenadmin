<template>
  <div class="app-container" style="padding: 20px;">
    <div class="filter-container" style="background: #ffffff;padding: 16px;text-align: left;">
      <el-input v-model="listQuery.code" style="width: 200px;" class="filter-item" placeholder="识别码" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.name" style="width: 200px;" class="filter-item" placeholder="姓名" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <div class="operation-container">
      <div class="operation-btn-wrapper">
        <el-button size="mini" @click="handleAddBlacklist">加入黑名单</el-button>
        <el-button size="mini" @click="handleDelBlacklist">取消黑名单</el-button>
        <el-button size="mini" @click="handleFilterBlacklist">黑名单列表( {{ page.black_total }})</el-button>
      </div>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%;padding: 20px"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="50"/>
      <el-table-column prop="code" label="识别码" align="center">
        <template slot-scope="scope">
          {{ scope.row.onlyid }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="头像" width="80" align="center">
        <template slot-scope="scope">
          <div class="user-img-box">
            <img :src="scope.row.url" class="user-img" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.nick_name }}
        </template>
      </el-table-column>
      <el-table-column prop="code" label="真实姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="code" label="联系方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="申请时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="累计佣金" align="center">
        <template slot-scope="scope">
          <div style="color:red">￥{{ scope.row.money }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="累计提现" align="center">
        <template slot-scope="scope">
          <div style="color:red">￥{{ scope.row.tixian }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="业务提交" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.number }}次
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag slot="reference" :type="scope.row.blacklist|statusFilter" style="cursor: pointer">{{ scope.row.blacklist|showstateFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="{path:'/agent/commissiondetail',query:{id:scope.row.id}}">
            <el-tooltip class="item" effect="dark" content="查看佣金明细" placement="top">
              <i class="el-icon-view el-icon"/>
            </el-tooltip>
          </router-link>
          <!--<i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>-->
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
import { agentlist, delagent, addblack, delblack } from '@/api/agent/index.js' // 获取列表、删除经纪人、黑名单列表、加入黑名单、取消黑名单
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = ['danger', 'success']
      return statusMap[status]
    },
    showstateFilter(status) {
      const statusMap = ['禁用', '启用']
      return statusMap[status]
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
        limit: 10,
        title: undefined,
        name: undefined,
        code: undefined,
        blacklist: 1
      },
      downloadLoading: false,
      multipleSelection: [],
      list: [],
      page: {}
    }
  },
  computed: {
    ...mapState({
      processTypeOptions: state => state.projectindex.list // 分类列表，下拉搜索框选项
    })
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      agentlist(this.listQuery).then((res) => {
        // this.$store.dispatch('agentindex/getagentlist', res)
        this.list = res.list
        this.page = res.page
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.listQuery.blacklist = '1'
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
    // 查询黑名单
    handleFilterBlacklist() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.listQuery.name = undefined
      this.listQuery.code = undefined
      this.listQuery.blacklist = '0'
      this.getList()
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确认删除该会员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delagent(row.id).then((res) => {
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
    },
    // 多选
    handleSelectionChange(row) {
      this.multipleSelection = row
    },
    // 加入黑名单
    handleAddBlacklist() {
      var mullist = this.multipleSelection
      var mulid = []
      for (var i = 0; i < mullist.length; i++) {
        mulid.push(mullist[i].id)
      }
      if (mulid.length < 1) {
        this.$message({
          type: 'warning',
          message: '请先勾选要添加黑名单的会员!'
        })
        return false
      }
      this.$confirm('确认将所选会员加入黑名单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addblack(mulid.join(',')).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          }
        })
      }).catch(() => {
      })
    },
    // 取消黑名单
    handleDelBlacklist() {
      var mullist = this.multipleSelection
      var mulid = []
      for (var i = 0; i < mullist.length; i++) {
        mulid.push(mullist[i].id)
      }
      if (mulid.length < 1) {
        this.$message({
          type: 'warning',
          message: '请先勾选要取消黑名单的会员!'
        })
        return false
      }
      this.$confirm('确认将所选会员取消黑名单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delblack(mulid.join(',')).then((res) => {
          if (res.status.state === 'success') {
            this.handleFilterBlacklist()
            this.$message({
              type: 'success',
              message: '更改成功!'
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
</style>
