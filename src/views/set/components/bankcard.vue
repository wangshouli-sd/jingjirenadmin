<template>
  <div class="bankcard-ruleForm">
    <el-row :gutter="20">
      <el-col v-for="item in cardlist" :span="8" >
        <div class="card-content">
          {{ item.bank_name }}
          <!--<i class="el-icon-delete"></i>-->
          <el-switch v-model="item.is_open" class="el-switch" active-color="#13ce66" active-value="1" inactive-value="0"/>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 50px;">
      <el-form inline>
        <el-form-item>
          <el-input v-model="temp.bank_name" placeholder="新增银行" style="width: 300px;"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click = "addDomain()">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-form-item>

      </el-form>
    </el-row>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import { banklist, addbank, setbank } from '@/api/set/index' // 初始化 银行列表， 添加银行， 设置银行
export default {
  data() {
    return {
      value1: true,
      temp: {
        bank_name: '',
        is_open: '0', // 是否开启 1是开启，0是不开启
        order: '0'
      }
    }
  },
  computed: {
    ...mapState({
      cardlist: state => state.setindex.list // 获取 store banklist
    })
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      banklist().then((res) => {
        this.$store.dispatch('setindex/banklistall', res)
      })
    },
    // 添加银行
    addDomain() {
      if (this.temp.bank_name === '') {
        this.$message({
          message: '请输入银行名称',
          type: 'warning'
        })
        return false
      }
      // this.cardlist.push({
      //   bank_name: this.temp.bank_name,
      //   is_open: '0'
      // })
      // addbank
      this.$confirm('确认添加' + this.temp.bank_name + '银行, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addbank({ name: this.temp.bank_name }).then((res) => {
          this.$store.dispatch('setindex/addbank', res)
          this.getList()
        })
        this.temp.bank_name = ''
      }).catch(() => {
      })
    },
    // 提交设置
    handleSubmit() {
      this.$confirm('确认提交设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const cardarr = this.cardlist
        for (var i = 0; i < cardarr.length; i++) {
          setbank(cardarr[i]).then((res) => {
            this.$store.dispatch('setindex/setbank', res)
            if (i == cardarr.length - 1) {
              this.getList()
            }
          })

        }
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
  .bankcard-ruleForm{
    .card-content{
      border: 1px solid rgba(232,232,232,1);
      border-radius: 10px;
      padding: 20px;
      font-size: 14px;
      margin-top: 20px;
      .el-switch{
        float: right;
      }
      .el-icon-delete{
        float: right;
        border: 1px solid #999999;
        color: #999999;
        padding: 2px;
        border-radius: 4px;
        margin-left: 4px;
      }
    }
  }
</style>
