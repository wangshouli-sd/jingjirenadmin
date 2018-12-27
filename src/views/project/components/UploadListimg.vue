<template>
  <div>
    <el-upload
      :limit="limit"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleUploadSucess"
      :accept = "accepttype"
      :on-exceed="handleoverlimit"
      :on-error="handledefeat"
      :file-list="filelist"
      :on-change="handleChange"
      :action="baseurl"
      class="upload-demo"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">(注：只能上传jpg/png文件，且不超过500kb，推荐尺寸140*96)</div>
    </el-upload>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SetProcess',
  data() {
    return {
      limit: 2,
      accepttype: '.jpg,.png,.jpeg',
      showfile: true,
      uploadListimg: ''
    }
  },
  computed: {
    filelist() {
      let files = []
      files.push({
        id: this.$store.state.projectlist.post.img,
        name: '',
        url: this.$store.state.projectlist.post.img_path
      })
      return files
    },
    ...mapState({
      imgurl: state => state.projectlist.post.img_path, // 获取选中项的缩略图
      img: state => state.projectlist.post.img, // 获取 图片id
      baseurl: state => state.baseurl + 'r=base/addimg'
    })
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // var imglist = this.imgurl
      // for (var i = 0; i < imglist.length; i++) {
      //   this.fileList.push({
      //     id: this.img,
      //     name: '',
      //     url: imglist[i]
      //   })
      // }
    },
    handleRemove(file, fileList) {
      const remainid = []
      for (var i = 0; i < fileList.length; i++) {
        // 初始化的图片 获取id   fileList[i].id    上传的图片fileList[i].response.id
        if (fileList[i].response) {
          remainid.push(fileList[i].response.id)
        } else {
          remainid.push(fileList[i].id)
        }
      }
      this.uploadDetail = remainid.join(',')
      this.$store.dispatch('projectlist/setlistid', this.uploadDetail) // 设置上传列表图片  api
    },
    handlePreview(file) {
      console.log(file)
    },
    // 超出提示
    handleoverlimit() {
      this.$message({
        message: '文件数量超出限制，最多上传1张图片',
        type: 'warning'
      })
    },
    // 上传成功
    handleUploadSucess(response, file, fileList) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.uploadListimg = response.id
      this.$store.dispatch('projectlist/setlistid', this.uploadListimg) // 设置上传详情图片  api
      this.$store.dispatch('projectlist/setlistimg', file) // 设置上传详情图片  api
    },
    // 上传失败
    handledefeat(err, file, fileList) {
      this.$message({
        message: '上传失败',
        type: 'warning'
      })
    },
    // 限制列表只显示一张
    handleChange(file, fileList) {
      // console.log(fileList)
      // this.filelist = fileList.slice(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-upload__tip{
      display: inline-block;
      margin-left: 20px;
      font-size: 12px;
    }
</style>
