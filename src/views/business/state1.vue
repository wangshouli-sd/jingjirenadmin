<template>
  <div class="app-container" style="">
    <div class="filter-container" style="background: #ffffff;padding: 16px;">
      <el-input v-model="listQuery.title" style="width: 200px;" class="filter-item" placeholder="联系人"
                @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" clearable class="filter-item" style="width: 130px" placeholder="项目分类">
        <el-option v-for="item in processTypeOptions" :key="item.title" :label="item.title" :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <!--<el-button v-waves class="filter-item" type="danger" icon="el-icon-delete" @click="handleFilter">批量删除</el-button>-->
    </div>
    <!--表格-->
    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      border>
      <el-table-column label="序号" type="index" width="60" align="center"/>
      <!--<el-table-column type="selection" align="center" width="50"/>-->
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
                  <el-tag v-for="item in scope.row.tags" :key="item.key" size="mini" type="success"
                          style="margin-right: 3px;">{{ item }}
                  </el-tag>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="业务联系人" width="120" align="center"/>
      <el-table-column prop="userphone" label="联系方式" width="120" align="center"/>
      <el-table-column label="提交时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column prop="expect_commission" label="预计佣金" width="100" align="center">
        <template slot-scope="scope">
          <span style="color: red;">￥{{ scope.row.min_price }}--{{ scope.row.max_price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="经纪人" width="100" align="center"/>
      <el-table-column prop="state" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag>洽谈中</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="process" label="洽谈进度" width="160" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.processname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="更新洽谈进度" placement="top">
            <i class="el-icon-refresh el-icon" @click="handleUpdate(scope.row)"/>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="洽谈完成并进入待传合同流程" placement="top">
            <i class="el-icon-check el-icon" @click="handleComplate(scope.row)"/>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="洽谈失败" placement="top">
            <i class="el-icon-close el-icon" @click="handleBackto(scope.row)"/>
          </el-tooltip>
          <router-link :to="{path:'/business/detailqiatan',query:{id:scope.row.id}}">
            <i class="el-icon-view el-icon" @click="handledetail(scope.row)"/>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="page.data_total | pageFilters" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"/>
    </div>
    <!--弹出框--洽谈流程进度更改-->
    <el-dialog :visible.sync="dialogFormVisible" title="更新洽谈进度">
      <el-steps :model="steps" :active="active" align-center finish-status="success" style="min-width: 500px;">
        <el-step v-for="item in steps" :title="item.process_name" :description="item | processStateFilter"/>
      </el-steps>
      <!--添加-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlenext">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { delstate1, process, processq, state1list } from '@/api/business/state1.js' // 获取列表、删除、更新流程进度、洽谈完成
import { fecthcategory } from '@/api/project/index.js' // 初始化  类型分类  列表
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: {},
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    },
    timeFilter(time) {
      if (time === '' || time == null) {
        return '--/--'
      } else {
        return time
      }
    },
    pageFilters(page) {
      return parseInt(page)
    },
    processStateFilter(item) {
      switch (item.state) {
        case '3':
          return item.finish_time
          break;
        case '2':
          return '进行中'
          break;
        default:
          return '未开始'
      }
    }
  },
  data() {
    return {
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        title: undefined,
        type: undefined
      },
      list: [],
      page: {},
      // 设置洽谈流程
      dialogFormVisible: false,
      dialogProcessVisible: false,
      selectitem: null, // 选中项
      active: '', // 当前进行的流程
      steps: [] // 选中项的流程
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
      state1list(this.listQuery).then((res) => {
        this.listLoading = false
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
    // 展示 选中项 流程 从row中提取
    handleUpdate(row) {
      this.selectitem = row
      this.steps = this.selectitem.process
      this.dialogFormVisible = true
      var step = this.selectitem.process
      if (step[step.length - 1].state === '3') {
        this.active = step.length
      } else {
        for (var i = 0; i < step.length; i++) { // 判断当前进行到哪一步
          if (step[i].state === '2') {
            this.active = i
            break
          }
        }
      }
    },
    // 删除 一条数据
    handleDelete(row) {
      this.$confirm('此操作将删除该项目相关信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delstate1(row.id).then((res) => {
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
    // 更新流程 进行下一步
    handlenext() {
      if (this.active > this.steps.length - 1) {
        this.$message({
          message: '洽谈阶段已完成,点击提交进入上传合同阶段',
          type: 'success'
        })
      } else {
        this.$confirm('更新洽谈流程进度, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = false
          process(this.steps[this.active].id).then((res) => {
            if (res.status.state === 'success') {
              this.getList()
              this.$message({
                type: 'success',
                message: '更新成功!'
              })
            }
          })
        }).catch(() => {
        })
      }
    },
    // 洽谈成功更新状态
    handleComplate(row) {
      let process = row.process[row.process.length - 1]
      if (process.state === '3') {
        this.$confirm('洽谈成功，进入上传合同流程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          processq('1', row.id, null).then((res) => {
            if (res.status.state === 'success') {
              this.getList()
              this.$message({
                type: 'success',
                message: '更新成功!'
              })
            }
          })
        }).catch(() => {
        })
      } else {
        this.$message({
          type: 'warning',
          message: '洽谈步骤未完成'
        })
      }
    },
    // 洽谈失败
    handleBackto(row) {
      this.$prompt('更新洽谈状态，请输入洽谈失败原因原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (value === '' || value == null) {
          this.$message({
            type: 'warning',
            message: '请输入洽谈失败原因原因'
          })
          return false
        } else {
          processq('0', row.id, value).then((res) => {
            if (res.status.state === 'success') {
              this.getList()
              this.$message({
                type: 'success',
                message: '更新成功!'
              })
            }
          })
        }
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
    cursor: pointer;

  }

  .ywitem-l {
    text-align: right;
    .ywitem-l-img {
      width: 50px;
      height: 40px;
      border-radius: 10px;
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
</style>
