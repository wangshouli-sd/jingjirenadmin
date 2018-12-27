import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* children*/
import test from './children/test.js'
/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '主页',
          icon: 'home',
          noCache: true
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: '测试',
  //     icon: 'lock'
  //   },
  //   children: test
  // },
  {
    path: '/project',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '项目管理',
      icon: 'project'
    },
    children: [
      { path: 'index', component: () => import('@/views/project/index'), name: 'projectIndex', meta: { title: '项目分类', noCache: true }},
      { path: 'manage', component: () => import('@/views/project/manage'), name: 'projectManage', meta: { title: '项目管理', noCache: true }},
      { path: 'add', component: () => import('@/views/project/add'), name: 'projectAdd', meta: { title: '新增项目', noCache: true }}
    ]
  },
  {
    path: '/business',
    component: Layout,
    redirect: 'noredirect',
    name: 'business',
    meta: {
      title: '业务管理',
      icon: 'yewu'
    },
    children: [
      { path: 'state0', component: () => import('@/views/business/state0'), name: 'businessState0', meta: { title: '待审核', noCache: true }},
      { path: 'state1', component: () => import('@/views/business/state1'), name: 'businessState1', meta: { title: '洽谈中', noCache: true }},
      { path: 'state1after', component: () => import('@/views/business/state1after'), name: 'businessState1after', meta: { title: '待传合同', noCache: true }},
      { path: 'state2', component: () => import('@/views/business/state2'), name: 'businessState2', meta: { title: '服务中', noCache: true }},
      { path: 'state3', component: () => import('@/views/business/state3'), name: 'businessState3', meta: { title: '已完成', noCache: true }},
      { path: 'state4', component: () => import('@/views/business/state4'), name: 'businessState4', meta: { title: '审核未通过', noCache: true }},
      { path: 'state1defeat', component: () => import('@/views/business/state1defeat'), name: 'businessState1defeat', meta: { title: '洽谈失败', noCache: true }},
      { path: 'state2defeat', component: () => import('@/views/business/state2defeat'), name: 'businessState2defeat', meta: { title: '服务终止', noCache: true }},
      { path: 'stateToload', component: () => import('@/views/business/stateToload'), name: 'businessStateToload', meta: { title: '合同上传-流程设置', noCache: true }, hidden: true },
      { path: 'detail', component: () => import('@/views/business/detail'), name: 'businessDetail', meta: { title: '业务详情', noCache: true }, hidden: true },
      { path: 'detailqiatan', component: () => import('@/views/business/detail_qiatan'), name: 'businessDetailqiatan', meta: { title: '业务洽谈详情', noCache: true }, hidden: true }
    ]
  },
  {
    path: '/agent',
    component: Layout,
    redirect: 'noredirect',
    name: 'agent',
    meta: {
      title: '经纪人',
      icon: 'jingjiren'
    },
    children: [
      { path: 'audit', component: () => import('@/views/agent/audit'), name: 'agentAudit', meta: { title: '待审核', noCache: true }},
      { path: 'index', component: () => import('@/views/agent/index'), name: 'agentIndex', meta: { title: '经纪人管理', noCache: true }},
      { path: 'notpass', component: () => import('@/views/agent/notpass'), name: 'agentNotpass', meta: { title: '未通过', noCache: true }},
      { path: 'commissiondetail', component: () => import('@/views/agent/commissiondetail'), name: 'agentCommissiondetail', meta: { title: '佣金明细', noCache: true }, hidden: true }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: 'noredirect',
    name: 'customer',
    meta: {
      title: '客户管理',
      icon: 'customer'
    },
    children: [
      { path: 'customer', component: () => import('@/views/customer/index'), name: 'customerIndex', meta: { title: '客户管理', noCache: true }},
      { path: 'customerdetail', component: () => import('@/views/customer/detail'), name: 'customerDetail', meta: { title: '客户详情', noCache: true }, hidden: true }

    ]
  },
  {
    path: '/withdrawal',
    component: Layout,
    redirect: 'noredirect',
    name: 'withdrawal',
    meta: {
      title: '提现管理',
      icon: 'caiwu'
    },
    children: [
      { path: 'state0', component: () => import('@/views/withdrawal/state0'), name: 'withdrawalState0', meta: { title: '审核中', noCache: true }},
      { path: 'state1', component: () => import('@/views/withdrawal/state1'), name: 'withdrawalState1', meta: { title: '待打款', noCache: true }},
      { path: 'state2', component: () => import('@/views/withdrawal/state2'), name: 'withdrawalState2', meta: { title: '已完成', noCache: true }},
      { path: 'state3', component: () => import('@/views/withdrawal/state3'), name: 'withdrawalState3', meta: { title: '未通过', noCache: true }}
    ]
  },
  {
    path: '/fenxiao',
    component: Layout,
    redirect: 'noredirect',
    name: 'fenxiao',
    meta: {
      title: '团队分销',
      icon: 'fenxiao'
    },
    children: [
      { path: 'posters', component: () => import('@/views/fenxiao/posters'), name: 'Fenxiaoposters', meta: { title: '海报模板', noCache: true }},
      { path: 'proportion', component: () => import('@/views/fenxiao/proportion'), name: 'Fenxiaoproportion', meta: { title: '佣金比例设置', noCache: true }}
    ]
  },
  {
    path: '/announcement',
    component: Layout,
    name: 'gonggao',
    meta: {
      title: '公告管理',
      icon: 'ggao'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/announcement/index'),
      name: 'announcement',
      meta: { title: '公告管理', icon: 'ggao', noCache: true }
    }]
  },
  {
    path: '/opinion',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/opinion/index'),
      name: 'opinion',
      meta: { title: '意见反馈', icon: 'edit', noCache: true }
    }]
  },
  {
    path: '/set',
    component: Layout,
    redirect: 'noredirect',
    name: 'set',
    meta: {
      title: '系统设置',
      icon: 'set'
    },
    children: [
      { path: 'custom', component: () => import('@/views/set/setcustom'), name: 'Setcustom', meta: { title: '自定义设置', noCache: true }},
      { path: 'setfl', component: () => import('@/views/set/setsyfenlei'), name: 'Setfl', meta: { title: '首页分类推荐', noCache: true }},
      { path: 'agreement', component: () => import('@/views/set/setagreement'), name: 'Setagreement', meta: { title: '用户协议', noCache: true }},
      { path: 'withdrawal', component: () => import('@/views/set/withdrawal'), name: 'Setwithdrawal', meta: { title: '提现设置', noCache: true }},
      { path: 'kefu', component: () => import('@/views/set/setkefu'), name: 'Setkefu', meta: { title: '客服设置', noCache: true }},
      { path: 'setmsgparams', component: () => import('@/views/set/setmsgparams'), name: 'Setmsgparams', meta: { title: '消息通知', noCache: true }},
      { path: 'settitle', component: () => import('@/views/set/settitle'), name: 'Settitle', meta: { title: '系统设置', noCache: true }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
