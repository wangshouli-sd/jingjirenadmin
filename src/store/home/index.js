const home = {
  namespaced: true,
  state: {
    tongji: [],
    money: {
      money: '0', // 签约金额
      getmoney: '0', // 发放佣金
      membercount: '0', // 经纪人总数
      taskcount: '0' // 业务完成总数
    }
  },
  mutations: {
    info(state, data) {
      state.tongji = data.list
    },
    // 财务中心
    money(state, data) {
      state.money = data
    }
  },
  actions: {
    showinfo(context, data) {
      context.commit('info', data)
    },
    totalmoney(context, data) {
      context.commit('money', data)
    }
  }
}

export default home
