<template>
  <div class="app-container" style="">
    <div class="filter-container" style="background: #ffffff;padding: 16px;">
      <el-input v-model="listQuery.title" style="width: 200px;" class="filter-item" placeholder="联系人" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" clearable class="filter-item" style="width: 130px" placeholder="项目分类">
        <el-option v-for="item in processTypeOptions" :key="item.title" :label="item.title" :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete" @click="handleBatchDelete">批量删除</el-button>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      border
      class="damo-table"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="50"/>
      <el-table-column prop="task_number" label="业务编号" width="120" align="center"/>
      <el-table-column label="业务名称" align="center" min-width="200px">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="6" class="ywitem-l">
              <div class="">
                <img :src="scope.row.img_path" class="ywitem-l-img" alt="">
              </div>
            </el-col>
            <el-col :span="18" class="ywitem-r">
              <div class="">
                <div class="ywitem-r-title">{{ scope.row.taskname }}</div>
                <div>
                  <el-tag v-for="item in scope.row.tags" :key="item.key" size="mini" type="success" style="margin-right: 3px;">{{item}}</el-tag>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="业务联系人" width="100" align="center"/>
      <el-table-column prop="userphone" label="联系方式" width="120" align="center"/>
      <el-table-column prop="time" label="提交时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column prop="expect_commission" label="签单总额" width="100" align="center">
        <template slot-scope="scope">
          <span style="color: red;">￥{{ scope.row.total_price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expect_commission" label="发放佣金" width="100" align="center">
        <template slot-scope="scope">
          <span style="color: red;">￥{{ scope.row.all_yongjin }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="经纪人" width="100" align="center"/>
      <el-table-column prop="state" label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag>已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="140" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="{path:'/business/detail',query:{id:scope.row.id}}">
            <i class="el-icon-view el-icon"/>
          </router-link>
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
import { state3list, delstate3 } from '@/api/business/state3.js' // 获取列表、删除
import { fecthcategory } from '@/api/project/index.js' // 初始化  类型分类  列表
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
      return time.slice(0, 10) + '' + time.slice(10, 16)
    },
    pageFilters(page) {
      return parseInt(page)
    }
  },
  data() {
    return {
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined
      },
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
    this.getCategory()
  },
  methods: {
    getList() {
      state3list(this.listQuery).then((res) => {
        this.list = res.list
        this.page = res.page
      })
    },
    getCategory() {
      fecthcategory(this, this.listQuery) // 初始化类型 分类 api
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
    // 删除数据
    handleDelete(row) {
      this.$confirm('此操作将删除该项目相关信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delstate3(row.id).then((res) => {
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
    // 多选 批量删除用
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
        delstate3(mulid.join(',')).then((res) => {
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
  .damo-table{
    ::-webkit-scrollbar-track-piece {
     background: #d3dce6;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
    }
  }
  .el-icon{
    margin:0 5px;
    border: 1px solid rgba(162, 162, 162, 0.99);
    padding: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;

  }
  .ywitem-l{
    text-align: right;
    .ywitem-l-img{
      width: 50px;
      height: 40px;
      border-radius: 10px;
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
