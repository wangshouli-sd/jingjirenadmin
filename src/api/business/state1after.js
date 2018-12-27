// 上传合同，业务详情页
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 待传合同列表
export const getstate1contract1 = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-task',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.title,
        category_id: data.type,
        check: 2,
        state: 4,
        stop: 0
      }
    },
  ).then(res => res.data)
}
// 任务的详细信息，包括上下级
export const getstate1member = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-check/task-detail',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// 上传合同  设置签约金额
export const setcontract = (id, total_price, contract_id) => {
  return axios.get(
    store.state.baseurl + 'r=bk-check/contract',
    {
      params: {
        id: id,
        total_price: total_price,
        contract_id: contract_id // 合同id
      }
    },
  ).then(res => res.data)
}
// 设置服务流程
export const setstate1process = (id, process) => {
  return axios.post(
    store.state.baseurl + 'r=bk-task/addprocess',
    {
      id: id,
      process: process
    },
  ).then(res => res.data)
}
