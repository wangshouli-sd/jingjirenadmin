// 经纪人管理
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)

export const agentlist = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-member/member-all',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.name, // 搜索用
        onlyid: data.code,
        blacklist: data.blacklist // 黑名单列表
      }
    },
  ).then(res => res.data)
}
// 删除经纪人
export const delagent = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-member/member-del',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// 黑名单列表
export const blacklist = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-member/black-list',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.name
      }
    },
  ).then(res => res.data)
}
// 加入黑名单
export const addblack = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-member/black-add',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// 取消黑名单
export const delblack = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-member/black-del',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
