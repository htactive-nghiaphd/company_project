import api from '../../api/intership'
const state = {
  listIntership: []
}

const getters = {
  listIntership: state => state.listIntership
}

const actions = {
  async getListIntershipRequet ({ commit }, data) {
    const response = await api.getAllInterShipFromApi(data)
    commit('listIntership', response)
  },
  async deleteIntershipRequest ({ commit }, id) {
    const result = await api.deleteIntership(id)
    commit('deleteIntership', result)
  },
  async addIntershipRequest ({ commit }, data) {
    const result = await api.addIntership(data)
    // console.log(data)
    commit('addInterships', result)
  }
}

const mutations = {
  listIntership(state, response) {
    state.listIntership = response.results
  },
  deleteIntership(state, response) {
    if (response.status) {
      state.listInterface = (state.listInterface || []).filter( x => x._id !== id )
    } else {
      console.log(`error: ${response.errMessage}`)
    }
  },
  addInterships(state, data) {
    // state.listIntership.push(data)
    console.log(data)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
