import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import i18n from './i18n/'
import {initMenu} from './config/MenuInit'
import * as routerConfig from './router/routerConfig'
import ElementLocale from 'element-ui/lib/locale'
import echarts from 'echarts'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/tooltip'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'element-ui/lib/theme-chalk/display.css'

import Cookies from 'js-cookie'
import bcMainHeader from './components/common/bcMainHeader'

Vue.component('bcMainHeader', bcMainHeader)

import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification,
  Scrollbar
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)
Vue.use(ColorPicker)
Vue.use(Transfer)
Vue.use(Container)
Vue.use(Scrollbar)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Loading.directive)
Vue.use(echarts)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$cookies = Cookies
Vue.config.productionTip = false
/* 防止路由被刷新后 应该去取一次菜单数据  还要加入token的判断 */
let [menuData] = [store.getters.menuItem]
let isSession = () => Cookies.get('sessionId') && Cookies.get('sessionId').length > 0 && Cookies.get('sessionId') !== 'undefined'
if (menuData.length === 0 && isSession()) {
  initMenu(store, router, Cookies, 'refresh')
} else if (!isSession()) {
  const newroutes = router.options.routes
  Array.prototype.push.apply(newroutes, routerConfig.mainRouter)
  Array.prototype.push.apply(newroutes, routerConfig.exceptionRouter)
  router.addRoutes(newroutes)
}
const exNgprogressBody = ['login', 'index', '404', '500', '502', 'error']
const exLogin = ['login', '404', '500', '502', 'error']
/* 路由切换之前 */
router.beforeEach(function (to, from, next) {
  if (exNgprogressBody.findIndex((value) => value === to.name) === -1) {
    if (document.querySelector('.app-main-container') && exLogin.findIndex((value) => value === to.name) === -1 && isSession()) {
      NProgress.configure({parent: '.app-main-container'})
    }
  } else {
    NProgress.configure({parent: 'body'})
  }
  NProgress.start()
  if (!isSession() && exLogin.findIndex((value) => value === to.name) === -1) {
    Notification({title: '提示', message: '未登录或帐号信息已过期', type: 'warning'})
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (isSession() && to.name === 'login') {
     /* if(to.fullPath.length > 0) next({path: to.fullPath})
     else */
    next({path: '/index'})
  } else {
    next()
  }
})
/* 路由切换之后 */
router.afterEach(function (to) {
  NProgress.done()
})
/* eslint-disable no-new */
// i18n.locale = 'EN'
ElementLocale.i18n((key, value) => i18n.t(key, value))
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
