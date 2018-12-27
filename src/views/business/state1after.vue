<template>
  <div class="app-container" style="">
    <div class="filter-container" style="background: #ffffff;padding: 16px;">
      <el-input v-model="listQuery.name" style="width: 200px;" class="filter-item" placeholder="联系人" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" clearable class="filter-item" style="width: 130px" placeholder="项目分类">
        <el-option v-for="item in processTypeOptions" :key="item.title" :label="item.title" :value="item.id"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!--<el-button v-waves class="filter-item" type="danger" icon="el-icon-delete" @click="handleFilter">批量删除</el-button>-->
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      border>
      <el-table-column label="序号" type="index" width="60" align="center"/>
      <el-table-column prop="task_number" label="业务编号" width="120" align="center"/>
      <el-table-column label="业务名称" align="center" min-width="200px">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="6" class="ywitem-l">
              <div class="">
                <img :src="scope.row.img_path" class="ywitem-l-img" alt="">
              </div>
            </el-col>
            <el-col :span="18" class="ywitem-r">
              <div class="">
                <div class="ywitem-r-title">{{ scope.row.taskname }}</div>
                <div>
                  <el-tag v-for="item in scope.row.tags" :key="item.key" type="success" size="mini" style="margin-right: 5px">{{ item }}</el-tag>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="业务联系人" width="120" align="center"/>
      <el-table-column prop="userphone" label="联系方式" width="120" align="center"/>
      <el-table-column prop="time" label="提交时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column prop="expect_commission" label="预计佣金" width="100" align="center">
        <template slot-scope="scope">
          <span style="color: red;">￥{{ scope.row.min_price }}--{{ scope.row.max_price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="经纪人" width="100" align="center"/>
      <el-table-column prop="state" label="进度" width="160" align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/business/stateToload',query:{id:scope.row.id}}">
            <el-tag v-if="scope.row.contract_id == ''">待上传合同</el-tag>
            <el-tag v-else-if="scope.row.contract_id != '' && scope.row.total_price == '0'">待设置签约金额</el-tag>
            <el-tag v-else-if="scope.row.contract_id != '' && scope.row.total_price != '0' && scope.row.setprocess === '0'">待设置流程</el-tag>
            <el-tag v-else type="success">设置完成</el-tag>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="上传合同" placement="top">
            <router-link :to="{path:'/business/stateToload',query:{id:scope.row.id}}">
              <i class="el-icon-upload2 el-icon"/>
            </router-link>
          </el-tooltip>
          <!--<el-tooltip class="item" effect="dark" content="设置完成进入服务流程" placement="top">-->
          <!--<i class="el-icon-check el-icon" @click="handleComplate(scope.row)"/>-->
          <!--</el-tooltip>-->
          <!--<i class="el-icon-delete el-icon" @click="handleDelete(scope.row)"/>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="background: white;margin-top: 0;text-align: right;padding: 16px">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="page.data_total | pageFilters" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SetProcess from './components/SetProcess'
import waves from '@/directive/waves'
import { getstate1contract1 } from '@/api/business/state1after.js' // 获取待传合同列表
import { fecthcategory } from '@/api/project/index.js' // 初始化  类型分类  列表
export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  components: {
    SetProcess
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    },
    timeFilter(time) {
      if (time === '' || time == null) {
        return '--/--'
      } else {
        return time
      }
    },
    pageFilters(page) {
      return parseInt(page)
    }
  },
  data() {
    return {
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        type: undefined
      }
    }
  },
  computed: {
    ...mapState({
      list: state => state.state1after.list,
      page: state => state.state1after.page,
      processTypeOptions: state => state.projectindex.list // 分类列表，下拉搜索框选项
    })
  },
  created() {
    this.getList()
    this.getCategory()
  },
  methods: {
    getList() {
      getstate1contract1(this.listQuery).then((res) => {
        this.$store.dispatch('state1after/getstate1contract1', res)
      })
    },
    getCategory() {
      fecthcategory(this, this.listQuery) // 初始化类型 分类 api
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-icon{
    margin:0 5px;
    border: 1px solid rgba(162, 162, 162, 0.99);
    padding: 2px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    cursor: pointer;
  }
  .ywitem-l{
    text-align: right;
    .ywitem-l-img{
      width: 50px;
      height: 40px;
      border-radius: 10px;
    }
  }
  .ywitem-r{
    text-align: left;
    padding-left: 20px;
    .ywitem-r-title{
      text-align: left;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
</style>
