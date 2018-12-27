import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 公告列表
export const fecthnotice = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-notice',
    {
      params: {
        page: data.page,
        size: data.limit,
        title: data.title
      }
    },
  ).then(res => res.data)
}
// 新增公告
export const addnotice = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-notice/create',
    {
      title: data.title,
      img: data.img,
      content: data.content,
      look: data.look,
      is_open: data.is_open
    },
  ).then(res => res.data)
}
// 编辑公告
export const editnotice = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-notice/edit',
    {
      id: data.id,
      title: data.title,
      img: data.img,
      content: data.content,
      look: data.look,
      is_open: data.is_open
    },
  ).then(res => res.data)
}
// 删除公告
export const delnotice = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-notice/del',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}

