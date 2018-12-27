<template>
  <div class="app-container">
    <!--<div class="filter-container">-->
    <el-tabs v-model="activeName" class="tab-scroll add-container">
      <el-tab-pane label="基本信息" class="el-tab-pane" name="first">
        <keep-alive>
          <div name="first">
            <el-row :gutter="3" style="padding-top: 16px;margin-bottom: 0px;">
              <el-col :span="5">
                <div class="grid-content  grid-content-l" style="min-height: 380px;">
                  业务信息
                </div>
              </el-col>
              <el-col :span="19" class="grid-content-wrapper">
                <div class="grid-content grid-content-r" style="min-height: 380px;">
                  <el-form :model="formDataProject" label-position="right" label-width="100px" style="padding: 0 30px">
                    <el-form-item label="项目名称">
                      <el-input v-model="formDataProject.name" placeholder="请输入项目名称"/>
                    </el-form-item>
                    <el-form-item label="项目副标题">
                      <el-input v-model="formDataProject.subname" placeholder="请输入项目副标题"/>
                    </el-form-item>
                    <el-form-item label="项目分类">
                      <el-select v-model="formDataProject.category_id" style="width: 100%;" placeholder="请选择项目分类">
                        <el-option v-for="item in processTypeOptions" :key="item.id" :label="item.title" :value="item.id"/>
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
                      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
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
            </el-row>
            <el-row :gutter="3" style="padding-top:0px ;border-top:3px solid rgb(239,244,250) ;">
              <el-col :span="5" style="height: 100%;">
                <div class="grid-content  grid-content-l" style="min-height: 530px;">
                  项目信息
                </div>
              </el-col>
              <el-col :span="19" class="grid-content-wrapper">
                <div class="grid-content grid-content-r" style="min-height: 530px">
                  <el-form :model="formDataProject" label-position="right" label-width="140px" style="padding: 0 30px">
                    <el-form-item label="佣金比例">
                      <el-input v-model="formDataProject.vt_price_percent" class="info-yj-input" placeholder="输入数字" type="number"/>
                      <span class="info-yj-input-text">%</span>
                    </el-form-item>
                    <el-form-item label="预计佣金">
                      <el-input v-model="formDataProject.min_price" class="info-yj-input" placeholder="输入数字" type="number"/>
                      <span class="info-yj-input-text">---</span>
                      <el-input v-model="formDataProject.max_price" class="info-yj-input" placeholder="输入数字" type="number"/>
                    </el-form-item>
                    <el-form-item label="已发放金额(虚拟)">
                      <el-input v-model="formDataProject.vt_price_already" class="info-yj-input" placeholder="输入数字" type="number"/>
                      <span class="info-yj-input-text">元</span>
                    </el-form-item>
                    <el-form-item label="已成交业务(虚拟)">
                      <el-input v-model="formDataProject.vt_price_total" class="info-yj-input" placeholder="输入数字" type="number"/>
                      <span class="info-yj-input-text">单</span>
                    </el-form-item>
                    <el-form-item label="已申请人数(虚拟)">
                      <el-input v-model="formDataProject.vt_project_count" class="info-yj-input" placeholder="输入数字" type="number"/>
                      <span class="info-yj-input-text">人</span>
                    </el-form-item>
                    <el-form-item label="项目缩略图">
                      <upload-listimg/>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="项目详情" class="el-tab-pane" name="second">
        <keep-alive>
          <!--<tab-pane v-if='activeName=="second"' name="second">-->
          <el-row :gutter="3" style="padding-top: 20px;margin-bottom: 0px;background: white;">
            <el-col :span="5">
              <div class="grid-content  grid-content-l" style="min-height: 800px">
                业务信息
              </div>
            </el-col>
            <el-col :span="19" class="grid-content-wrapper">
              <div class="grid-content grid-content-r" style="max-width: 900px;">
                <h6 class="uploadimg-h6">1.添加项目详情简介</h6>
                <tinymce :height="360" v-model="formDataProject.description"/>
                <h6 class="uploadimg-h6">2.上传项目图片(轮播展示用,最多上传5张,推荐尺寸375*165)</h6>
                <upload-banner :filelist="filelist" :imgid="img" proptitle="修改项目轮播图" size="375*165" @childupload="childupload"></upload-banner>
              </div>
            </el-col>
          </el-row>
          <!--</tab-pane>-->
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="流程设置" name="third" class="el-tab-pane">
        <keep-alive>
          <el-row :gutter="3" style="padding-top: 20px;margin-bottom: 0px;background: white;">
            <el-col :span="5" style="height: 100%;">
              <div class="grid-content  grid-content-l">
                流程设置
              </div>
            </el-col>
            <el-col :span="19">
              <div class="grid-content grid-content-r" style="border-left: 3px solid rgb(239,244,250);">
                <!--<set-process/>-->
                <div> <!--//设置流程-->
                  <div class="tab-title">
                    <div class="tab-title-item tab-title-item-left">序号</div>
                    <div class="tab-title-item tab-title-item-right">名称</div>
                  </div>
                  <el-form ref="formDataProject" :model="formDataProject" label-width="80px" class="demo-dynamic">
                    <el-form-item
                      v-for="(domain, index) in formDataProject.process"
                      :key="domain.id"
                    >
                      <span class="serialnumber">{{ ++index }}</span>
                      <el-input v-model="domain.process_name" :readonly="index == 1 || index == formDataProject.process.length" class="process-input"/>
                      <i v-if="index != 1 && index != formDataProject.process.length" class="el-icon-delete el-icon" @click.prevent="removeDomain(domain)"/>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="addDomain">新增步骤</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </el-col>
          </el-row>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <el-row style="background: white;padding:6px 10px;text-align: right;position: absolute;left: 10px;right: 0px;bottom: 0px;border-top: 3px solid rgb(239,244,250);">
      <el-col :span="24">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-col>
    </el-row>
    <!--</div>-->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import UploadListimg from './components/UploadaddListimg'
