<template>
  <div class="app-container" style="">
    <div class="filter-container" style="background: #ffffff;padding: 16px;">
      <el-input v-model="listQuery.title" style="width: 200px;" class="filter-item" placeholder="联系人" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" clearable class="filter-item" style="width: 130px" placeholder="项目分类">
        <el-option v-for="item in processTypeOptions" :key="item.title" :label="item.title" :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div class="opinion-content">
            <el-form label-width="80px">
              <el-form-item label="备注">
                <el-input v-model="scope.row.describe" type="textarea" readonly="true"/>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="60" align="center"/>
      <el-table-column prop="task_number" label="业务编号" width="150" align="center"/>
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
                  <el-tag v-for="item in scope.row.tags" :key="item.key" type="success" size="mini" style="margin-right: 5px">{{ item }}</el-tag>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="业务联系人" width="120" align="center"/>
      <el-table-column prop="userphone" label="联系方式" width="120" align="center"/>
      <el-table-column prop="time" label="提交时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.time | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="expect_commission" label="预计佣金" width="120" align="center">
        <template slot-scope="scope">
          <span style="color: red;">￥{{ scope.row.min_price }}--{{ scope.row.max_price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="经纪人" width="120" align="center"/>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag type="danger">待审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <i class="el-icon-check el-icon" @click="handleUpdate(scope.row)"/>
          <i class="el-icon-close el-icon" @click="handleBackto(scope.row)"/>
          <i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="page.data_total | pageFilters" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!--对话框-->
    <el-dialog :visible.sync="dialogFormVisible" title="通过审核，设置洽谈流程">
      <!---->
      <div class="tab-title">
        <div class="tab-title-item tab-title-item-left">序号</div>
        <div class="tab-title-item tab-title-item-right">名称</div>
      </div>
      <el-form ref="steps" label-width="80px" class="demo-dynamic">
        <el-form-item
          v-for="(domain, index) in steps"
          :key="domain.key"
        >
          <span class="serialnumber">{{ ++index }}</span>
          <el-input v-model="domain.process_name" :disabled = "index == 1 || index == steps.length" class="process-input"/>
          <i v-if="index != 1 && index != steps.length" class="el-icon-delete el-icon" @click.prevent="removeDomain(domain)"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain">新增步骤</el-button>
        </el-form-item>
      </el-form>
      <!--添加-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          content="洽谈流程为可选项，点击跳过使用默认设置">
          <el-button slot="reference" @click="handleSkipset">跳 过</el-button>
        </el-popover>
        <el-button type="primary" @click="handleSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import waves from '@/directive/waves' // 水波纹指令
import { state0list, delstate0, shen } from '@/api/business/state0.js' // 获取列表、删除 、审核通过、设置流程
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
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: null,
        type: null
      },
      // 设置洽谈流程--弹出框
      dialogFormVisible: false,
      formLabelWidth: '120px',
      steps: [
        { process_name: '审核通过' },
        { process_name: '电话邀约' },
        { process_name: '约见详谈' },
        { process_name: '洽谈成功' }
      ],
      selectitem: null,
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
      state0list(this.listQuery).then((res) => {
        this.list = res.list
        this.page = res.page
      })
    },
    getCategory() {
      fecthcategory(this, this.listQuery) // 初始化类型 分类 api
    },
    // *****************************列表查询相关**********************//
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
    // 显示 流程设置框 设置选中项
    handleUpdate(row) {
      this.selectitem = row
      this.dialogFormVisible = true
    },
    // 审核不通过
    handleBackto(row) {
      this.$prompt('审核未通过，请输入退回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value === '' || value == null) {
          this.$message({
            type: 'warning',
            message: '请输入退回原因'
          })
          return false
        } else {
          shen('0', row.id, value, null).then((res) => {
            if (res.status.state === 'success') {
              this.getList()
              this.$message({
                type: 'success',
                message: '提交成功'
              })
            }
          })
        }
      }).catch(() => {
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将删除该业务信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delstate0(row.id).then((res) => {
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
    // 设置服务流程部分
    removeDomain(item) {
      var index = this.steps.indexOf(item)
      if (index !== -1) {
        this.steps.splice(index, 1)
      }
    },
    addDomain() {
      // 直接添加用push  在最后一条前插入用splice
      // this.steps.push({
      var lent = this.steps.length
      this.steps.splice(lent - 1, 0, {
        process_name: '',
        key: Date.now()
      })
    },
    // 跳过流程设置 同提交
    handleSkipset() {
      var selectitem = this.selectitem
      this.$confirm('跳过洽谈设置，使用默认流程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormVisible = false
        shen('1', selectitem.id, null, this.steps).then((res) => {
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
    // 提交流程设置 并通过审核
    handleSubmit() {
      var selectitem = this.selectitem
      this.$confirm('确认该业务信息通过审核并提交洽谈流程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogFormVisible = false
        shen('1', selectitem.id, null, this.steps).then((res) => {
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
  .tab-title{
    max-width: 700px;
    min-width: 500px;
    margin: auto;
    border-bottom: 1px solid #e0e0e0;
    .tab-title-item{
      display: inline-block;
      padding: 10px;
      color: #797979;
    }
    .tab-title-item-left{
      width: 200px;
      text-align: center;
    }
    .tab-title-item-right{
      width: 200px;
      text-align: center;
    }
  }
  .demo-dynamic{
    padding-top: 30px;
    max-width: 700px;
    min-width: 500px;
    margin: auto;
    .serialnumber{
      border: 1px solid #b2b2b2;
      /*padding: 8px 12px;*/
      display: inline-block;
      border-radius: 1px;
      margin-right: 50px;
      width: 34px;
      height: 34px;
      line-height: 34px;
      text-align: center;
    }
    .process-input{
      /*border: 1px solid black;*/
      width:300px;
      margin-right: 40px;
    }
    .el-icon{
      margin:0 5px;
      color: rgba(162, 162, 162, 0.99);
      border: 1px solid rgba(162, 162, 162, 0.99);
      padding: 4px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;

    }
  }
</style>
