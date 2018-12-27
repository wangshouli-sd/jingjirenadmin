const category = {
  namespaced: true,
  state: {
    list: [],
    page: {
      current: '',
      next: '',
      data_total: '',
      data_residue: '',
      page_total: '',
      page_residue: ''
    }
  },
  mutations: {
    categorylist(state, data) {
      state.list = data.list
      state.page = data.page
    }
  },
  actions: {
    // 分类列表
    getcategory(context, data) {
      context.commit('categorylist', data)
    }
  }

}

export default category

