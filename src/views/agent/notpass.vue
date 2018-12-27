<template>
  <div class="app-container" style="padding: 20px;">
    <div class="filter-container" style="background: #ffffff;padding: 16px;text-align: left;">
      <!--<el-input v-model="listQuery.code" style="width: 200px;" class="filter-item" placeholder="ID/业务编号" @keyup.enter.native="handleFilter"/>-->
      <el-input v-model="listQuery.name" style="width: 200px;" class="filter-item" placeholder="姓名" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete" @click="handleBatchDelete">批量删除</el-button>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%;padding: 20px"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="50"/>
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
      <el-table-column prop="code" label="联系方式" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="申请时间" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <!--<el-table-column prop="name" label="审核时间" align="center" width="120">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.time }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="name" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag type="danger">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="具体原因" align="center" width="200">
        <template slot-scope="scope">
          <div style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;">
            {{ scope.row.why }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>
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
import { notpass, delnotpass } from '@/api/agent/notpass.js' // 获取列表、删除
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
        name: undefined
      },
      list: [],
      page: {},
      downloadLoading: false,
      multipleSelection: []
    }
  },
  computed: {
    author() {
      return this.$store.state.agentaudit.author
    },
    ...mapState({
      processTypeOptions: state => state.projectindex.list // 分类列表，下拉搜索框选项
    })
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      notpass(this.listQuery).then((res) => {
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
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将删除该审核记录相关信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delnotpass(row.id).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
        })
      }).catch(() => {
      })
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除
    handleBatchDelete() {
      var mullist = this.multipleSelection
      var mulid = []
      for (var i = 0; i < mullist.length; i++) {
        mulid.push(mullist[i].id)
      }
      this.$confirm('此操作将删除所选项目相关信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delnotpass(mulid.join(',')).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功'
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
