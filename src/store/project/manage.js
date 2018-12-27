const project = {
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
    },
    post: {
      id: '', // 略
      uniacid: '', // 略
      name: '',
      subname: '',
      category_id: '',
      tags: [],
      table_id: '', //
      description: '',
      img: '',
      img_path: '',
      slide: '',
      slide_path: [],
      vt_price_percent: '', // 比例
      min_price: '',
      max_price: '',
      vt_price_already: '', // 放
      vt_price_total: '', // 已经成交 已发
      vt_project_count: '', // 申请人数
      time: '',
      is_open: '', // 启用，禁用
      order: '', // 排序 越大越靠前
      process: [{
        id: '1',
        uniacid: '1',
        project_id: '1',
        task_id: '0',
        process_name: '审核通过', //
        type: '3',
        content_type: '2',
        price: '0',
        order: '1', //
        create_time: '2018-09-28',
        update_time: '2018-09-28',
        is_del: '0',
        state: '0'
      }, {
        id: '2',
        uniacid: '1',
        project_id: '1',
        task_id: '0',
        process_name: '项目完成',
        type: '3',
        content_type: '2',
        price: '0',
        order: '1',
        create_time: '2018-09-28',
        update_time: '2018-09-28',
        is_del: '0',
        state: '0'
      }]
    },
    id: '1',
    img: '',
    add: {
      name: '',
      subname: '',
      category_id: '',
      tags: [],
      table_id: '',
      description: '',
      img: '',
      img_path: [],
      slide: '',
      slide_path: [],
      vt_price_percent: '', // 比例
      min_price: '',
      max_price: '',
      vt_price_already: '', // 放
      vt_price_total: '', // 已经成交 已发
      vt_project_count: '', // 申请人数
      time: '',
      is_open: '1', // 启用，禁用
      order: '', // 排序 越大越靠前
      process: [{
        id: '1',
        uniacid: '1',
        project_id: '1',
        task_id: '0',
        process_name: '审核通过', //
        type: '3',
        content_type: '2',
        price: '0',
        order: '1', //
        is_del: '0',
        state: '0'
      }, {
        id: '2',
        uniacid: '1',
        project_id: '1',
        task_id: '0',
        process_name: '项目完成',
        type: '3',
        content_type: '2',
        price: '0',
        order: '1',
        is_del: '0',
        state: '0'
      }]
    }
  },
  mutations: {
    // 项目列表
    projectlist(state, data) {
      state.list = data.list
      state.page = data.page
    },
    // 新增项目基本信息
    add(state, data) {
      state.post.uniacid = data.uniacid
      state.post.category_id = data.category_id
      state.post.name = data.name
      state.post.img = data.img
      state.post.vt_price = data.vt_price
      state.post.order = data.order
      state.min_price = ''
      state.max_price = ''
      state.post.vt_price_percent = data.vt_price_percent
      state.post.vt_price_total = data.vt_price_total
      state.post.vt_project_count = data.vt_project_count
      state.post.tags = data.tags
      state.post.description = data.description
      state.post.slide = data.slide
      state.post.process = data.process
      console.log(data)
    },
    // 获取项目详情项目详情 ok
    one(state, data) {
      state.post = data
    },
    del(state, data) {
      state.id = data.id
    },
    upimg(state, data) {
      state.img = data.img
    },
    // 设置页
    setbanner(state, data) { // 设置banner图片id
      state.post.slide = data
    },
    setlistimg(state, data) { // 设置list图片id
      state.post.img = data
    },
    setlist(state, data) { // 设置list图片url
      state.post.img_path = data.url
    },
    // 添加页
    // 设置listimgid
    addbanner(state, data) { // 设置banner图片id
      state.add.slide = data
    },
    addlistimg(state, data) { // 设置list图片id
      state.add.img = data
    },
    resret(state) {
      state.post.category_id = null
      state.post.name = null
      state.post.img_path = []
      state.post.vt_price = null
      state.post.vt_price_percent = null
      state.post.vt_price_total = null
      state.post.vt_project_count = null
      state.post.tags = []
      state.post.slide = null
      state.post.order = ''
      state.post.is_open = '1'
      state.post.process = [{
        id: '1',
        uniacid: '1',
        project_id: '1',
        task_id: '0',
        process_name: '审核通过', //
        type: '3',
        content_type: '2',
        price: '0',
        order: '1', //
        is_del: '0',
        state: '0'
      }, {
        id: '2',
        uniacid: '1',
        project_id: '1',
        task_id: '0',
        process_name: '项目完成',
        type: '3',
        content_type: '2',
        price: '0',
        order: '1',
        is_del: '0',
        state: '0'
      }]
    }
  },
  actions: {
    // 重置
    resettemp(context) {
      context.commit('resret')
    },
    // 项目列表
    getproject(context, data) {
      context.commit('projectlist', data)
    },
    // 新增项目
    addproject(context, data) {
      context.commit('add', data)
      // console.log(data)
    },
    // 项目详情
    oneproject(context, data) {
      context.commit('one', data)
    },
    // 删除项目
    delproject(context, data) {
      context.commit('del', data)
    },
    // 上传图片
    addimg(context, data) {
      context.commit('upimg', data)
    },
    // 修改页
    // 设置listimgid
    setlistid(context, data) {
      context.commit('setlistimg', data)
    },
    setlistimg(context, data) {
      context.commit('setlist', data)
    },
    // 设置bannerid
    setbannerid(context, data) {
      context.commit('setbanner', data)
    },
    // 设置detail id
    setdetailid(context, data) {
      context.commit('setdetail', data)
    },
    // 添加页
    // 设置listimgid
    addlistid(context, data) {
      context.commit('addlistimg', data)
    },
    // 设置bannerid
    addbannerid(context, data) {
      context.commit('addbanner', data)
    },
    // 设置detail id
    adddetailid(context, data) {
      context.commit('adddetail', data)
    }
  }
}

export default project
