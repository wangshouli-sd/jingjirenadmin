import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 获取客户列表
export const getcustomerlist = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-customer/customer-list',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.name,
        phone: data.phone
      }
    },
  ).then(res => res.data)
}

// 获取一条客户详情
export const getcustomeritem = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-customer/customer-info',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
