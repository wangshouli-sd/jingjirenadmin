<template>
  <div class="app-container" style="padding: 20px;">
    <div class="filter-container" style="background: #ffffff;padding: 16px;text-align: right;">
      <el-input v-model="listQuery.name" style="width: 200px;" class="filter-item" placeholder="经纪人姓名" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%;padding: 20px">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" class="demo-table-expand">
            <el-row>
              <el-col :span="8">
                <el-form-item label="真实姓名:">
                  <span>{{ scope.row.name }}</span>
                </el-form-item>
                <el-form-item label="身份证号:">
                  <span>{{ scope.row.idcard }}</span>
                </el-form-item>
                <el-form-item label="联系方式:">
                  <span>{{ scope.row.phone }}</span><el-tag type="success" size="mini">已认证</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <h6 style="color: #606266;font-size: 14px;font-weight: normal;margin: 0;line-height: 36px;">证件照片</h6>
                <div class="idcard-wrapper"><img :src="scope.row.idcard_url[0]" class="idcard-img" alt="" @click="handlePictureCardPreview"></div>
                <div class="idcard-wrapper"><img :src="scope.row.idcard_url[1]" class="idcard-img" alt="" @click="handlePictureCardPreview"></div>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="80" align="center">
        <template slot-scope="scope">
          <div class="user-img-box">
            <img :src="scope.row.url" class="user-img" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.nick_name }}
        </template>
      </el-table-column>
      <el-table-column prop="code" label="真实姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="申请时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.jing_time }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="手机认证" width="120" align="center">
        <template slot-scope="scope">
          <el-tag>已认证</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="身份认证" width="120" align="center">
        <template slot-scope="scope">
          <el-tag>已认证</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag>待审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="审核通过" placement="top">
            <i class="el-icon-check el-icon" @click="handleUpdate(scope.row)"/>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="审核退回" placement="top">
            <i class="el-icon-close el-icon" @click="handleBackto(scope.row)"/>
          </el-tooltip>
          <!--<i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>-->
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
import { mapState } from 'vuex'
import waves from '@/directive/waves'
import { auditlista, delaudita, shena } from '@/api/agent/audit.js' // 获取列表、删除、审核
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
      dialogImageUrl: '',
      dialogVisible: false,
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
      auditlista(this.listQuery).then((res) => {
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
    // 审核通过
    handleUpdate(row) {
      this.$confirm('确认已核实经纪人信息并通过审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        shena('1', row.id, null).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '提交成功'
            })
          }
        })
      }).catch(() => {
      })
    },
    // 审核不通过
    handleBackto(row) {
      this.$prompt('审核未通过，请输入退回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        shena('0', row.id, value).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '提交成功'
            })
          }
        })
      }).catch(() => {
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将删除该审核记录相关信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delaudita(row.id).then((res) => {
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
    // 预览图片 身份证
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
    cursor: pointer;
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
  .idcard-wrapper{
    display: inline-block;
    width: 200px;
    height: 120px;
    border: 1px solid #c8c8c8;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    margin-right: 20px;
    overflow: hidden;
    .idcard-img{
      width: 100%;
      height: 100%;
    }
  }

</style>
