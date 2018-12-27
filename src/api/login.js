import request from '@/utils/request'
// import { param2Obj } from '@/utils'
import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)

// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: 'http://weiqing-zmy.com/app/index.php?i=4&c=entry&a=wxapp&do=index&m=jc_jingjiren&r=base/login',
//     method: 'post',
//     data
//   })
// }
// export function getUserInfo(token) {
//   console.log('getuserinfo---token:' + token)
//   return request({
//     url: 'http://weiqing-zmy.com/app/index.php?i=4&c=entry&a=wxapp&do=index&m=jc_jingjiren&r=base/login',
//     method: 'post',
//     params: { token }
//   })
// }
export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}
//
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

