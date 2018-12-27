<template>
  <el-row :gutter="16" class="panel-group" style="margin-bottom: 0px;">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/business/state0">
        <div class="card-panel">
          <div class="card-panel-icon-container icon-people">
            <svg-icon icon-class="syshenhe" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="tasknumber.dai | numberFilter" :duration="1000" class="card-panel-num"/>
            <div class="card-panel-text">待审核</div>
          </div>
        </div>
      </router-link>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/business/state1">
        <div class="card-panel">
          <div class="card-panel-icon-container icon-message">
            <svg-icon icon-class="syqiatan" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="tasknumber.qia | numberFilter" :duration="1000" class="card-panel-num"/>
            <div class="card-panel-text">洽谈中</div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/business/state2">
        <div class="card-panel">
          <div class="card-panel-icon-container icon-money">
            <svg-icon icon-class="syfuwu" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="tasknumber.fu | numberFilter" :duration="1200" class="card-panel-num"/>
            <div class="card-panel-text">服务中</div>
          </div>
        </div>
      </router-link>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <router-link to="/business/state3">
        <div class="card-panel">
          <div class="card-panel-icon-container icon-shoppingCard">
            <svg-icon icon-class="sywancheng" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <count-to :start-val="0" :end-val="tasknumber.wan | numberFilter" :duration="1200" class="card-panel-num"/>
            <div class="card-panel-text">已完成</div>
          </div>
        </div>
      </router-link>
    </el-col>
  </el-row>
</template>
<script>
import CountTo from 'vue-count-to'
import { taskcount } from '@/api/home/index.js'
export default {
  components: {
    CountTo
  },
  filters: {
    numberFilter(status) {
      return parseInt(status)
    }
  },
  data() {
    return {
      tasknumber: {
        dai: '0',
        qia: '0',
        fu: '0',
        wan: '0'
      }
    }
  },
  mounted() {
    this.handleinit()
  },
  methods: {
    handleinit() {
      // 初始化首页 第一部分card  任务数量
      taskcount().then((res) => {
        this.tasknumber = res
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 12px;
    margin-bottom: 0px;
    .card-panel-col{
      margin-bottom: 12px;
    }
    .card-panel {
      display: flex;
      text-align: center;
      /*height: 90px;*/
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      /*&:hover {*/
        /*.card-panel-icon-wrapper {*/
          /*color: #fff;*/
        /*}*/
        /*.icon-people {*/
          /*background: #40c9c6;*/
        /*}*/
        /*.icon-message {*/
          /*background: #36a3f7;*/
        /*}*/
        /*.icon-money {*/
          /*background: #f4516c;*/
        /*}*/
        /*.icon-shoppingCard {*/
          /*background: #34bfa3*/
        /*}*/
      /*}*/
      .icon-people {
        /*color: #40c9c6;*/
        background: rgba(9,140,230,1);
      }
      .icon-message {
        /*color: #36a3f7;*/
        background: rgba(252,176,2,1);
      }
      .icon-money {
        /*color: #f4516c;*/
        background: rgba(108,80,251,1);
      }
      .icon-shoppingCard {
        /*color: #34bfa3*/
        background: rgba(241,81,107,1);
      }
      .card-panel-icon-wrapper {
        /*float: left;*/
        margin: 7px 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon-container{
        margin: 20px 14px;
        transition: all 0.38s ease-out;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 70px;
      }
      .card-panel-icon {
        /*float: left;*/
        /*font-size: 48px;*/
        font-size: 30px;
        color: white;
      }
      .card-panel-description {
        /*font-weight: bold;*/
        margin: 14px;
        margin-left: 20px;
        .card-panel-text {
          line-height: 16px;
          color: rgba(98,98,98,1);
          font-size: 14px;
          margin-top: 8px;
          text-align: left;
        }
        .card-panel-num {
          display: block;
          font-size: 20px;
          margin-top: 10px;
          text-align: left;
        }
      }
    }
  }
</style>
