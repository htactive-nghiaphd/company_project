import api from '../../api/salary_basic'
const state = {
  listSalary_basic: []
}
const getters = {}
const actions = {
  async getListSalaryBasicRequest ({ commit }, data) {
    const result = await api.getListSaralyBasic(data)
    commit('listSalaryBasic', result)
  },
  async addSalaryBasicRequest ({ commit }, data) {
    const result = await api.addSalaryBasic(data)
    commit('addSalaryBasic', result)
  }
}
const mutations = {
  listSalaryBasic(state, data) {
    state.listSalary_basic = data.results
  },
  addSalaryBasic (state,data) {
    // state.listSalary_basic.push(data)
    console.log('sahjcva')
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
