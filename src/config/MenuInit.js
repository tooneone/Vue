// 初始化菜单
import MenuUtils from './MenuUtils'
import * as routerConfig from '../router/routerConfig'

export const initMenu = (store, router, Cookies, flag, cb) => {
  let params = {}
  let routes = []
  store.dispatch('getMenuItem', params).then((data) => {
    MenuUtils(routes, data)
    const newroutes = router.options.routes
    Array.prototype.push.apply(routerConfig.mainRouter[routerConfig.mainRouter.findIndex((item, idx) => item.name === 'main')].children, routes)
    if (flag === 'refresh') {
      Array.prototype.push.apply(newroutes, routerConfig.mainRouter)
      Array.prototype.push.apply(newroutes, routerConfig.exceptionRouter)
      router.addRoutes(newroutes)
    } else {
      router.addRoutes([routerConfig.mainRouter[routerConfig.mainRouter.findIndex((item, idx) => item.name === 'main')]])
    }
    if (cb) cb()
  })
}
