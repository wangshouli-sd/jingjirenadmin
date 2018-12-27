<template>
    <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { mapState } from 'vuex'
import { fecthlineChart } from '@/api/home/index.js' // 获取折线图参数
const colorArr = [
  '255,204,254', '215,204,0', '25, 100, 192',
  '102,0,204', '61,255,255', '204,0,51',
  '26,153,0', '0,0,204', '255,139,61',
  '255,153,204', '204,230,255', '0,0,102',
  '255,255,51', '255,255,51', '25, 100, 192',
  '0, 136, 212', '137, 189, 27', '25, 100, 192',
  '0, 136, 212', '137, 189, 27', '25, 100, 192'
]
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
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
      colorArr: colorArr,
      chart: null,
      monthdata: []
    }
  },
  computed: {
    seriesdata() {
      let tongjilist = this.$store.state.homeindex.tongji
      let valuearr = []
      for (var i = 0; i < tongjilist.length; i++) {
        valuearr.push({
          name: tongjilist[i].title,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(' + colorArr[i] + ', 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(' + colorArr[i] + ', 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(' + colorArr[i] + ')',
              borderColor: 'rgba(' + colorArr[i] + ',0.27)',
              borderWidth: 12
            }
          },
          data: tongjilist[i].money
        })
      }
      return valuearr
    },
    titledata() {
      let tongjilist = this.$store.state.homeindex.tongji
      let valuearr = []
      for (var i = 0; i < tongjilist.length; i++) {
        valuearr.push(tongjilist[i].title)
      }
      return valuearr
    },
    ...mapState({
      tongji: state => state.homeindex.tongji // 折线图表数据
    })
  },
  mounted() {
    this.handleinit()
    this.initChartMonth()
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    handleinit() { // 初始化折线图参数 api
      fecthlineChart(this).then((res) => {
        this.$store.dispatch('homeindex/showinfo', res)
        this.initChart()
      })
    },
    initChartMonth() {
      const newdate = new Date()
      var month = newdate.getMonth()
      // var month = 1
      var year = newdate.getFullYear()
      this.monthdata.splice(0, 0, parseInt(month) + 1 + '月')
      for (var i = 0; i < 7; i++) {
        if (month === 0) {
          month = 12
        }
        month === 1 ? this.monthdata.splice(0, 0, month + '月' + '(' + year + ')') : this.monthdata.splice(0, 0, month + '月')
        month--
      }
      console.log(this.monthdata)
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: 'white',
        title: {
          top: 20,
          text: '业务统计',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#606266'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#606266'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: this.titledata,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#606266'
          }
        },
        grid: {
          top: 100,
          left: '3%',
          right: '4%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#86888D'
            }
          },
          data: this.monthdata
        }],
        yAxis: [{
          type: 'value',
          name: '(￥)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#86888D',
              width: 1
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: 'none'
            }
          }
        }],
        series: this.seriesdata
      })
    }
  }
}
</script>
