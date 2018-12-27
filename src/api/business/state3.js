// 业务已完成的任务列表
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 列表
export const state3list = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-task',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.title,
        category_id: data.type,
        check: '2',
        state: '3',
        stop: '0'
      }
    },
  ).then(res => res.data)
}
// 删除一条已完成的任务
export const delstate3 = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-check/del',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
