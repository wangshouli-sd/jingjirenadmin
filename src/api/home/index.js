import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 顶部经纪人数 + 完成业务数  + 财务中心 ok
export const totalmoney = () => {
  return axios.get(
    store.state.baseurl + 'r=bk-getmoney/total-money',
    {
      params: {}
    },
  ).then(res => res.data)
}
// 首页任务数量 ok
export const taskcount = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-set/taskcount',
    {
      params: {}
    },
  ).then(res => res.data)
}

// 首页最新任务列表 ok
export const indextask = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-set/indextask',
    {
      params: {
        size: data.limit
      }
    },
  ).then(res => res.data)
}
// 折线图参数 ok
export const fecthlineChart = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-category/income',
    {
      params: {}
    },
  ).then(res => res.data)
}
