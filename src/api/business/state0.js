// 业务待审核的列表
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 获取待审核列表
export const state0list = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-task',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.title,
        check: 1,
        stop: 0,
        category_id: data.type
      }
    },
  ).then(res => res.data)
}
// 删除一条待审核的任务 ok
export const delstate0 = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-check/del',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}

// 审核任务是否可以通过
// state（2成功。0不通过），why（不通过理由), task_id  ,'uniacid',, process:{{order:1,process_name:流程名，content_type:1,price:899},{},{},}
export const shen = (state, id, value, process) => {
  return axios.post(
    store.state.baseurl + 'r=bk-task/shentask',
    {
      id: id,
      state: state,
      why: value,
      process: process
    },
  ).then(res => res.data)
}
