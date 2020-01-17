import api from '../../api/cv_apply'
const state = {
  listCvApply: [],
  totals: 0
}
const actions = {
  async ListCvApplyRequest ({ commit }, data) {
    const result = await api.ListCvApply(data)
    commit('listCvApply', result)
  },
  async addCvApplyRequest ({ commit }, data) {
    const result = await api.addCvApply(data)
    commit('addCvApply', result)
  },
  async deleteCvRequest ({ commit }, id) {
    const result = await api.deleteCvApply(id)
    commit('deleteCvApply', { ...result, id })
  },
  async editCvApplyRequest ({ commit },data) {
    const result = await api.editCvApply(data)
    commit('editCvApply', result)
  }
}
const mutations = {
  listCvApply(state, data) {
    state.listCvApply = data.results;
    state.totals = data.count;
  },
  addCvApply(state, data) {
    state.listCvApply.unshift(data)
  },
  deleteCvApply(state, data){
    if(data.status) {
      state.listCvApply = (state.listCvApply || []).filter(x => x._id !== data.id);
    }
  },
  editCvApply(state, data) {
    state.listCvApply = state.listCvApply.map(x => {
      if (x._id === data._id) {
        return { ...x, ...data }
      }
      return x
    })
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
