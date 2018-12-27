import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
Vue.use(axios)
// 经纪人审核不通过列表
export const notpass = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-member/audit0',
    {
      params: {
        page: data.page,
        size: data.limit,
        name: data.title
      }
    },
  ).then(res => res.data)
}
// 删除未通过审核的经纪人http://weiqing-zmy.com/web/index.php?c=site&a=entry&m=jc_jingjiren&do=index&r=bk-set/taskcount
export const delnotpass = (data) => {
  return axios.get(
    store.state.baseurl + 'r=bk-member/delall',
    {
      params: {
        id: data
      }
    },
  ).then(res => res.data)
}
