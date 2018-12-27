<template>
  <div class="app-container">
    <div class="filter-container">
      <el-tabs v-model="activeName" class="tab-scroll">
        <!--<el-tab-pane label="基础设置" name="first" class="el-tab-pane" style="margin-top: 2px;padding: 20px;">-->
          <!--<keep-alive>-->
            <!--<div v-if="activeName==&quot;first&quot;">-->
              <!--<h6 class="item-title">海报基础设置</h6>-->
              <!--<setinfo/>-->
            <!--</div>-->
          <!--</keep-alive>-->
        <!--</el-tab-pane>-->
        <el-tab-pane label="海报设计" name="second" class="el-tab-pane">
          <keep-alive>
            <div v-if="activeName==&quot;second&quot;">
              <setposters style="margin-top: 50px"/>
            </div>
          </keep-alive>
        </el-tab-pane>

      </el-tabs>
    </div>

  </div>
</template>
<script>
import setinfo from './components/setinfo'
import setposters from './components/setposters'

import waves from '@/directive/waves'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: {
    setinfo,
    setposters
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
      activeName: 'second'
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /*start*/
  .filter-container{
    .el-tab-pane{
      background: white;
      min-height: 300px;
      padding: 20px 50px 50px 50px !important;
      .first-item-row{
        padding: 20px;
        margin-bottom: 0px;
        margin-top: 30px;
        border: 1px solid rgb(218,218,218);
        border-radius: 10px;
        .first-item-l-title{
          font-size: 14px;
          color: rgb(96, 96, 96);
          margin: 20px 10px;

        }
        .first-item-l-desc{
          font-size: 14px;
          color: rgb(161, 161, 161);
          margin: 16px 10px;

        }
        .first-item-r{
          text-align: right;
          padding: 30px 20px;
        }
      }
      .item-title{
        font-size: 14px;
        /*max-width: 600px;*/
        color: #373737;
        text-align: center;
      }
    }
  }

  .input-item{
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: rgb(240,240,240);
    color: #7a7a7a;
    padding: 0 20px;
  }
  .input-item-text{
    height: 72px;
  }
  .input-item-rt,.input-item-rb{
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: rgb(240,240,240);
    color: #7a7a7a;
    padding: 0 20px;
  }
  .input-item-rb{
    background: white;
  }

</style>
