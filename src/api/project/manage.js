import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 项目列表
export const fecthproject = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-project',
    {
      params: {
        page: data.page,
        size: data.limit,
        category: data.type,
        name: data.title
      }
    },
  ).then(res => res.data)
}
// 新增项目 + 修改项目
export const addproject = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-project/createup',
    {
      data
    },
  ).then(res => res.data)
}
// 删除项目,一个或者批量
export const delproject = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-project/delall',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// 项目详情
export const oneproject = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-project/one',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}

