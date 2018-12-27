// test
export default [
  {
    path: 'index',
    component: () => import('@/views/test/Index.vue'),
    name: 'testIndex',
    meta: {
      title: '测试首页'
    }
  },
  {
    path: 'detail',
    component: () => import('@/views/test/Detail.vue'),
    name: 'testDetail',
    meta: {
      title: '测试详情'
    }
  },
  {
    path: 'detail',
    component: () => import('@/views/test/Detail.vue'),

    meta: { title: '意见反馈', icon: 'edit', noCache: true }

  }
]
