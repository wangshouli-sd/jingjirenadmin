<template>
  <el-card class="box-card-component" style="margin-top: 0px;padding: 0px">
    <div slot="header" class="box-card-header">
      <img src="@/assets/images/opinion.png">
    </div>
    <div style="height: 100%;padding: 0px;margin: 0px">
      <h5 style="color: #000;font-size: 14px;font-weight: normal;margin-top: 0px">
        <router-link to="/opinion/index">
          最新反馈和意见
        </router-link>
      </h5>
      <el-row>
        <template v-for="item in oponionlist">
          <el-col :span="24" >
            <el-row>
              <el-col :span="5" >
                <div class="grid-content bg-purple-dark grid-content-left" style="">
                  <img :src= "item.authorimg">
                </div>
              </el-col>
              <el-col :span="19" >
                <div class="grid-content bg-purple-dark grid-content-right" style="">
                  <div>
                    <span>{{ item.truename }}</span>
                    <span style="float: right">{{ item.time }}</span>
                  </div>
                  <p>{{ item.contact }}</p>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </template>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { fecthsuggest } from '@/api/opinion/index.js' // 获取意见反馈列表
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  components: { PanThumb, Mallki },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      },
      oponionlist: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fecthsuggest(this.listQuery).then((res) => {
        this.oponionlist = res.list.length > 2 ? res.list.slice(0, 2) : res.list
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
  .box-card-component{
    height: 100%;
    .el-card__header {
      padding: 0px!important;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .box-card-component {
    padding: 0px;
    .box-card-header {
      position: relative;
      height: 220px;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover {
          transform: scale(1.1, 1.1);
          filter: contrast(130%);
        }
      }
    }
    .mallki-text {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 20px;
      font-weight: bold;
    }
    .panThumb {
      z-index: 100;
      height: 70px!important;
      width: 70px!important;
      position: absolute!important;
      top: -45px;
      left: 0px;
      border: 5px solid #ffffff;
      background-color: #fff;
      margin: auto;
      box-shadow: none!important;
      /deep/ .pan-info {
        box-shadow: none!important;
      }
    }
    .progress-item {
      margin-bottom: 10px;
      font-size: 14px;
    }
    @media only screen and (max-width: 1510px){
      .mallki-text{
        display: none;
      }
    }

    .grid-content-left{

    }
    .grid-content-left img{
      width: 50px;
      height: 50px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
    }
    .grid-content-right p{
      margin-top: 0px;

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: #93959A;
      width: 100%;
      font-size: 13px;
      line-height: 24px;

    }
    .grid-content-right span{
      font-size: 12px;
      color: #000;
    }
  }
</style>
