<template>
  <div>
    <div class="tab-title">
      <div class="tab-title-item tab-title-item-left">序号</div>
      <div class="tab-title-item tab-title-item-right">名称</div>
    </div>
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="80px" class="demo-dynamic">
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.process"
        :key="domain.id"
      >
        <span class="serialnumber">{{ ++index }}</span>
        <!--<el-input v-model="domain.order" value="index">51</el-input>-->
        <el-input v-model="domain.process_name" :readonly = "index == 1 || index == dynamicValidateForm.process.length" class="process-input"/>
        <i v-if="index != 1 && index != dynamicValidateForm.process.length" class="el-icon-delete el-icon" @click.prevent="removeDomain(domain)"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain">新增步骤</el-button>
      </el-form-item>
      <!--<el-form-item style="font-size: 12px;">-->
        <!--注:第一项和最后一项为默认项，不可改动-->
      <!--</el-form-item>-->
    </el-form>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SetProcess',
  data() {
    return {
      // dynamicValidateForm: {
      //   process: [
      //     { value: '审核通过' },
      //     { value: '项目完成' }]
      // }
    }
  },
  computed: {
    ...mapState({
      dynamicValidateForm: state => state.projectlist.post // 项目详情 修改部分  对应post
      // countall: 'count'                             //直接获取vuex
    })
  },
  methods: {
    removeDomain(item) {
      var index = this.dynamicValidateForm.process.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.process.splice(index, 1)
      }
    },
    addDomain() {
      // 直接添加用push  在最后一条前插入用splice
      // this.dynamicValidateForm.process.push({
      var lent = this.dynamicValidateForm.process.length
      this.dynamicValidateForm.process.splice(lent - 1, 0, {
        key: Date.now(),
        process_name: '',
        order: ''
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .tab-title{
      max-width: 700px;
      min-width: 500px;
      margin: auto;
      border-bottom: 1px solid #e0e0e0;
      .tab-title-item{
        display: inline-block;
        padding: 10px;
        color: #797979;
      }
      .tab-title-item-left{
        width: 200px;
        text-align: center;
      }
      .tab-title-item-right{
        width: 200px;
        text-align: center;
      }
    }
    .demo-dynamic{
      padding-top: 30px;
      max-width: 700px;
      min-width: 500px;
      margin: auto;
      .serialnumber{
        border: 1px solid #b2b2b2;
        /*padding: 8px 12px;*/
        display: inline-block;
        border-radius: 1px;
        margin-right: 50px;
        width: 34px;
        height: 34px;
        line-height: 34px;
        text-align: center;
      }
      .process-input{
        /*border: 1px solid black;*/
        width:300px;
        margin-right: 40px;
      }
      .el-icon{
        margin:0 5px;
        color: rgba(162, 162, 162, 0.99);
        border: 1px solid rgba(162, 162, 162, 0.99);
        padding: 4px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;

      }
    }
</style>
