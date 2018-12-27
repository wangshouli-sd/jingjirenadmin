import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)

// 分类列表---下拉框专用 只有开启了分类才显示
export function fecthcategory(that, page) {
  axios.get(that.$store.state.baseurl + 'r=bk-category', {
    params: {
      page: page.page,
      size: page.limit
    }
  })
    .then(function(res) {
      //     if (res.data.status.state === 'success') {
      that.$store.dispatch('projectindex/getcategory', res.data)
      //    }
    })
    .catch(function(err) {
      console.log(err)
    })
}

// 分类列表---所有分类的显示
export const fecthcategoryall = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-category',
    {
      params: {
        page: data.page,
        size: data.limit
      }
    },
  ).then(res => res.data)
}
// 新增分类
export const addcategory = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-category/createup',
    {
      title: data.title,
      is_open: data.is_open, // 是否启用 1 启用 2禁用
      is_index: data.is_index, // 是否首页推荐 1推荐 2 不推荐
      description: data.description
    },
  ).then(res => res.data)
}
// 编辑分类
export const editcategory = (data) => {
  return axios.post(
    store.state.baseurl + 'r=bk-category/createup',
    {
      id: data.id,
      title: data.title,
      is_open: data.is_open, // 是否启用 1 启用 2禁用
      is_index: data.is_index, // 是否首页推荐 1推荐 2 不推荐
      description: data.description
    },
  ).then(res => res.data)
}

// 删除一个分类
export const delcategory = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-category/del',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}

// 分类详情
export const onecategory = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-category/one',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
