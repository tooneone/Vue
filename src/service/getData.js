import {getInfo} from '@/config/axios'
import apiPath from './apiPath'
const url = process.env.NODE_ENV === 'development' ? '' : ''
/**
 * 登录接口
 * @param {}
 */
const login = (params) => getInfo(url + apiPath.login, params, 'post', false)
/**
 * 登出接口
 * @param {}
 */
const loginout = (params) => getInfo(url + apiPath.loginout, params, 'post', false)
/**
 * 测试列表数据接口
 */
const getTableData = (params) => getInfo(url + apiPath.tableApi, params, 'post', false)
/**
 * 账户管理
 */
const getAccount = (params) => getInfo(url + apiPath.getAccount, params, 'post', false)
const saveAccount = (params) => getInfo(url + apiPath.saveAccount, params, 'post', false)

/**
 * 获取菜单接口
 */
const getMenuItem = (params) => getInfo(url + apiPath.getMenuList, params, 'post', false)
/**
 * 获取广告计划接口
 */
const getadoptions = (params) => getInfo(url + apiPath.getadoptions, params, 'post', false)
/**
 * 获取广告维度接口
 */
const getaddimension = (params) => getInfo(url + apiPath.getaddimension, params, 'post', false)
export {
  login,             // 登录
  loginout,
  getTableData,
  getAccount,
  saveAccount,
  getMenuItem,      // 获取菜单
  getadoptions,        // 获取广告计划
  getaddimension       // 获取广告维度
}
