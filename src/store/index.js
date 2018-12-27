import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

import homeindex from './home/index'
import agentdetail from './agent/detail'
import projectindex from './project/index'
import projectlist from './project/manage'
import ywdetails from './business/details'
import financial from './financial/index'
import state1after from './business/state1after'
import setindex from './set/index'
import fenxiaoindex from './fenxiao/index'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    author: 'wangpeng',
    count: 1,
    // baseurl: ''
    baseurl: 'http://weiqing-zmy.com/web/index.php?c=site&a=entry&m=jc_jingjiren&do=index&'
  },
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    homeindex, // 首页图表
    agentdetail, // 经纪人详情页-佣金明细
    projectindex, // 项目分类
    projectlist, // 项目列表
    ywdetails, // 业务详情
    financial, //
    state1after, // 待传合同列表
    setindex, // 设置列表
    fenxiaoindex // 分销设置页
  },
  mutations: {
    increment(state) {
      // 变更状态
      state.count++
    },
    add(state, n) {
      state.count += n.a
    },
    sub(state) {
      state.count--
    },
    // 设置默认url
    seturl(state, data) {
      state.baseurl = data
    }
  },
  actions: {
    // 2种书写方式
    addplus(context) { // 可以理解为代表了整个的context
      context.commit('add', { a: 10 })
    },
    subplus({ commit }) {
      commit('sub')
    },
    // 设置默认url
    setbaseUrl(context, data) {
      context.commit('seturl', data)
    }
  },

  getters
})

export default store
