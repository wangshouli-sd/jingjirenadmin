<template>
  <div class="app-container">
    <el-row class="el-row">
      <el-col :span="4">
        <div class="grid-content grid-content-l">
          后台logo
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content grid-content-r">
          <upload-listimg :filelist="filelist" proptitle="上传后台logo" size="60*60" @childupload="childupload"></upload-listimg>
        </div>
      </el-col>
    </el-row>
    <el-row class="el-row">
      <el-col :span="4">
        <div class="grid-content grid-content-l">
          页面顶部标题
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content grid-content-r">
          <el-form ref="form" :mode="pageparmas">
            <el-form-item>
              <el-input v-model="pageparmas.pagetitle" placeholder="页面顶部标题"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div style="background: #ffffff;text-align: right;margin-top: 3px;padding: 20px;">
        <el-button type="primary" @click="handleUpload">提交</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
import UploadListimg from '@/components/Upload/UploadListimg'
import waves from '@/directive/waves'
import { mapState } from 'vuex'
import { showtitleparams, settitleparams } from '@/api/set/index'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: {
    UploadListimg
  },
  data() {
    return {
      form: {},
      customform: {},
      bannerlist: [],
      dialogFormVisible: false, // 新增项输入框显示状态
      dialogStatus: '', // 添加or修改   textMap[dialogStatus]
      textMap: {
        update: '修改',
        create: '添加'
      },
      selectid: '',
      projectlist: []
    }
  },
  computed: {
    filelist() {
      let imginfo = this.$store.state.setindex.logoimg
      let files = []
      if (imginfo.path !== '') {
        files.push({
          id: imginfo.id,
          name: imginfo.name,
          url: imginfo.path
        })
        return files
      } else {
        return []
      }
    },
    ...mapState({
      pageparmas: state => state.setindex.pageparmas,
      logoid: state => state.setindex.logoimg.id
    })
  },
  created() {
    this.handleinit()
  },
  methods: {
    // 初始化获取参数
    handleinit() {
      showtitleparams().then((res) => {
        this.$store.dispatch('setindex/setpageparmas', res)
      })
    },
    // 提交
    handleUpload() {
      this.$confirm('确认提交修改内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        settitleparams({ id: this.logoid, title: this.pageparmas.pagetitle }).then((res) => {
          if (res.status.state === 'success') {
            document.title = this.pageparmas.pagetitle
            this.$message({
              type: 'success',
              message: '设置成功!'
            })
          }
        })
      }).catch(() => {
      })
    },
    // 子组件调用 上传成功回调
    childupload(parmas) {
      this.$store.dispatch('setindex/setpagelogo', parmas)
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
  .app-container{
    margin: 10px;
    background: white;

    .grid-content{
      /*border: 1px solid black;*/
    }
    .el-row{
      padding: 20px;
      .grid-content-l{
        /*border: 1px solid black;*/
        text-align: right;
        font-size: 14px;
        color: #4c4c4c;
        padding-right: 20px;
      }
      .grid-content-r{
        padding-left: 20px;
        .el-input-group__prepend{
          width: 200px !important;
        }
      }
    }

  }
</style>
