// 业务待传合同列表
const state1after = {
  namespaced: true,
  state: {
    list: [],
    // 详情页的信息
    details: {
      id: '',
      uniacid: '',
      project_id: '',
      userphone: '',
      username: '',
      dics_id: '',
      dics_data: '',
      describe: '',
      state_check: '',
      state_why: '',
      state_progress: '', // 流程进度 1：洽谈中/2：服务中/3：已完成   4:待传合同
      send_id: '', // 需求提供者 默认 管理员为0
      is_bind_manager: '',
      manager_id: '',
      is_bind_executer: '',
      execute_id: '',
      contract_id: '',     // 合同id
      task_number: '',   // 任务编号
      is_stop: '',       // 是否停止
      stop_id: '',
      stop_remark: '',      // 打断的理由
      stop_state: '',
      total_price: '',
      back_percent: '',
      projectname: '',    // 项目名称
      time: '',
      main_name: '',   // 经纪人名字
      main_phone: '',  // 经纪人手机号
      main_allmoney: '',       // 经纪人累计佣金
      main_thismoney: '',    // 经纪人      可获得佣金==预计佣金
      min_vtmoney: '',     //  经纪人     项目预计最小佣金
      max_vtmoney: '',     //  经纪人     预计最大佣金
      one_name: 'name1',            //  一级分销商名字
      one_phone: '',         //  一级分销商手机号
      one_time: '',    // 一级分销商加入时间
      one_thismoney: '',          // 一级分销商可获得佣金==预计佣金
      two_name: '',         //  二级分销商名字
      two_phone: '',        // 二级分销商手机号
      two_time: '',     // 二级分销商加入时间
      two_thismoney: ''       //二级分销商可获得佣金==预计佣金
    },
    contract: [
      {
        id: '', // 合同id
        uniacid: '',
        name: '', // 图片姓名
        path: '' // 图片路径
      }
    ],
    page: {
      current: '',
      next: '',
      data_total: '',
      data_residue: '',
      page_total: '',
      page_residue: ''
    },
    selectitemID: '',
    steps: [
      {
        process_name: '成功签约',
        key: Date.now(),
        price: null,
        content_type: '2'
      }, {
        process_name: '项目完成',
        key: Date.now() + 2,
        price: null,
        content_type: '2'
      }
    ],
    uploadcontractID: ['']

  },
  mutations: {
    state1list(state, data) {
      state.list = data.list
      state.page = data.page
    },
    // 详情
    getdetail(state, data) {
      state.details = data.member
      state.contract = data.contract
    },
    // 删除
    del(state, data) {
      state.id = data.id
    },
    // 设置流程
    proce(state, data) {
      state.post.task_id = data.task_id
      state.post.type = data.type
      state.post.uniacid = data.uniacid
      state.post.project_id = data.project_id
      state.post.order = data.order
      state.post.process_name = data.process_name
      state.post.content_type = data.content_type
      state.post.price = data.price
    },
    // // 设置选中项上传合同图片id
    // setfile(state, data) {
    //   state.uploadcontractID = data
    // },

    // 设置选中项上传合同图片id
    setfile(state, data) {
      state.details.contract_id = data
    }
  },
  actions: {
    // 列表
    getstate1contract1(context, data) {
      context.commit('state1list', data)
    },
    // 删除
    delstate1(context, data) {
      context.commit('del', data)
    },
    // 设置流程
    process(context, data) {
      context.commit('proce', data)
    },
    // // 设置选中的图片id
    // setfileId(context, data) {
    //   context.commit('setfile', data)
    // },
    // 获取详情
    getstate1member(context, data) {
      context.commit('getdetail', data)
    },
    // 设置选中的图片id
    setfileId(context, data) {
      context.commit('setfile', data)
    }
  }
}

export default state1after

