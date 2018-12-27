<template>
  <el-row>
    <el-col :xs="12" :sm="12" :md="12" :lg="10" :xl="8">
      <div class="grid-content-l">
        <div class="phone-wrapper">
          <div :style="{backgroundImage: 'url('+ fenxiao.files +')'}" class="screen">
            <div v-if="fenxiao.tap == '1'" class="screen-info">
              <el-row>
                <el-col :span="6" class="left">
                  <img class="headimg" src="@/assets/images/author.png" alt="">
                </el-col>
                <el-col :span="11" class="center">
                  <div class="name-div">这里是昵称</div>
                  <div class="desc-div">这里是邀请码</div>
                </el-col>
                <el-col :span="7" class="right">
                  <img class="codeimg" src="@/assets/images/code.png" alt="">
                </el-col>
              </el-row>
            </div>
            <div v-if="fenxiao.tap == '2'" class="screen-info2">
              <div class="info-head">
                <img class="headimg" src="@/assets/images/author.png" alt="">
              </div>
              <div class="info-body">
                <div class="name-div">这里是昵称</div>
                <div class="desc-div">这里是邀请码</div>
              </div>
              <div class="info-foot">
                <img class="codeimg" src="@/assets/images/code.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="14" :xl="16" style="background-repeat: no-repeat">
      <div class="grid-content-r">
        <el-form ref="fenxiao" label-width="100px" class="demo-ruleForm">
          <el-form-item label="海报名称">
            <el-input v-model="fenxiao.name"/>
          </el-form-item>
          <el-form-item label="模板选择" prop="resource" >
            <el-radio-group v-model="fenxiao.tap">
              <el-radio label="1">模板1</el-radio>
              <el-radio label="2">模板2</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="上传背景图">
            <el-upload
              :on-remove="handleRemove"
              :on-exceed="handlelimit"
              :on-success="handleUploadSucess"
              :before-upload="beforeAvatarUpload"
              :on-error="handledefeat"
              :on-change="handleChange"
              :show-file-list="true"
              :file-list="filelist"
              :limit="2"
              :action="baseurl"
              class="upload-demo"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">(注：只能上传jpg/png文件，且不超过500kb,推荐尺寸667*375)</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="el-btng-item">
          <el-button type="primary" @click="handlesubmitForm">提交</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { posterinfo, setposter } from '@/api/fenxiao/index.js' // 获取海报参数、设置海报参数
export default {
  data() {
    return {
      imageUrl: ''
    }
  },
  computed: {
    filelist() {
      let imgurl = this.$store.state.fenxiaoindex.files
      let files = []
      files.push({
        name: '',
        url: imgurl,
        id: this.$store.state.fenxiaoindex.backimg
      })
      return files
    },
    ...mapState({
      baseurl: state => state.baseurl + 'r=base/addimg',
      fenxiao: state => state.fenxiaoindex // 获取分销参数 store
    })
  },
  created() {
    this.getparmas()
  },
  methods: {
    // 获取海报参数
    getparmas() {
      posterinfo(this).then((res) => {
        this.$store.dispatch('fenxiaoindex/posterinfo', res)
      })
    },
    // 移除图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 超出限制
    handlelimit() {
      this.$message({
        message: '文件数量超出限制，最多上传1张图片',
        type: 'warning'
      })
    },
    // 更改文件列表 列表只保留一条
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1)
    },
    // 上传成功
    handleUploadSucess(response, file, fileList) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.fenxiao.backimg = response.id // 返回response.id
      const imgdata = {
        id: response.id,
        url: file.url
      }
      this.$store.dispatch('fenxiaoindex/setposterimg', imgdata) // 设置上传图片  api
    },
    // 上传失败
    handledefeat(err, file, fileList) {
      this.$message({
        message: '上传失败,请稍后重试',
        type: 'warning'
      })
    },
    // 上传前限制
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/png'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传图片只能是 png 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
    },
    // 提交设置
    handlesubmitForm() {
      this.$confirm('保存海报设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setposter(this.fenxiao).then((res) => {
          if (res.status.state === 'success') {
            this.getparmas()
            this.$message({
              type: 'success',
              message: '设置成功!'
            })
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
  .grid-content{
    min-height: 100px;
  }
  .phone-wrapper{
    width: 333px;
    height: 592px;
    padding-top: 74px;
    background: url("/static/images/iphone.png") no-repeat;
    background-size: 100% 100%;
    /*background-size: cover; */
    .screen{
      border: 1px solid #a5a5a5;
      width: 252px;
      height: 445px;
      margin: auto;
      background-repeat: no-repeat;
      background-size:100% 100%;
      .screen-info{
        border: 1px solid #dbdbdb;
        width: 200px;
        margin: auto;
        margin-top: 80px;
        height: 60px;
        border-radius: 10px;
        background: rgba(255,255,255,0.5);
        .left{
          .headimg{
            width: 40px;
            height: 40px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius: 20px;
            margin-top: 10px;
            margin-left: 5px;
            border: 1px solid #b9b9b9;
          }
        }
        .center{
          font-size: 12px;
          color: #3e3e3e;
          .name-div{
            margin-top: 10px;
          }
          .desc-div{
            margin-top: 10px;
          }
        }
        .right{
          padding-right: 5px;
          .codeimg{
            width: 50px;
            height: 50px;
            border: 1px solid #c8c8c8;
            margin-top: 5px;
            border-radius: 5px;
          }
        }
      }
      .screen-info2{
        width: 200px;
        /*height: 200px;*/
        padding-bottom: 10px;
        border: 1px solid #c8c8c8;
        margin: auto;
        margin-top: 70px;
        background: rgba(255,255,255,0.5);
        .info-head{
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          margin: auto;
          margin-top: -35px;
          .headimg{
            width: 100%;
            height: 100%;
            border: 1px solid #c8c8c8;
          }
        }
        .info-body{
          font-size: 12px;
          color: #3e3e3e;
          text-align: center;
          .name-div{
            margin-top: 10px;
          }
          .desc-div{
            font-size: 10px;
            margin-top: 10px;
          }
        }
        .info-foot{
          text-align: center;
          margin: auto;
          .codeimg{
            width: 100px;
            height: 100px;
            border: 1px solid #c8c8c8;
            margin-top: 5px;
            border-radius: 5px;
          }
        }
      }
    }
  }
  .el-btng-item{
    text-align: right;
    padding-top: 100px;
  }
  .grid-content-r{
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-radio__input{
      display: none !important;
    }
    .template-wrapper{
      border: 1px solid black;
      .template{
        width: 100%;
        /*min-height: 200px;*/
        border: 1px solid black;
        .template-image{
          width: 100%;
          height: 100px;
          /*border: 1px solid ;*/
        }
      }
      .template-title{
        display: inline-block;
        height: 40px;
        text-align: center;

      }
    }

  }

</style>
