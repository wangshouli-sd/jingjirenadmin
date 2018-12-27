import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 客服展示
export const getkefu = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-set/showservice',
    {
      params: {}
    },
  ).then(res => res.data)
}
// 设置客服
export const setkefu = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-set/setservice',
    {
      name: data.name,
      qq: data.qq, // qq号
      phone: data.phone // 手机号
    },
  ).then(res => res.data)
}

