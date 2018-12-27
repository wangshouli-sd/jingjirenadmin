import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// get获取设置的支付宝打款参数
export const getalipay = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-set/get-alipay',
    {
      params: {}
    },
  ).then(res => res.data)
}
// 设置支付宝打款接口参数 keyid   secret   singname（签名）   templateid（模板id）    code（模板变量名字）
export const setalipay = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-set/set-alipay',
    {
      appid: data.appid,
      private: data.private,
      public: data.public,
      singtype: data.singtype,
      showname: data.showname,
      remark: data.remark
    },
  ).then(res => res.data)
}

// 获取设置的支付宝短信参数
export const getalisms = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-set/get-alisms',
    {
      params: {}
    },
  ).then(res => res.data)
}
// 设置短信接口
export const setalisms = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-set/set-alisms',
    {
      keyid: data.keyid,
      secret: data.secret,
      singname: data.singname,
      templateid: data.templateid,
      code: data.code
    },
  ).then(res => res.data)
}
