<!--多图片上传-->
<template>
  <div class="banner">
    <el-upload
      :limit="limit"
      :multiple= "multiple"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-exceed="handleoverlimit"
      :on-success="handleSuccess"
      :on-error="handledefeat"
      :file-list="filelist"
      :action="baseurl"
      list-type="picture-card">
      <i class="el-icon-plus"/>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
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
    },
    imgid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      limit: 5,
      dialogImageUrl: '',
      dialogVisible: false,
      multiple: true,
      uploadDetail: ''
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
    // 图片移除
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
      this.$emit('childupload', this.uploadDetail)
    },
    // 图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 超出提示
    handleoverlimit() {
      this.$message({
        message: '文件数量超出限制，最多上传5张图片',
        type: 'warning'
      })
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      // 设置选中的id列表
      this.uploadDetail = this.imgid
      if (this.uploadDetail === '') {
        this.uploadDetail = response.id
      } else {
        this.uploadDetail = this.uploadDetail + ',' + response.id
      }
      this.$emit('childupload', this.uploadDetail)
    },
    // 上传失败
    handledefeat(err, file, fileList) {
      this.$message({
        message: '上传失败',
        type: 'warning'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*.banner{*/
  /*border: 1px solid #b8b8b8;*/
  /*border-radius: 10px;*/
  /*padding: 20px;*/
  /*}*/
</style>
