// 业务已签约（服务中）的任务列表
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 列表
export const state2list = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-task',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.title,
        category_id: data.type,
        check: '2',
        state: '2',
        stop: '0'
      }
    },
  ).then(res => res.data)
}

// 删除一条业务已签约（服务中）的任务
export const delstate2 = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-check/del',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// 更新服务进度
export const process = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-task/shenprocess',
    {
      id: data
    },
  ).then(res => res.data)
}

// 服务完成，改变状态为服务完成
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
