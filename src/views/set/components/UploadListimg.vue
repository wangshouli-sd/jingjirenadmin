<!-- 单张上传    列表缩略图格式-->
<template>
  <div>
    <el-upload
      :limit="2"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleUploadSucess"
      :accept = "accepttype"
      :on-exceed="handleoverlimit"
      :on-error="handledefeat"
      :on-change="handleChange"
      :file-list="filelist"
      :action="baseurl"
      class="upload-demo"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">(注：只能上传jpg/png文件，推荐大小 {{ size }} )</div>
    </el-upload>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SetProcess',
  props: {
    proptitle: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    filelist: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      accepttype: '.jpg,.png,.jpeg'
    }
  },
  computed: {
    ...mapState({
      baseurl: state => state.baseurl + 'r=base/addimg'
    })
  },
  created() {
  },
  methods: {
    // 移除图片
    handleRemove(file, fileList) {
      console.log(file)
      const remainid = []
      for (var i = 0; i < fileList.length; i++) {
        // 初始化的图片 获取id   fileList[i].id    上传的图片fileList[i].response.id
        if (fileList[i].response) {
          remainid.push(fileList[i].response.id)
        } else {
          remainid.push(fileList[i].id)
        }
      }
      this.$emit('childupload', { file: {}, imgid: '' })
    },
    // 图片预览
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
      this.$emit('childupload', { file: file, imgid: response.id })
    },
    handledefeat(err, file, fileList) {
      this.$message({
        message: '上传失败',
        type: 'warning'
      })
    },
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-1)
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
