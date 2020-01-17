import api from '../../api/taikhoan'

const state = {
  listTaiKhoan: []
}
const getters = {
  abc: state => state.listTaiKhoan
  // nghia: state => state.listTaiKhoan.filter(x => x.username !== 'Nghia')
}
const actions = {
  async getListTaiKhoanRequest ({ commit }, data) {
    const result = await api.getDataListTaiKhoan(data);
    commit('getListTaiKhoan', result)
  },
  async deleteTaiKhoanRequest ({ commit }, id) {
    const dele = await api.deleteDataTaiKhoan(id)
    commit('deleteTaiKhoan', id)
  },
  async addNewTaiKhoanRequest ({ commit }, data) {
    const result = await api.addDataTaiKhoan(data)
    commit('addNewTaiKhoan', data)
  },
  async editTaiKhoanRequest ({ commit }, data) {
    const edit = await api.editDataTaiKhoan(data)
    commit('editTaiKhoan', edit)
  }
}
const mutations = {
  getListTaiKhoan (state, data) {
    state.listTaiKhoan = data.results
  },
  deleteTaiKhoan (state, id) {
    // console.log(id)
    state.listTaiKhoan = state.listTaiKhoan.filter(x => x._id !== id)
  },
  addNewTaiKhoan (state, data) {
    state.listTaiKhoan.unshift(data)
    // console.log("12334")
  },
  editTaiKhoan (state, data) {
    state.listTaiKhoan = state.listTaiKhoan.map(x => {
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
  getters,
  actions,
  mutations
}
