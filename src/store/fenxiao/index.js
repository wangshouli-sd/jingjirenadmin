const fenxiao = {
  namespaced: true,
  state: {
    fenxiao: '', // 0是不开启，1是开启一级，2是开启二级
    one: '', // 一级分销佣金
    two: '', // 二级分销佣金
    name: '', // 海报名
    tap: '', // 模板号
    backimg: '', // 背景图id
    files: ''// 图片上传
  },
  mutations: {
    // 设置分销参数
    set(state, data) {
      state.fenxiao = data.fenxiao
      state.one = data.one
      state.two = data.two
    },
    // 展示分销参数
    info(state, data) {
      state.fenxiao = data.fenxiao
      state.one = data.one
      state.two = data.two
    },
    // 设置海报参数
    posterset(state, data) {
      state.name = data.name
      state.tap = data.tap
      state.backimg = data.backimg
    },
    // 展示海报参数
    poster(state, data) {
      state.name = data.name
      state.tap = data.tap
      state.backimg = data.backimg
      state.files = data.files
    },
    // 设置海报背景图
    setimg(state, data) {
      state.files = data.url
      state.backimg = data.id
    }
  },
  actions: {
    // 设置分销
    setfenxiao(context, data) {
      context.commit('set', data)
    },
    // 分销参数展示
    fenxiaoinfo(context, data) {
      context.commit('info', data)
    },
    // 设置海报
    setposter(context, data) {
      context.commit('posterset', data)
    },
    // 海报参数展示
    posterinfo(context, data) {
      context.commit('poster', data)
    },
    // // 海报展示图
    setposterimg(context, data) {
      context.commit('setimg', data)
    }
  }
}

export default fenxiao
