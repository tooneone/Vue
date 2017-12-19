import {generateComponentFunction} from './lazyLoading'

/**
 * flag 1是菜单  2 是操作权限
 * menu.show 控制是否显示菜单
 * seq 控制菜单的排序
 */


export default (routers, data) => {
  // 这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
  // 所以这里要做一些转换
  generaMenu(routers, data)
}
function generaMenu (routers, data, flag = 1) {
  
  /* 菜单排序 start */
   data.sort(function(current,next){
     return (next.seq && current.seq) ? (current.seq - next.seq) : false
   })
  /* 菜单排序   end */
  
  data.forEach((item) => {
    if (flag === 2 && item.type === '1') return false
    let menu = Object.assign({}, item)
    menu.name = item.path
    menu.path = '/' + item.path
    menu.meta = {}
    menu.meta.pageName = (item.menuName ? item.menuName : null)
    menu.meta.currentMenu = item
    menu.show = true
    /* 如果是操作权限，默认不显示菜单  */
    if (flag === 2) {menu.show = false}
    /* page动态加载组件  start */
    if (!menu.children) {menu.component = generateComponentFunction(item.url)} else {
      menu.component = null
      generaMenu(routers, item.children)
    }
    /* page动态加载组件 end */
    /* 操作权限为路由  start */
    if (item.operarte && item.operarte.length > 0) {
      menu.operarte = item.operarte
      generaMenu(routers, item.operarte, 2)
    }
     /* 操作权限为路由  end */
    routers.push(menu)
  })
}
