// 业务正在洽谈中的列表
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 获取列表
export const state1list = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-task',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.title,
        category_id: data.type,
        check: 2,
        state: 1,
        stop: 0
      }
    },
  ).then(res => res.data)
}
// 更新洽谈进度
export const process = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-task/shenprocess',
    {
      id: data
    },
  ).then(res => res.data)
}
// 洽谈成功，改变状态为待传合同 1 通过 0不通过（打断任务）
export const processq = (state, id, why) => {
  return axios.post(
    store.state.baseurl + 'r=bk-task/stop',
    {
      id: id,
      state: state,
      why: why
    },
  ).then(res => res.data)
}
// 删除一条洽谈的任务
export const delstate1 = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-task/stop',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
