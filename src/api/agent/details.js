import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 个人详细信息
export const agentdetail = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-member/member',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// 个人佣金明细列表
export const detailmoney = (id, data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-distribution/detail-money',
    {
      params: {
        id: id,
        page: data.page,
        size: data.limit,
        task_number: data.code, // 订单编号（搜索），
        type: data.type // son,main,grand 佣金类型（搜索）
      }
    },
  ).then(res => res.data)
}
// 个人提现明细
export const detailtixian = (id, data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-getmoney/mylist',
    {
      params: {
        id: id,
        page: data.page,
        size: data.limit,
        number: data.code, // 提现编号（搜索）
        type: data.type // 提现类型的id（搜索）
      }
    },
  ).then(res => res.data)
}
