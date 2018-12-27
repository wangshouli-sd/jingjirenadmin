<template>
  <div class="app-container">
    <!--顶部操作按钮-->
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">新增分类</el-button>
    </div>
    <!--表格-->
    <el-table
      v-loading="listLoading"
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      cell-class-name="tdclassname"
      style="width: 100%"
      border>
      <!--<el-table-column type="selection" align="center" width="50"/>-->
      <el-table-column label="序号" type="index" width="60" align="center"/>
      <el-table-column prop="title" label="项目名称" align="center">
        <template slot-scope="scope">【{{ scope.row.title }}】</template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_open | statusFilter">{{ scope.row.is_open | statusvalueFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isShowIndex" label="首页推荐" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_index | statusFilter">{{ scope.row.is_index | statusindexFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="创建时间" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column prop="control" align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <i class="el-icon-edit el-icon" @click="handleUpdate(scope.row)"/>
          <i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="page.data_total | pageFilters" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <!--输入框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="title" placeholder="项目名称">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item label="展示状态">
          <el-select v-model="temp.is_open" class="filter-item" placeholder="是否展示">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item == '启用'?'1':'0'"/>
          </el-select>
        </el-form-item>
        <el-form-item label="首页展示">
          <el-select v-model="temp.is_index" class="filter-item" placeholder="首页推荐">
            <el-option v-for="item in statusShowIndex" :key="item " :label="item" :value="item == '展示'?'1':'0'"/>
          </el-select>
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input :autosize="{ minRows: 4, maxRows: 10}" v-model="temp.description" type="textarea" placeholder="项目描述"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="handlecreateData">添加</el-button>
        <el-button v-else type="primary" @click="handleupdateData">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import waves from '@/directive/waves'
import { fecthcategoryall, addcategory, delcategory, onecategory, editcategory } from '@/api/project/index.js' // 获取分类列表 、新增分类、删除分类、一条分类详情、修改分类
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
    statusvalueFilter(status) {
      const statusMap = ['禁用', '启用']
      return statusMap[status]
    },
    statusindexFilter(status) {
      const statusMap = ['隐藏', '展示']
      return statusMap[status]
    },
    pageFilters(page) {
      return parseInt(page)
    }
  },
  data() {
    return {
      total: null,
      listLoading: false,
      listQuery: { // 分页相关
        page: 1,
        limit: 10
      },
      statusOptions: ['启用', '禁用'], // 新增项目选项
      statusShowIndex: ['展示', '隐藏'],
      dialogFormVisible: false, // 新增项输入框显示状态
      dialogStatus: '', // 添加or修改   textMap[dialogStatus]
      textMap: {
        update: '修改项目',
        create: '创建新项目'
      },
      selectid: '',
      temp: {}
    }
  },
  computed: {
    ...mapState({
      list: state => state.projectindex.list,
      page: state => state.projectindex.page
    })
  },
  created() {
    this.getList() // 初始化分类列表
  },
  methods: {
    getList() {
      fecthcategoryall(this.listQuery).then((res) => {
        this.$store.dispatch('projectindex/getcategory', res)
      })
    },
    // 分页、查询、加载相关
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
    // 新建分类
    handleCreate() {
      this.temp.uniacid = null
      this.temp.title = ''
      this.temp.is_open = '1'
      this.temp.is_index = '1'
      this.temp.description = ''

      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    // 提交新建
    handlecreateData() {
      this.$confirm('新增分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addcategory(this.temp).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          }
        })
        this.dialogFormVisible = false
      }).catch(() => {
      })
    },
    // 更新分类
    handleUpdate(row) {
      onecategory(row.id).then((res) => {
        this.temp = res
      })
      this.selectid = row.id
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    // 提交更新
    handleupdateData() {
      this.$confirm('更新修改内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editcategory(this.temp).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '更新成功！'
            })
          }
        })
        this.dialogFormVisible = false
      }).catch(() => {
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将删除该分类相关信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delcategory(row.id).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
          } else if (res.status.state === 'project') {
            this.$message({
              type: 'error',
              message: '该类目下还有项目！不能删除！'
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
  .filter-container{
    text-align: left;
    background: #ffffff;
    padding: 16px;
  }

</style>
