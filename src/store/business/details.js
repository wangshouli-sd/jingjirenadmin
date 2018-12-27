// 业务详情页

const detail = {
  namespaced: true,
  state: {
    member: {
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
      state_progress: '',
      send_id: '',
      is_bind_manager: '',
      manager_id: '',
      is_bind_executer: '',
      execute_id: '',
      contract_id: '',
      task_number: '',
      is_stop: '',
      stop_id: '',
      stop_remark: null,
      stop_state: '',
      total_price: '',
      back_percent: '',
      is_del: '0',
      projectname: '',
      time: '',
      main_name: '',
      main_phone: '',
      main_allmoney: '',
      main_thismoney: '',
      min_vtmoney: '',
      max_vtmoney: '',
      one_name: '',
      one_phone: null,
      one_time: '',
      one_thismoney: '',
      two_name: '',
      two_phone: '',
      two_time: '',
      two_thismoney: ''
    },
    process: [
      {
        id: '',
        uniacid: '',
        project_id: '',
        task_id: '',
        process_name: '',
        type: '',
        content_type: '',
        price: '',
        order: '',
        is_del: '',
        state: '',
        finish_time: ''
      }
    ],
    contract: [
      {
        id: '',
        name: '',
        path: ''
      }
    ]

  },
  mutations: {
    // 获取业务详情
    getdetail(state, data) {
      state.member = data.member
      state.process = data.process
      state.contract = data.contract
    },
    // 列表 人的详情
    statemember(state, data) {
      state.member = data.member
    },
    // 流程的详情
    stateprocess(state, data) {
      state.process = data.process
    },
    // 合同的详情
    statecontract(state, data) {
      state.contract = data.list
    },
    // 设置选中项上传合同图片id
    setfile(state, data) {
      state.member.contract_id = data
    }
  },
  actions: {
    // 获取详情
    getstatedetail(context, data) {
      context.commit('getdetail', data)
    },
    // 列表 人的详情
    getstatemember(context, data) {
      context.commit('statemember', data)
    },
    // 流程的详情
    getstate1process(context, data) {
      context.commit('stateprocess', data)
    },
    // 合同的详情
    getstate1contract(context, data) {
      context.commit('statecontract', data)
    },
    // 设置选中的图片id
    setfileId(context, data) {
      context.commit('setfile', data)
    }

  }
}
export default detail
