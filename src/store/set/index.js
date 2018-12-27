const set = {
  namespaced: true,
  state: {
    appid: '',
    secret: '',
    list: [],
    name: '', // 系统表的 如：getmoney_alipay是支付宝，getmoney_bank是银行，getmoney_wechat是微信
    var: '', // 1是启用，0是禁用
    uniacid: '',
    bank_name: '', //
    is_open: '',
    id: '',
    bannerlist: [
      {
        banner_id: '1',
        uniacid: '',
        img_patch: 'https://jingji.ijiechen.com/data/ji_jingjiren/2018102916/579861d59a35f165ad011f69518fe06e.png',
        params: null,
        to_patch: null,
        create_time: ''
      }
    ],
    bannertemp: {
      banner_id: '',
      uniacid: '',
      img_id: null,
      img_name: null,
      img_patch: null,
      params: null,
      to_patch: null,
      create_time: ''
    },
    san: [],
    onesan: {
      id: '',
      name: '',
      title: '',
      img: '',
      img_name: '',
      path: '',
      url: '',
      category: ''
    },
    img: '', // 工作台图片
    imgPath: [],
    dic: '', // 自定义佣金字段
    addagreement: { // 用户协议
      ids: '',
      paths: []
    },
    logoimg: {
      id: '',
      path: '',
      name: ''
    },
    pageparmas: {
      pagetitle: ''
    }
  },
  mutations: {
    // 银行列表
    banklist(state, data) {
      state.list = data.list
    },
    // 新增银行
    add(state, data) {
      state.post.uniacid = data.uniacid
      state.post.bank_name = data.bank_name
    },
    // 设置银行开关
    set(state, data) {
      state.post.id = data.id
      state.post.is_open = data.is_open
    },
    // 设置打款方式
    dakuan(state, data) {
      state.name = data.name
      state.var = data.var
    },
    // 展示首页论播图和自定义字段
    indeximg(state, data) {
      state.img = data.img
      state.imgPath = data.path
      state.dic = data.dic
    },
    // 王、
    // 修改上传用户协议图片id
    setidxy(state, data) {
      state.addagreement.ids = data
    },
    // 修改首页轮播图图片id
    setid(state, data) {
      state.img = data
    },
    // 设置小程序的appid
    set_appid(state, data) {
      state.appid = data.appid
      state.secret = data.secret
    },
    // 展示小程序的appid
    get_appid(state, data) {
      state.appid = data.appid
      state.secret = data.secret
    },
    // 设置三块广告
    set_san(state, data) {
      state.san = data
    },
    // 展示小程序三块广告
    get_san(state, data) {
      state.san = data
    },
    // 重置 temp
    reset(state) {
      state.onesan.id = ''
      state.onesan.name = ''
      state.onesan.title = ''
      state.onesan.img = ''
      state.onesan.path = ''
      state.onesan.url = ''
      state.onesan.img_name = ''
    },
    // 获取一条广告详情
    one(state, data) {
      state.onesan = Object.assign({}, data)
      // state.onesan = data
    },
    // 设置缩略图
    settypeone(state, data) {
      state.onesan.img = data.imgid
      state.onesan.path = data.file.url
      state.onesan.img_name = data.file.name
    },
    // ----------------------------------banner 相关  mutations----------------------------------------
    // 重置bannertemp
    resetbanner(state, data) {
      state.bannertemp.banner_id = ''
      state.bannertemp.img_id = ''
      state.bannertemp.img_name = ''
      state.bannertemp.img_patch = ''
      state.bannertemp.params = ''
      state.bannertemp.to_patch = ''
    },
    // 设置banner 选中图片
    setbanneritem(state, data) {
      state.bannertemp.img_id = data.imgid
      state.bannertemp.img_name = data.file.name ? data.file.name : ''
      state.bannertemp.img_patch = data.file.url ? data.file.url : ''
    },
    // 展示一条数据详情
    setitem(state, data) {
      state.bannertemp.banner_id = data.banner_id
      state.bannertemp.img_id = data.img_patch
      state.bannertemp.img_name = data.img_name ? data.img_name : ''
      state.bannertemp.img_patch = data.path ? data.path : ''
      state.bannertemp.params = data.params
      state.bannertemp.to_patch = data.to_patch
    },
    // ----------------------------------banner 相关----------------------------------------
    setworkbench(state, data) {
      state.img = data.imgid
      state.imgPath[0].id = data.imgid
      state.imgPath[0].name = data.file.name
      state.imgPath[0].path = data.file.url
    },
    setpage(state, data) {
      state.pageparmas.pagetitle = data.title
      state.logoimg.id = data.logoid
      state.logoimg.path = data.logo
    },
    setlogo(state, data) {
      state.logoimg.id = data.imgid
      state.logoimg.name = data.file.name
      state.logoimg.path = data.file.url
    }
  },
  actions: {
    // 设置小程序三块广告
    setsan(context, data) {
      context.commit('set_san', data)
    },
    // 展示小程序三块广告
    showsan(context, data) {
      context.commit('get_san', data)
    },
    // 广告详情
    onesan(context, data) {
      context.commit('one', data)
    },
    // 设置小程序
    setappid(context, data) {
      context.commit('set_appid', data)
    },
    // 展示小程序
    getappid(context, data) {
      context.commit('get_appid', data)
    },

    // 银行列表
    banklistall(context, data) {
      context.commit('banklist', data)
    },
    // 新增银行
    addproject(context, data) {
      context.commit('add', data)
    },
    // 设置银行开关
    setbank(context, data) {
      context.commit('set', data)
    },
    // 设置打款方式
    setdakuan(context, data) {
      context.commit('dakuan', data)
    },
    // 设置工作台图片+ 字段
    setindeximg(context, data) {
      context.commit('indeximg', data)
    },
    // 王
    // 修改选中的图片id
    setbannerid(context, data) {
      context.commit('setid', data)
    },
    //* 重置temp 首页展示顶部分类
    resettemp(context) {
      context.commit('reset')
    },
    // 设置缩略图
    settypeitem(context, data) {
      context.commit('settypeone', data)
    },
    // ----------------------------------banner 相关  actions----------------------------------------
    // 重置temp
    resetbannertemp(context, data) {
      context.commit('resetbanner', data)
    },
    // 设置banner temp  上传图片
    setbannerimg(context, data) {
      context.commit('setbanneritem', data)
    },
    // 展示banner  item详情 展示一条
    setbanneritem(context, data) {
      context.commit('setitem', data)
    },
    // ----------------------------------banner 相关  actions----------------------------------------
    // 工作台
    setworkbenchimg(context, data) {
      context.commit('setworkbench', data)
    },
    // ----------------------------------后台标题 相关  actions----------------------------------------
    // 工作台
    setpageparmas(context, data) {
      context.commit('setpage', data)
    },
    setpagelogo(context, data) {
      context.commit('setlogo', data)
    }
  }
}

export default set
