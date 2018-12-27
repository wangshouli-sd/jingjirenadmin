<template>
  <div>
    <div class="theader" style="max-width: 800px;min-width: 790px;margin: auto;">
      <div style="display: inline-block;text-align:center;width: 80px;">序号</div>
      <div style="display: inline-block;text-align:center;width: 300px;">名称</div>
      <div style="display: inline-block;text-align:center;width: 200px;">类型</div>
      <div style="display: inline-block;text-align:center;width: 100px;">比例</div>
      <div style="display: inline-block;text-align:center;width: 100px;">操作</div>
    </div>
    <el-form ref="steps" label-width="80px" class="demo-dynamic">
      <el-form-item v-for ="(domain, index) in steps" :label="'第' + (++index) +'步'" :key="domain.key">
        <el-input :disabled = "index == 1 || index == steps.length" v-model="domain.process_name" clearable class="process-title-input"/>
        <el-select v-model="domain.content_type" placeholder="类型" class="process-type-input" :disabled = "index == 1 || index == steps.length">
          <el-option v-for="item in protype" :label="item.value" :value="item.id" :key="item.id"/>
        </el-select>
        <template v-if="domain.content_type == '1'">
          <el-input v-model="domain.price" prop="price" class="process-proportion-input"/>
          <span class="info-yj-input-text">%</span>
        </template>
        <i v-if="index != 1&&index!=steps.length" style="cursor: pointer;" class="el-icon-delete el-icon" @click.prevent="removeDomain(domain)"/>
      </el-form-item>

      <el-form-item>
        <!--<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>-->
        <el-button @click="addDomain">新增步骤</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SetProcess',
  data() {
    return {
      protype: [
        { value: '进程', id: '2' },
        { value: '收款', id: '1' }
      ]
    }
  },
  computed: {
    ...mapState({
      steps: state => state.state1after.steps // 流程temp
    })
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      var index = this.steps.indexOf(item)
      if (index !== -1) {
        this.steps.splice(index, 1)
      }
    },
    addDomain() {
      var lent = this.steps.length
      this.steps.splice(lent - 1, 0, {
        process_name: '',
        key: Date.now(),
        price: null,
        content_type: '2'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .theader{
      font-size: 14px;
      color: #999999;
      border-bottom: 1px solid #999999;
      padding-bottom: 20px;
      margin-bottom: 20px;
    }
    .demo-dynamic{
      max-width: 800px;
      margin: auto;
      min-width: 790px;
      margin-top: 20px;
      .process-title-input{
        /*border: 1px solid black;*/
        width:300px;
        margin-right: 20px;
      }
      .process-type-input{
        width:160px;
        margin-right: 20px;
      }
      .process-proportion-input{
        width:100px;
      }
      .el-icon{
        margin:0 5px;
        color: rgba(162, 162, 162, 0.99);
        border: 1px solid rgba(162, 162, 162, 0.99);
        padding: 2px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        cursor: pointer !important;
      }

      .info-yj-input-text{
        color: #656565;
        font-size: 14px;
        padding:0 10px;
      }
      .el-table__row{
        border: none;
      }
    }
</style>
