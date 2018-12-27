<template>
  <div class="app-container">
    <div class="filter-container">
      <el-tabs v-model="activeName" class="tab-scroll">
        <el-tab-pane label="打款方式" name="first" class="el-tab-pane" style="margin-top: 2px;padding: 20px;">
          <keep-alive>
            <div>
              <h6 class="item-title">打款方式设置</h6>
              <template v-for="item in withdrawalType">
                <el-row class="first-item-row">
                  <el-col :span="18">
                    <div class="first-item-l">
                      <div class="first-item-l-title">{{ item.name | txTypeFilter }}</div>
                      <div class="first-item-l-desc">开启后可以通过{{ item.name | txTypeFilter }}打款</div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="first-item-r">
                      <el-switch v-model="item.type" active-text="启用" inactive-text="禁用" active-value="1" inactive-value="0"/>
                    </div>
                  </el-col>
                </el-row>
              </template>
              <el-row class="" style="text-align: right;margin-top: 50px;">
                <el-button type="primary" @click="handleSubmit">提交</el-button>
              </el-row>
            </div>
          </keep-alive>
        </el-tab-pane>
        <!--<el-tab-pane label="微信零钱" name="second" class="el-tab-pane">-->
          <!--<keep-alive>-->
            <!--<div>-->
              <!--<h6 class="item-title">微信打款&#45;&#45;基本参数设置</h6>-->
              <!--<weixin/>-->
            <!--</div>-->
          <!--</keep-alive>-->
        <!--</el-tab-pane>-->
        <el-tab-pane label="支付宝打款" name="third" class="el-tab-pane" >
          <keep-alive>
            <div>
              <h6 class="item-title">支付宝打款--基本参数设置</h6>
              <alipay/>
            </div>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="银行卡转账" name="fourth" class="el-tab-pane" >
          <keep-alive>
            <div>
              <h6 class="item-title">设置支持银行</h6>
              <bankcard/>
            </div>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import UploadListimg from './components/UploadListimg'
import weixin from './components/weixin'
import alipay from './components/alipay'
import bankcard from './components/bankcard'

import waves from '@/directive/waves'
import { typemoney } from '@/api/financial/index' // 提现方式列表
import { setdakuan } from '@/api/set/index'
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: {
    UploadListimg,
    weixin,
    alipay,
    bankcard
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    },
    txTypeFilter(status) {
      var value = status.slice(9)
      const txTypeMap = {
        alipay: '支付宝',
        bank: '银行卡',
        wechat: '微信零钱'
      }
      return txTypeMap[value]
    },
    isopenFilter(status) {
      return status === '1' ? true : false
    }
  },
  data() {
    return {
      formLabelAlign: {
        name: '',
        region: '',
        typeArr: [{
          id: '0',
          name: 'name',
          type: '1',
          isopen: false
        }]
      },
      activeName: 'first',
      // 自定义标签
      inputVisible: false,
      inputValue: '',
      weixin: null,
      alipay: null,
      bankcard: null
    }
  },
  computed: {
    ...mapState({
      withdrawalType: state => state.financial.withdrawaltype // 提现方式，下拉搜索框选项
    })
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      typemoney(this) // 获取提现方式列表 api
    },
    handleSubmit() {
      this.$confirm('确认提交设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const typearr = this.withdrawalType
        for (var i = 0; i < typearr.length; i++) {
          setdakuan(typearr[i]).then((res) => {
            this.$store.dispatch('setindex/setdakuan', res)
          })
        }
      }).catch(() => {
      })
    }
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
