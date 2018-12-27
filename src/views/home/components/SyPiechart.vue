<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import { mapState } from 'vuex'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { fecthcategoryall } from '@/api/project/index.js' // 初始化  类型分类  列表
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    chartdatavalue() {
      let listArr = this.$store.state.projectindex.list
      let files = []
      for (var i = 0; i < listArr.length; i++) {
        files.push({
          name: listArr[i].title,
          value: listArr[i].task_count
        })
      }
      return files
    },
    chartdata() {
      let listArr = this.$store.state.projectindex.list
      let files = []
      for (var i = 0; i < listArr.length; i++) {
        files.push(listArr[i].title)
      }
      return files
    },
    ...mapState({
      list: state => state.projectindex.list, // 项目分类列表
      withdrawalType: state => state.financial.withdrawaltype // 分类列表，下拉搜索框选项
    })
  },
  mounted() {
    this.handleinit()
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    handleinit() {
      fecthcategoryall({ page: 1, limit: 20 }).then((res) => {
        this.$store.dispatch('projectindex/getcategory', res)
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.chartdata
        },
        calculable: true,
        series: [
          {
            name: '业务类别统计',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.chartdatavalue, //[{name:'',value:''},{}]
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
