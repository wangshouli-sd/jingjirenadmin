<template>
  <div class="app-container">
    <el-row class="el-row">
      <el-col :span="4">
        <div class="grid-content grid-content-l">
          首页轮播图
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content grid-content-r">
          <div class="filter-container">
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">添加轮播图
            </el-button>
          </div>
          <el-table
            :data="bannerlist"
            border
            fit
            style="width: 100%;">
            <el-table-column align="center" type="index" label="序号" width="65"></el-table-column>
            <el-table-column class-name="status-col" label="图片">
              <template slot-scope="scope">
                <div style="width: 80px;height: 50px;-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;overflow: hidden;margin: auto;">
                  <img :src="scope.row.path" style="width: 100%;height: 100%;" alt="">
                </div>
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="关联任务">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <i class="el-icon-edit el-icon" @click="handleUpdate(scope.row)"/>
                <i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row class="el-row">
      <el-col :span="4">
        <div class="grid-content grid-content-l">
          工作台首页图
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content grid-content-r">
          <upload-listimg :filelist="filelist" proptitle="测试标题" size="355*100" @childupload="childupload"></upload-listimg>
        </div>
      </el-col>
    </el-row>
    <el-row class="el-row">
      <el-col :span="4">
        <div class="grid-content grid-content-l">
          自定义字段
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content grid-content-r">
          <el-form ref="form" :model="customform" >
            <el-form-item>
              <el-input v-model="dic.dic" placeholder="佣金">
                <template slot="prepend">佣金</template>
              </el-input>
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

    <!--输入框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="min-width: 400px;max-width: 700px; margin-left:50px;">
        <el-form-item label="关联任务">
          <el-select v-model="temp.params" style="width: 100%;" filterable clearable placeholder="请选择一个项目作为跳转链接">
            <el-option v-for="item in projectlist" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="图片选择" prop="description">
          <upload-listimg :filelist="filelistbanner" proptitle="测试标题" size="355*100" @childupload="childuploadbanner
"></upload-listimg>
          <!--<upload-bannerimg></upload-bannerimg>-->
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
import UploadListimg from '@/components/Upload/UploadListimg'
import waves from '@/directive/waves'
import { mapState } from 'vuex'
import { getbannerlist, addbanneritem, setbanneritem, delbanneritem, fecthproject, setparams, showparams } from '@/api/set/index' // banner 列表， 添加一条， 修改一条， 删除一条
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
      let imgid = this.$store.state.setindex.img
      let imgPath = this.$store.state.setindex.imgPath
      let files = []
      if (imgid) {
        files.push({
          id: imgid,
          name: imgPath[0].name,
          url: imgPath[0].path
        })
        return files
      } else {
        return []
      }
    },
    filelistbanner() {
      let imginfo = this.$store.state.setindex.bannertemp
      let files = []
      if (imginfo.img_id) {
        files.push({
          id: imginfo.img_id,
          name: imginfo.img_name,
          url: imginfo.img_patch
        })
        return files
      } else {
        return []
      }
    },
    ...mapState({
      dic: state => state.setindex, // 获取  自定义的佣金
      temp: state => state.setindex.bannertemp,
      img: state => state.setindex.img, // 获取 banner id
      imgPath: state => state.setindex.imgPath // 获取  banner imgpath
    })
  },
  created() {
    this.handleinit()
    this.handlegetproject()
    this.handleinitdic()
  },
  methods: {
    // 初始化获取banner
    handleinit() {
      let that = this
      getbannerlist(this).then((res) => {
        that.bannerlist = res
      })
    },
    handleinitdic() {
      showparams(this).then((res) => {
        this.$store.dispatch('setindex/setindeximg', res)
      })
    },
    // 初始化分类
    handlegetproject() {
      fecthproject(this).then((res) => {
        this.projectlist = res.list
      })
    },
    // 编辑  展示框
    handleUpdate(row) {
      this.$store.dispatch('setindex/setbanneritem', row)
      this.selectitem = row.banner_id
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    // 删除
    handleDelete(row) {
      let that = this
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delbanneritem(row.banner_id).then((res) => {
          if (res.status.state === 'success') {
            that.handleinit()
            that.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
      })
    },
    // 新增item 展示
    handleCreate() {
      this.$store.dispatch('setindex/resetbannertemp') // 重置temp
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    // 提交新建
    handlecreateData() {
      let that = this
      addbanneritem(this.temp).then((res) => {
        if (res.status.state === 'success') {
          that.handleinit()
          that.$message({
            type: 'success',
            message: '添加成功!'
          })
        }
      })
      this.dialogFormVisible = false
    },
    // 提交修改
    handleupdateData(row) {
      let that = this
      setbanneritem(this.temp, this.selectitem).then((res) => {
        if (res.status.state === 'success') {
          that.handleinit()
          that.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
      })
      this.dialogFormVisible = false
    },
    //  设置任务大厅顶部图片 + 自定义字段
    handleUpload() {
      this.$confirm('确认提交修改内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setparams(this.img, this.dic.dic).then((res) => {
          if (res.status.state === 'success') {
            this.handleinitdic()
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
      this.$store.dispatch('setindex/setworkbenchimg', parmas)
    },
    childuploadbanner(parmas) {
      this.$store.dispatch('setindex/setbannerimg', parmas)
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
