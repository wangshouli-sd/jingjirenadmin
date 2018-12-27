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
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      multiple: true,
      limit: 12
    }
  },
  computed: {
    filelist() {
      let imgurlArr = this.$store.state.state1after.contract
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
      img: state => state.state1after.details.contract_id, // 合同图片 id []
      // img: state => state.state1after.uploadcontractID, // 合同图片 id []
      baseurl: state => state.baseurl + 'r=base/addimg'
    })
  },
  methods: {
    // 移除图片
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
      this.$store.dispatch('state1after/setfileId', this.uploadDetail) // 设置用户协议上传图片ids
    },
    // 图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 超出提示
    handleoverlimit() {
      this.$message({
        message: '文件数量超出限制，最多上传12张图片',
        type: 'warning'
      })
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.uploadDetail = this.img
      if (this.uploadDetail === '') {
        this.uploadDetail = response.id
      } else {
        this.uploadDetail = this.uploadDetail + ',' + response.id
      }
      // this.uploadDetailArr = this.uploadDetail.split(',')
      this.$store.dispatch('state1after/setfileId', this.uploadDetail)
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
