<template>
  <div class="app-container" style="padding: 20px;">
    <!--顶部操作按钮-->
    <div class="filter-container" style="background: #ffffff;padding: 16px;text-align: right;border-bottom: 1px solid #ededed;display: none;">
      <el-input v-model="listQuery.title" style="width: 300px;margin-right: 10px;" class="filter-item" placeholder="ID/名称/分类/编号" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="" @click="handleFilter">搜索</el-button>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%;padding: 20px"
      @expand-change="handlerowIsread">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div class="opinion-content">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="联系方式">
                <el-input v-model="scope.row.contact"/>
              </el-form-item>
              <el-form-item label="投诉意见">
                <el-input v-model="scope.row.problem" type="textarea" />
              </el-form-item>
              <el-form-item label="提交图片">
                <div class="opinion-wrapper">
                  <template v-for="item in scope.row.imgurl">
                    <div class="imgbox">
                      <img :src="item" alt="" class="opinionimg" @click="handlePictureCardPreview">
                    </div>
                  </template>
                  <div style="clear: both" />
                </div>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="60" align="center"/>
      <el-table-column prop="name" label="头像" width="80" align="center">
        <template slot-scope="scope">
          <div class="user-img-box">
            <img :src="scope.row.authorimg" class="user-img" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="真实姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.truename }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="联系方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.contact }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="提交时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type=" scope.row.is_read | typeFilter ">{{ scope.row.is_read | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="page.data_total | pageFilters" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!--图片预览用-->
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import { fecthsuggest, delsuggest, readsuggest } from '@/api/opinion/index.js' // 获取意见反馈列表，删除
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    typeFilter(status) {
      const statusMap = ['', 'success']
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = ['未读', '已读']
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
        limit: 20,
        title: undefined
      },
      multipleSelection: [],
      //  新增
      dialogImageUrl: '',
      dialogVisible: false,
      form: {},
      list: [],
      page: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fecthsuggest(this.listQuery).then((res) => {
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
    handleDelete(row) {
      this.$confirm('确认删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delsuggest(row.id).then((res) => {
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
    // 已读反馈
    handlerowIsread(row, expandedRows) {
      const index = this.list.indexOf(row)
      readsuggest(row.id).then((res) => {
        if (res.status.state === 'success') {
          this.list[index].is_read = '1'
        }
      })
    },
    // 图片放大预览
    handlePictureCardPreview(event) {
      this.dialogImageUrl = event.target.src
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
  .opinion-wrapper{
    border: 1px solid #d6d6d6;
    border-radius: 10px;
    .imgbox{
      float: left;
      width: 160px;
      height: 120px;
      margin: 10px;
      .opinionimg{
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
</style>
