// 业务详情页   一个方法 就获取整个页面的信息 ，现在是分成三遍获取
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 获取业务详情 -- 详情页使用
export const getstatemember = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-check/task-detail',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// 获取一条洽谈中的详情
export const getdetailstate2 = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-check/task-detail',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
