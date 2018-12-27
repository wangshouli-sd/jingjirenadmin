const detail = {
  namespaced: true,
  state: {
    list_money: [], // 佣金明细参数
    list_getmoney: [], // 提现明细列表
    page: {
      current: '',
      next: '',
      data_total: '',
      data_residue: 0,
      page_total: '',
      page_residue: 0
    },
    page_tixian: {
      current: '',
      next: '',
      data_total: '',
      data_residue: 0,
      page_total: '',
      page_residue: 0
    },
    main: {
      id: '',
      uniacid: '1',
      onlyid: '',
      openid: '',
      access_token: '',
      access_time: '0',
      name: '', // 真实姓名
      nick_name: '', // 微信名
      phone: '', // 手机号
      idcard: '', // 身份证号
      idcard_img: [], // 身份证正反照片
      idcard_pic: '', // 身份证正反照片的id
      sex: '', // 1男2女0保密
      touxiang: '', // 头像
      isjng_time: '', // 成为经纪人的时间
      allmoney: 0, // 累计佣金
      balance: 0, // 账户余额
      all_tixian: 0, // 累计提现
      ok_task: '0', // 完成的业务次数
      all_task: '0', // 业务提交次数
      all_son: '0', // 下级人数
      image: '',
      brithday: '',
      city: '',
      description: '',
      project_id: null,
      is_sender: '',
      is_manager: '',
      is_executer: '',
      blacklist: '1',
      create_time: '',
      update_time: '',
      is_del: ''
    }, // 当前用户信息
    parent: {
      id: '',
      uniacid: '',
      onlyid: '',
      openid: '',
      access_token: '',
      access_time: '',
      name: '', // 真实姓名
      nick_name: '', // 微信名
      phone: '', // 手机号
      idcard: '', // 身份证号
      idcard_img: [], // 身份证正反照片
      idcard_pic: '', // 身份证正反照片的id
      sex: '', // 1男2女0保密
      touxiang: '', // 头像
      isjng_time: '', // 成为经纪人的时间
      allmoney: 0, // 累计佣金
      balance: 0, // 账户余额
      all_tixian: 0, // 累计提现
      ok_task: '0', // 完成的业务次数
      all_task: '0', // 业务提交次数
      all_son: '0', // 下级人数
      image: '12',
      brithday: '',
      city: '',
      description: '',
      project_id: null,
      is_sender: '',
      is_manager: '',
      is_executer: '',
      blacklist: '1',
      create_time: '',
      update_time: '',
      is_del: '0'
    }, // 爸爸的信息 同上
    grend: {
      id: '',
      uniacid: '',
      onlyid: '',
      openid: '',
      access_token: '',
      access_time: '0',
      name: '', // 真实姓名
      nick_name: '', // 微信名
      phone: '', // 手机号
      idcard: '', // 身份证号
      idcard_img: [], // 身份证正反照片
      idcard_pic: '', // 身份证正反照片的id
      sex: '', // 1男2女0保密
      touxiang: '', // 头像
      isjng_time: '', // 成为经纪人的时间
      allmoney: 0, // 累计佣金
      balance: 0, // 账户余额
      all_tixian: 0, // 累计提现
      ok_task: '0', // 完成的业务次数
      all_task: '0', // 业务提交次数
      all_son: '0', // 下级人数
      image: '12',
      brithday: '',
      city: '',
      description: '',
      project_id: null,
      is_sender: '0',
      is_manager: '0',
      is_executer: '0',
      blacklist: '1',
      create_time: '',
      update_time: '',
      is_del: '0'
    } // 爷爷的信息 同上
  },
  mutations: {
    // 个人信息
    detail(state, data) {
      state.main = data.main
      state.parent = data.parent
      state.grend = data.grend
    },
    // 个人佣金列表
    getmoney(state, data) {
      state.list_money = data.list
      state.page = data.page
    },
    // 个人提现列表
    tixian(state, data) {
      state.list_getmoney = data.list
      state.page_tixian = data.page
    }
  },
  actions: {
    // 个人详情
    getdetail(context, data) {
      context.commit('detail', data)
    },
    // 个人佣金列表
    getmoneylist(context, data) {
      context.commit('getmoney', data)
    },
    // 个人提现列表
    tixianlist(context, data) {
      context.commit('tixian', data)
    }
  }

}
export default detail

