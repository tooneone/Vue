import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
Vue.use(Vuex)

const state = {
  menuItems: [],
  tabledata: [],
  colorlist: {
    'menucolor': '#fff',
    'textcolor': '#000',
    'textactivecolor': 'blue'
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
