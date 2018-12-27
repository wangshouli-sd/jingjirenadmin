import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 设置打款方式
export const setdakuan = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-getmoney/setway',
    {
      name: data.name, // getmoney_alipay是支付宝，getmoney_bank是银行，getmoney_wechat是微信
      var: data.type // 1是启用，2是禁用
    },
  ).then(res => res.data)
}
// 银行列表
export const banklist = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-getmoney/banklist',
    {},
  ).then(res => res.data)
}
// 新增银行
export const addbank = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-getmoney/addbank',
    {
      bank_name: data.name
    },
  ).then(res => res.data)
}
// 设置银行
export const setbank = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-getmoney/setbank',
    {
      id: data.id,
      is_open: data.is_open
    },
  ).then(res => res.data)
}
// -------------------首页展示推荐分类设置页面-----------------
// 展示首页三块广告
export const showsan = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-san/san',
    {
      params: {}
    },
  ).then(res => res.data)
}
// 添加
export const addsan = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-san/addsan',
    {
      img: data.img,
      name: data.name,
      title: data.title,
      url: data.url
    },
  ).then(res => res.data)
}
// 修改
export const updatasan = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-san/addsan',
    {
      id: data.id,
      img: data.img,
      name: data.name,
      title: data.title,
      url: data.url
    },
  ).then(res => res.data)
}
// 删除
export const delsan = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-san/delsan',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
// ***************************************************改动**********************************************************
// -------------------轮播图设置页面-----------------
// 展示任务大厅顶部图片 + 自定义字段
export const showparams = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-set',
    {
      params: {}
    },
  ).then(res => res.data)
}
// 设置任务大厅顶部图片 + 自定义字段
export const setparams = (img, dic) => {
  return axios.post(
    store.state.baseurl + 'r=bk-set/banner',
    {
      img: img,
      money: dic
    },
  ).then(res => res.data)
}
// 获取项目列表
export const fecthproject = (that) => {
  return axios.get(
    that.$store.state.baseurl + 'r=bk-project',
    {
      params: {
        page: '1',
        size: '100',
        category: '',
        name: ''
      }
    },
  ).then(res => res.data)
}
// 获取banner list
export const getbannerlist = (that) => {
  return axios.get(
    store.state.baseurl + 'r=bk-banner/banner-list',
    {
      params: {}
    },
  ).then(res => res.data)
}
// 添加  一条 banner item
export const addbanneritem = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-banner/banner-add',
    {
      img_patch: data.img_id,
      params: data.params,
      to_patch: data.to_patch ? data.to_patch : '1'
    },
  ).then(res => res.data)
}
// 修改 一条 banner item
export const setbanneritem = (data, id) => {
  return axios.post(
    store.state.baseurl + 'r=bk-banner/banner-edit',
    {
      banner_id: id,
      img_patch: data.img_id,
      params: data.params,
      to_patch: data.to_patch
    },
  ).then(res => res.data)
}
// 删除 banner item
export const delbanneritem = (id) => {
  return axios.get(
    store.state.baseurl + 'r=bk-banner/banner-delete',
    {
      params: {
        banner_id: id
      }
    },
  ).then(res => res.data)
}
// ----------用户协议设置页----------//
// 展示用户协议
export const getagreement = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-set/showxieyi',
    {
      params: {}
    },
  ).then(res => res.data)
}
// 用户协议设置
export const setagreement = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-set/setxieyi',
    {
      xieyi: data
    },
  ).then(res => res.data)
}

// ====================================系统设置页面 - 页面标题和logo=================================//
// 获取
export const showtitleparams = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-set/gettitles',
    {
      params: {}
    },
  ).then(res => res.data)
}
// 设置
export const settitleparams = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-set/setlogo',
    {
      params: {
        logo: data.id,
        title: data.title
      }

    },
  ).then(res => res.data)
}

// ----------------------暂未使用 ---------------------- //
// 获取设置的模板消息参数参数
export const getmsgtemp = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-set/get-alisms',
    {
      params: {}
    },
  ).then(res => res.data)
}
// 设置模板消息参数参数
export const setmsgtemp = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-set/set-alisms',
    {
      id: data.id
    },
  ).then(res => res.data)
}
