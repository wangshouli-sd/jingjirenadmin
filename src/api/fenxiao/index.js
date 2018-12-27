import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 展示分销参数
export const fenxiaoinfo = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-distribution/getfenxiao',
    {
      params: {
      }
    },
  ).then(res => res.data)
}
// 设置分销参数
export const setfenxiao = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-distribution/setpercent',
    {
      fenxiao: data.fenxiao, // 0是不开启，1是开启1级，2是开启2级
      one: data.one, // 一级分销提成
      two: data.two // 二级分销提成
    },
  ).then(res => res.data)
}
// 展示海报参数
export const posterinfo = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-distribution/showposter',
    {
      params: {
      }
    },
  ).then(res => res.data)
}
// 设置海报参数
export const setposter = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-distribution/setposter',
    {
      name: data.name, // 海报名
      tap: data.tap, // 模板号
      backimg: data.backimg // 背景图id
    },
  ).then(res => res.data)
}
