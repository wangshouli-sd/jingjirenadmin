<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" style="width: 200px;" class="filter-item" placeholder="标题" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;float: left;" type="primary" icon="el-icon-plus" @click="handleCreate">新建公告</el-button>
    </div>
    <el-table :data="list" ref="multipleTable" border fit style="width: 100%;min-height:300px;">
      <el-table-column align="center" type="index" label="序号" width="65"></el-table-column>
      <el-table-column width="180px" prop="time" align="center" label="时间">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="标题">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">【{{ scope.row.title }}】</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="阅读数" width="95">
        <template slot-scope="scope">
          <span v-if="scope.row.look">{{ scope.row.look }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_open | statusFilter">{{ scope.row.is_open === '1'?'显示':'隐藏' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <i class="el-icon-edit el-icon" @click="handleUpdate(scope.row)"/>
          <i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="page.data_total | pageFilters" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!--输入框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="1000px">
      <el-form :model="temp" label-position="left" label-width="70px" style="min-width: 400px;max-width: 800px; margin-left:50px;">
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" placeholder="公告标题"/>
        </el-form-item>
        <el-form-item label="展示状态" >
          <el-select v-model="temp.is_open" class="filter-item" placeholder="是否展示">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item === '启用'?'1':'0'"/>
          </el-select>
        </el-form-item>
        <el-form-item label="阅读次数" style="width: 270px">
          <el-input v-model="temp.look" placeholder="阅读次数(虚拟)" />
        </el-form-item>
        <el-form-item v-if="dialogFormVisible" label="公告详情">
          <tinymce ref="tinymce" :height="360" v-model="temp.content"/>
        </el-form-item>
        <el-form-item label="缩略图" prop="description">
          <upload-listimg :filelist="filelist" proptitle="公告缩略图" size="118*70" @childupload="childupload"></upload-listimg>
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
import waves from '@/directive/waves'
import UploadListimg from '@/components/Upload/UploadListimg'
import tinymce from '@/components/Tinymce'
import { mapState } from 'vuex'
import { fecthnotice, addnotice, editnotice, delnotice } from '@/api/announcement/index.js' // 获取列表、新增、修改、删除
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: {
    UploadListimg,
    'tinymce': tinymce
  },
  filters: {
    statusFilter(status) {
      const statusMap = ['danger', 'success']
      return statusMap[status]
    },
    typeFilter(type) {
      return type
    },
    pageFilters(page) {
      return parseInt(page)
    }
  },
  data() {
    return {
      listLoading: false,
      listQuery: { // 分页相关
        page: 1,
        limit: 10,
        title: undefined
      },
      statusOptions: ['启用', '禁用'], // 新增项目选项
      statusShowIndex: ['展示', '隐藏'],
      dialogFormVisible: false, // 新增项输入框显示状态
      dialogStatus: '', // 添加or修改   textMap[dialogStatus]
      textMap: {
        update: '修改公告',
        create: '创建新公告'
      },
      list: [],
      page: {},
      temp: {
        id: '',
        uniacid: '',
        title: '',
        img: '',
        content: '',
        look: '',
        is_open: '',
        imgurl: [],
        time: ''
      }
    }
  },
  computed: {
    filelist() {
      let imgurlArr = this.temp.imgurl
      let imgid = this.temp.img
      let files = []
      if (imgid) {
        files.push({
          id: imgid,
          name: '',
          url: imgurlArr[0]
        })
        return files
      } else {
        return []
      }
    }
  },
  created() {
    this.getList()
  },
  activated() {
    this.getList()
  },
  methods: {
    getList() {
      fecthnotice(this, this.listQuery).then((res) => {
        this.list = res.list
        this.page = res.page
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
    // 新建公告
    handleCreate() {
      this.temp = {
        id: '',
        uniacid: '',
        title: '',
        img: '',
        content: '',
        look: '',
        is_open: '',
        imgurl: [],
        time: ''
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    // 提交新建公告
    handlecreateData() {
      addnotice(this.temp).then((res) => {
        if (res.status.state === 'success') {
          this.getList()
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        }
      })
      this.dialogFormVisible = false
    },
    // 更新公告 获取一条公告详情
    handleUpdate(row) {
      this.temp = row
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    // 提交修改公告
    handleupdateData(row) {
      editnotice(this.temp).then((res) => {
        if (res.status.state === 'success') {
          this.getList()
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
      })
      this.dialogFormVisible = false
    },
    // 删除公告
    handleDelete(row) {
      this.$confirm('此操作将删除该公告相关信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delnotice(row.id).then((res) => {
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
    // 子组件调用 上传成功回调
    childupload(parmas) {
      this.temp.img = parmas.imgid
      this.temp.imgurl[0] = parmas.file.url
    }
  }
}
</script>
<style scoped>
  .el-icon{
    margin:0 5px;
    border: 1px solid rgba(162, 162, 162, 0.99);
    padding: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    cursor: pointer;
  }
  .filter-container{
    background: #ffffff;
    padding: 16px;
    text-align: right;
  }

</style>
