import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 反馈列表
export const fecthsuggest = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-suggest',
    {
      params: {}
    },
  ).then(res => res.data)
}
// 删除反馈
export const delsuggest = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-suggest/del',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// 已读反馈
export const readsuggest = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-suggest/read',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
