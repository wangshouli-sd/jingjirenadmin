import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)

// 获取列表  state 0,1,2,3   审核中，待打款，已完成，未通过
export const fecthlist = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-getmoney/list',
    {
      params: {
        page: data.page,
        size: data.limit,
        state: data.state,
        type: data.type, // 提现方式id
        name: data.name, //
        number: data.number
      }
    },
  ).then(res => res.data)
}

// 提现方式列表
export function typemoney(that) {
  axios.get(store.state.baseurl + 'r=bk-getmoney/typelist', {})
    .then(function(res) {
      store.dispatch('financial/typemoney', res.data)
    })
    .catch(function(err) {
      console.log(err)
    })
}

// 删除一个提现
export const delmoney = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-getmoney/deltixian',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// 审核提现
export const checkmoney = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-getmoney/shen',
    {
      id: data.id,
      state: data.state, // 1是通过，0是不通过
      remarks: data.remarks // 不通过理由
    },
  ).then(res => res.data)
}
// 打款中：更改打款中状态为已完成
export const pushmoney = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-getmoney/shenpush',
    {
      params: {
        id: data,
        state: '1'
      }
    },
  ).then(res => res.data)
}
// 打款转账
export const alipaymoney = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-set/pay',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
