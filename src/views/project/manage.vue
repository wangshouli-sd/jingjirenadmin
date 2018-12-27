<template>
  <div class="app-container" style="padding: 20px;">
    <div class="filter-container" style="background: #ffffff;padding: 16px;text-align: right">
      <router-link to="/project/add">
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" style="float: left;">添加新项目
        </el-button>
      </router-link>
      <el-input v-model="listQuery.title" style="width: 200px;" class="filter-item" placeholder="项目名称"
                @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" clearable class="filter-item" style="width: 130px" placeholder="项目分类">
        <el-option v-for="item in processTypeOptions" :key="item.id" :label="item.title" :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete" @click="handleBatchDelete">批量删除
      </el-button>
    </div>
    <!--表格-->
    <el-table ref="multipleTable" :data="list" tooltip-effect="dark" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" align="center" width="50"/>
      <!--<el-table-column prop="id" label="项目ID" width="100" align="center"/>-->
      <el-table-column prop="order" label="排序" width="60" align="center"/>
      <el-table-column prop="name" label="项目名称" align="center" min-width="200px">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="6" class="ywitem-l">
              <div class="">
                <img :src="scope.row.img_path" class="ywitem-l-img" alt="">
              </div>
            </el-col>
            <el-col :span="18" class="ywitem-r">
              <div class="">
                <div class="ywitem-r-title">{{ scope.row.name }}</div>
                <div>
                  <el-tag v-for="item in scope.row.tags" :key="item.key" type="success" size="mini"
                          style="margin-right: 5px">{{ item }}
                  </el-tag>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="项目分类" width="120" align="center"/>
      <el-table-column prop="time" label="提交时间" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column prop="proportion" label="项目佣金比例" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.vt_price_percent }}%
        </template>
      </el-table-column>
      <el-table-column prop="commission" label="预计佣金" width="180" align="center">
        <template slot-scope="scope">
          <div style="color: #F56C6C;">￥{{ scope.row.min_price }}-￥{{ scope.row.max_price }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_open | statusFilter">{{ scope.row.is_open == '1'?'启用':'禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <i class="el-icon-edit el-icon" @click="handleUpdate(scope.row)"/>
          <i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     :total="page.data_total | pageFilters" background
                     layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"/>
    </div>
    <!--弹出修改框-->
    <el-dialog :visible.sync="dialogFormVisible" title="项目修改" width="1000px">
      <el-tabs v-model="activeName" class="tab-scroll">
        <el-tab-pane label="基本信息" class="el-tab-pane" name="first">
          <keep-alive>
            <el-row :gutter="3" style="padding-top: 20px;margin-bottom: 0px;">
              <el-col :span="24" class="grid-content-wrapper">
                <div class="grid-content grid-content-r">
                  <el-form :model="formDataProject" label-position="right" label-width="140px">
                    <el-form-item label="项目名称">
                      <el-input v-model="formDataProject.name" placeholder="请输入项目名称"/>
                    </el-form-item>
                    <el-form-item label="项目副标题">
                      <el-input v-model="formDataProject.subname" placeholder="请输入项目副标题"/>
                    </el-form-item>
                    <el-form-item label="项目分类">
                      <el-select v-model="formDataProject.category_id" placeholder="请选择项目分类">
                        <el-option v-for="item in processTypeOptions" :key="item.id"
                                   :label="item.title" :value="item.id"/>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="项目标签">
                      <el-tag
                        v-for="tag in formDataProject.tags"
                        :key="tag"
                        :disable-transitions="false"
                        closable
                        @close="handleClose(tag)">
                        {{ tag }}
                      </el-tag>
                      <el-input
                        v-if="inputVisible"
                        ref="saveTagInput"
                        v-model="inputValue"
                        class="input-new-tag"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                      />
                      <el-button v-else class="button-new-tag" size="small" @click="showInput">+添加标签</el-button>
                    </el-form-item>
                    <el-form-item label="状态">
                      <el-select v-model="formDataProject.is_open" placeholder="请选择项目启用状态">
                        <el-option key="state1" label="启用" value="1"/>
                        <el-option key="state0" label="禁用" value="0"/>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="排序">
                      <el-input v-model="formDataProject.order" placeholder="设置显示顺序，输入数值，值越大显示越靠前"/>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
              <el-col :span="24" class="grid-content-wrapper">
                <div class="grid-content grid-content-r">
                  <el-form :model="formDataProject" label-position="right" label-width="140px">
                    <el-form-item label="佣金比例">
                      <el-input v-model="formDataProject.vt_price_percent" class="info-yj-input"
                                placeholder="输入数字"/>
                      <span class="info-yj-input-text">%</span>
                    </el-form-item>
                    <el-form-item label="预计佣金">
                      <el-input v-model="formDataProject.min_price" class="info-yj-input"
                                placeholder="输入数字"/>
                      <span class="info-yj-input-text">---</span>
                      <el-input v-model="formDataProject.max_price" class="info-yj-input"
                                placeholder="输入数字"/>
                    </el-form-item>
                    <el-form-item label="已发放金额(虚拟)">
                      <el-input v-model="formDataProject.vt_price_already" class="info-yj-input"
                                placeholder="输入数字"/>
                      <span class="info-yj-input-text">元</span>
                    </el-form-item>
                    <el-form-item label="已成交业务(虚拟)">
                      <el-input v-model="formDataProject.vt_price_total" class="info-yj-input"
                                placeholder="输入数字"/>
                      <span class="info-yj-input-text">单</span>
                    </el-form-item>
                    <el-form-item label="已申请人数(虚拟)">
                      <el-input v-model="formDataProject.vt_project_count" class="info-yj-input"
                                placeholder="输入数字"/>
                      <span class="info-yj-input-text">人</span>
                    </el-form-item>
                    <el-form-item label="项目缩略图">
                      <upload-listimg/>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="项目详情" class="el-tab-pane" name="second">
          <keep-alive>
            <el-row :gutter="3" style="padding-top: 20px;margin-bottom: 0px;">
              <el-col :span="24" class="grid-content-wrapper">
                <div class="grid-content grid-content-r grid-content-xm">
                  <h6 class="uploadimg-h6">1.添加项目详情简介</h6>
                  <div v-if="dialogFormVisible">
                    <tinymce :height="360" v-model="formDataProject.description"/>
                  </div>
                  <h6 class="uploadimg-h6">2.上传项目图片(轮播展示用,最多上传5张,推荐尺寸375*165)</h6>
                  <upload-banner :filelist="filelist" :imgid="img" proptitle="修改项目轮播图" size="375*165" @childupload="childupload"></upload-banner>
                </div>
              </el-col>
            </el-row>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="流程设置" class="el-tab-pane" name="third">
          <keep-alive>
            <el-row :gutter="3" style="padding-top: 20px;margin-bottom: 0px;">
              <el-col :span="24">
                <div class="grid-content grid-content-r grid-content-xm">
                  <set-process/>
                </div>
              </el-col>
            </el-row>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailFormUpdata">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SetProcess from './components/SetProcess'
import UploadListimg from './components/UploadListimg'
import UploadBanner from './components/UploadBanner'
import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves'
import { addproject, delproject, fecthproject, oneproject } from '@/api/project/manage.js' // 获取列表项目 、新增(修改)、删除项目、修改详情
import { fecthcategory } from '@/api/project/index.js' // 初始化  类型分类  列表
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
    pageFilters(page) {
      return parseInt(page)
    }
  },
  components: {
    SetProcess,
    UploadListimg,
    UploadBanner,
    Tinymce
  },
  data() {
    return {
      listLoading: false,
      listQuery: { // 分页查询相关
        page: 1,
        limit: 10,
        title: null,
        type: null
      },
      multipleSelection: null, // 多选项记录  批量删除用
      statusShowIndex: ['展示', '隐藏'],
      // *************************弹出框设置**********************//
      dialogFormVisible: false,
      selectitem: null,
      activeName: 'first',
      // 自定义标签相关
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    filelist() {
      let imgurlArr = this.$store.state.projectlist.post.slide_path
      let files = []
      for (var i = 0; i < imgurlArr.length; i++) {
        files.push({
          name: imgurlArr[i].name,
          url: imgurlArr[i].path,
          id: imgurlArr[i].id
        })
      }
      return files
    },
    ...mapState({
      list: state => state.projectlist.list, // 项目列表post
      page: state => state.projectlist.page, //
      processTypeOptions: state => state.projectindex.list, // 分类列表，下拉搜索框选项
      formDataProject: state => state.projectlist.post, // 项目详情
      img: state => state.projectlist.post.slide // 获取 图片id 初始化用
    })
  },
  created() {
    this.getList()
    this.getCategory()
  },
  methods: {
    getList() {
      fecthproject(this.listQuery).then((res) => {
        this.$store.dispatch('projectlist/getproject', res)
      })
    },
    getCategory() {
      fecthcategory(this, this.listQuery) // 初始化类型 分类 api
    },
    // *********************分页、查询、加载相关****start*********//
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
    // *******************分页、查询、加载相关************end****//
    // 修改展示详情
    handleUpdate(row) {
      oneproject(row.id).then((res) => {
        this.$store.dispatch('projectlist/oneproject', res)
      })
      this.dialogFormVisible = true
    },
    // 提交修改
    detailFormUpdata() {
      this.$confirm('确认提交修改内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addproject(this.formDataProject).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        })
        this.dialogFormVisible = false
      }).catch(() => {
      })
    },
    // 删除一条数据
    handleDelete(row) {
      this.$confirm('此操作将删除该项目相关信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delproject(row.id).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else if (res.status.state === 'task') {
            this.$message({
              type: 'error',
              message: '选择的项目下未完成业务！不能删除！'
            })
          }
        })
      }).catch(() => {
      })
    },
    // 点击多选
    handleSelectionChange(selection) {
      this.multipleSelection = selection
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
        delproject(mulid.join(',')).then((res) => {
          if (res.status.state === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else if (res.status.state === 'task') {
            this.$message({
              type: 'error',
              message: '选择的项目下还有业务！不能删除！'
            })
          }
        })
      }).catch(() => {
      })
    },
    // **************start******************添加标签部分方法*************//
    handleClose(tag) {
      this.formDataProject.tags.splice(this.formDataProject.tags.indexOf(tag), 1)
    },
    showInput() {
      if (this.formDataProject.tags.length > 5) {
        this.$message({
          type: 'warning',
          message: '最多添加5个标签'
        })
        return false
      }
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.formDataProject.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // **************end******************添加标签部分方法*************//
    // 子组件调用 上传成功回调
    childupload(parmas) {
      this.$store.dispatch('projectlist/setbannerid', parmas)
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

  .el-tab-pane {
    margin-top: -16px;
    .grid-content {
      vertical-align: center;
      padding: 16px;
      .uploadimg-h6 {
        font-size: 15px;
        color: #5b5b5b;
        font-weight: normal;
      }
    }
    .grid-content-wrapper {
      background: white;
      .grid-content-r {
        margin: auto;
        .info-yj-input {
          width: 100px;
        }
        .info-yj-input-text {
          color: #656565;
          font-size: 14px;
          padding: 0 10px;
        }
        /*标签*/
        .el-tag + .el-tag {
          margin-left: 10px;
        }
        .button-new-tag {
          margin-left: 10px;
          height: 32px;
          line-height: 30px;
          padding-top: 0;
          padding-bottom: 0;
        }
        .input-new-tag {
          width: 90px;
          margin-left: 10px;
          vertical-align: bottom;
        }
      }
    }
  }

</style>
