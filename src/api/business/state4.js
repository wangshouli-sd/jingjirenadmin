// 业务管理未审核通过列表
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 列表
export const state4list = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-task',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.title,
        category_id: data.type,
        check: '0',
        state: '0',
        stop: '0'
      }
    },
  ).then(res => res.data)
}
// 删除一条未审核通过的任务
export const delstate4 = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-check/del-all',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// 审核未通过   重新填写退回原因
export const notpassstate4 = (id, value) => {
  return axios.get(
    store.state.baseurl + 'r=bk-check/editnotpass',
    {
      params: {
        id: id,
        why: value
      }
    },
  ).then(res => res.data)
}
