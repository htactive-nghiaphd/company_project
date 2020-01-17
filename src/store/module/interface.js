import api from '../../api/signIn'
import { items } from '../../mock-data/dataInterface'
const state = {
  items
}

// getters
const getters = {
  // auth: state => state.auth
}

const actions = {
  async sigInRequest ({ commit }, data) {
    commit('created', await api.signIn(data))
  }
}
const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
