// import {menuData} from '@/assets/json/menu'
import * as api from '@/service/getData'
// import * as util from '@/config/mUtils'
import * as types from './mutation-types'
export default {
  loginout: ({commit}, params) => api['loginout'](params).then((data) => data),
  login: ({commit}, params) => api['login'](params).then((data) => data),
  getMenuItem: ({commit}, params) => api['getMenuItem'](params).then((data) => {
    commit(types.MENU_ITEM, data.data)
    return data.data
  }),
  getTableData: ({commit}, params) => api['getTableData'](params).then((data) => data),
  getAccount: ({commit}, params) => api['getAccount'](params).then((data) => data),
  saveAccount: ({commit}, params) => api['saveAccount'](params).then((data) => data),
  getadoptions: ({commit}, params) => api['getadoptions'](params).then((data) => data),
  getaddimension: ({commit}, params) => api['getaddimension'](params).then((data) => data)

}
