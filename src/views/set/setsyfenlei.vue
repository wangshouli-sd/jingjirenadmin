<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus"
                 @click="handleCreate">添加
      </el-button>
    </div>
    <el-table
      :data="list"
      border
      fit
      style="width: 100%;min-height:300px;">
      <el-table-column align="center" type="index" label="序号" width="65"></el-table-column>
      <el-table-column class-name="status-col" label="标题">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="副标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="关联分类">
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="图标">
        <template slot-scope="scope">
          <div style="width: 50px;height: 50px;-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;overflow: hidden;margin: auto;">
            <img :src="scope.row.path" style="width: 100%;height: 100%;" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <i class="el-icon-edit el-icon" @click="handleUpdate(scope.row)"/>
          <i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <!--输入框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="min-width: 400px;max-width: 700px; margin-left:50px;">
        <el-form-item label="标题" placeholder="分类标题">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="副标题" placeholder="推荐6个字左右">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item label="关联分类">
          <el-select v-model="temp.url" style="width: 100%;" clearable placeholder="请选择项目分类">
            <el-option v-for="item in processTypeOptions" :key="item.id" :label="item.title" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="图标" prop="description">
          <upload-listimg :filelist="filelist" proptitle="测试标题" size="56*56" @childupload="childupload"></upload-listimg>
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
import waves from '@/directive/waves' // 水波纹指令
import UploadListimg from '@/components/Upload/UploadListimg'
import { mapState } from 'vuex'
import { showsan, addsan, updatasan, delsan } from '@/api/set/index.js' // 获取列表、新增、修改、删除
import { fecthcategory } from '@/api/project/index.js' // 初始化  类型分类  列表
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: {
    UploadListimg
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
        limit: 20,
        title: undefined
      },
      dialogFormVisible: false, // 新增项输入框显示状态
      dialogStatus: '', // 添加or修改   textMap[dialogStatus]
      textMap: {
        update: '修改',
        create: '新增'
      }
    }
  },
  computed: {
    filelist() {
      let imginfo = this.$store.state.setindex.onesan
      let files = []
      if (imginfo.img) {
        files.push({
          id: imginfo.img,
          name: imginfo.img_name,
          url: imginfo.path
        })
      }
      return files
    },
    ...mapState({
      list: state => state.setindex.san,
      temp: state => state.setindex.onesan,
      processTypeOptions: state => state.projectindex.list // 分类列表，下拉搜索框选项
    })
  },
  created() {
    this.getparmas()
    this.getCategory()
  },
  methods: {
    getparmas() {
      showsan().then((res) => {
        this.$store.dispatch('setindex/setsan', res)
      })
    },
    getCategory() {
      fecthcategory(this, this.listQuery) // 初始化类型 分类 api
    },
    // 新建类别
    handleCreate() {
      this.$store.dispatch('setindex/resettemp') // 重置temp
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    // 提交新建
    handlecreateData() {
      addsan(this.temp).then((res) => {
        if (res.status.state === 'success') {
          this.getparmas()
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        }
      })
      this.dialogFormVisible = false
    },
    // 更新 获取一条 详情
    handleUpdate(row) {
      // onesan(this, row.id)
      this.$store.dispatch('setindex/onesan', row) // 获取一条详情 信息
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    // 提交修改
    handleupdateData(row) {
      updatasan(this.temp).then((res) => {
        if (res.status.state === 'success') {
          this.getparmas()
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
        }
      })
      this.dialogFormVisible = false
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delsan(row.id).then((res) => {
          if (res.status.state === 'success') {
            this.getparmas()
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
      this.$store.dispatch('setindex/settypeitem', parmas)
    }
  }
}
</script>
<style scoped>
  .el-icon {
    margin: 0 5px;
    border: 1px solid rgba(162, 162, 162, 0.99);
    padding: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    cursor: pointer;
  }

  .filter-container {
    background: #ffffff;
    padding: 16px;
    text-align: left;
  }

</style>