import UploadBanner from './components/UploadBanner'
import Tinymce from '@/components/Tinymce'
import { addproject } from '@/api/project/manage.js' // 获取分类列表,提交信息
import waves from '@/directive/waves'
import { fecthcategory } from '@/api/project/index.js' // 初始化  类型分类  列表
export default {
  directives: {
    waves
  },
  components: {
    UploadListimg,
    UploadBanner,
    Tinymce
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      activeName: 'first',
      // 自定义标签相关
      inputVisible: false,
      inputValue: '',
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  computed: {
    filelist() {
      let imgurlArr = this.$store.state.projectlist.add.slide_path
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
      img: state => state.projectlist.add.slide.toString(), // 获取 图片id
      processTypeOptions: state => state.projectindex.list, // 分类列表，下拉搜索框选项
      formDataProject: state => state.projectlist.add // 项目详情
    })
  },
  created() {
    this.getCategory()
  },
  methods: {
    // 自定义标签
    handleClose(tag) {
      this.formDataProject.tags.splice(this.formDataProject.tags.indexOf(tag), 1)
    },
    getCategory() {
      fecthcategory(this, this.listQuery) // 初始化类型 分类 api
    },
    showInput() {
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
    // 新增项目
    handleSubmit() {
      this.$confirm('新增项目提示, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        addproject(this.formDataProject).then((res) => {
          if (res.status.state === 'success') {
            this.$store.dispatch('projectlist/resettemp') // 重置 项目temp  api
            this.$router.push({ path: '/project/manage' })
            this.getList()
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          }
        })
      }).catch(() => {
      })
    },
    // *******************新增流程部分******************//
    removeDomain(item) {
      var index = this.formDataProject.process.indexOf(item)
      if (index !== -1) {
        this.formDataProject.process.splice(index, 1)
      }
    },
    addDomain() {
      // 直接添加用push  在最后一条前插入用splice
      // this.formDataProject.process.push({
      var lent = this.formDataProject.process.length
      this.formDataProject.process.splice(lent - 1, 0, {
        key: Date.now(),
        process_name: '',
        order: ''
      })
    },
    // 子组件调用 上传成功回调
    childupload(parmas) {
      this.$store.dispatch('projectlist/addbannerid', parmas)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /*start*/
  .app-container {
    padding: 10px;
    width: 100%;
    height: 100%;
    margin-right: -12px;
    .add-container{
      position: absolute;
      left: 10px;
      right: 0px;
      top: 10px;
      bottom: 51px;
      background: white;
      overflow-y: scroll;
    }
    /*overflow-y: scroll;*/
    .el-tab-pane {
      margin-top: -16px;
      .grid-content {
        border-radius: 4px;
        vertical-align: center;
        padding: 16px;
        min-height: 659px;
        background: white;
        .uploadimg-h6 {
          font-size: 14px;
          color: #606266;
          font-weight: normal;
        }
      }
      .grid-content-l {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #181818;
        font-size: 14px;
      }
      .grid-content-wrapper {
        border-left: 3px solid rgb(239,244,250);
        background: white;
        .grid-content-r {
          max-width: 800px;
          margin: auto;
          .info-yj-input {
            width: 160px;
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
    .tab-title {
      max-width: 700px;
      min-width: 500px;
      margin: auto;
      border-bottom: 1px solid #e0e0e0;
      .tab-title-item {
        display: inline-block;
        padding: 10px;
        color: #797979;
      }
      .tab-title-item-left {
        width: 200px;
        text-align: center;
      }
      .tab-title-item-right {
        width: 200px;
        text-align: center;
      }
    }
    .demo-dynamic {
      padding-top: 30px;
      max-width: 700px;
      min-width: 500px;
      margin: auto;
      .serialnumber {
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
      .process-input {
        /*border: 1px solid black;*/
        width: 300px;
        margin-right: 40px;
      }
      .el-icon {
        margin: 0 5px;
        color: rgba(162, 162, 162, 0.99);
        border: 1px solid rgba(162, 162, 162, 0.99);
        padding: 4px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;

      }
    }

    ::-webkit-scrollbar-track{
      background: white;
    }
  }
</style>
