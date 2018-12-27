const money = {
  namespaced: true,
  state: {
    post: {
      uniacid: '',
      name: '',
      type: '',
      create_type: '',
      number: '',
      getmoney_id: '',
      member_id: '',
      money: '',
      state: '',
      remarks: '',
      truename: '',
      alipay: '',
      bank_card: '',
      bankname: '',
      time: ''
    },
    withdrawaltype: []// 提现方式列表
  },
  mutations: {
    // 提现方式列表
    settypelist(state, data) {
      state.withdrawaltype = data
    },
    // 提现详情
    one(state, data) {
      state.post.uniacid = data.uniacid
      state.post.name = data.name
      state.post.type = data.type
      state.post.create_type = data.create_type
      state.post.number = data.number
      state.post.getmoney_id = data.getmoney_id
      state.post.member_id = data.member_id
      state.post.money = data.money
      state.post.time = data.time
      state.post.state = data.state
      state.post.remarks = data.remarks
      state.post.truename = data.truename
      state.post.alipay = data.alipay
      state.post.bank_card = data.bank_card
      state.post.bankname = data.bankname
    }
  },
  actions: {
    // 提现方式列表
    typemoney(context, data) {
      console.log(data)
      context.commit('settypelist', data)
    },
    // 提现详情
    onemoney(context, data) {
      context.commit('one', data)
    }
  }
}

export default money
