// 业务洽谈失败的列表
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 列表
export const state1defeatlist = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-task',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.title,
        category_id: data.type,
        check: '2',
        state: '1',
        stop: '1'
      }
    },
  ).then(res => res.data)
}

// 删除一条业务洽谈失败的
export const state1defeatdel = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-check/del',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
