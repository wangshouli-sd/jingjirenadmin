import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 经纪人审核中列表
export const auditlista = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-member/audit1',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.name
      }
    },
  ).then(res => res.data)
}
// 删除审核中的经纪人
export const delaudita = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-member/delall',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// 审核是否具备经纪人资格
export const shena = (state, id, why) => {
  return axios.get(
    store.state.baseurl + 'r=bk-check/member',
    {
      params: {
        id: id,
        state: state,
        why: why
      }
    },
  ).then(res => res.data)
}
