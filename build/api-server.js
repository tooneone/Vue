
const appData = require('../mock/data.json')
const apiPath = require('../src/service/apiPath')
const bodyParser = require('body-parser')
const cookie = require('cookie')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({
  extended: false
})
const tableData = appData.tableData
const menuData = appData.menuData
const accountData = appData.accountData
const saveAccount = appData.saveAccount
module.exports = (app) =>{
  const JSONCookie = function (str) {
    if (!str || str.substr(0, 2) !== 'j:') return //判断是否为JSON字符序列，如果不是返回undefined
    try {
      return JSON.parse(str.slice(2)) //解析JSON字符序列
    } catch (err) {
      // no op
    }
  }
  const JSONCookies = function (obj) {
    var cookies = Object.keys(obj); //获取obj对象的property
    var key
    var val
    //循环判断并解析
    for (let i = 0; i < cookies.length; i++) {
      key = cookies[i]
      val = JSONCookie(obj[key])
      //如果是JSON字符序列则保存
      if (val) {
        obj[key] = val
      }
    }
    return obj
  }
  const returnData_ = (req, res, data) => {
    const cookies = req.headers.cookie //保存对象地址，提高运行效率
    req.cookies = Object.create(null) //创建一个对象，解析后的且未使用签名的cookie保存在req.cookies中
    req.cookies = cookie.parse(cookies) //与express中调用cookie.serialize()对应，解析cookie
    req.cookies = JSONCookies(req.cookies)
    if (req.cookies.sessionId && req.cookies.sessionId.length > 0) {
      res.json({
        code: 2,
        data: data,
        msg: 'success'
      })
    } else {
      res.json({
        code: 3,
        data: null,
        msg: 'session 过期'
      })
    }
  }
  app.post(apiPath.login, urlencodedParser, (req, res) => {
      let params = {}
      let returnData = {}
      for (let key in req.body) {
        params = JSON.parse(key)
      }
      if (params.user === 'admin' && params.pass === '123456') {
        returnData = {
          code: 2,
          data: {},
          msg: 'success'
        }
        res.cookie('sessionId', new Date().getTime())
      } else {
        returnData = {
          code: 1,
          data: {},
          msg: '帐号信息错误'
        }
      }
      res.json(returnData)
    }),
    app.post(apiPath.loginout, urlencodedParser, (req, res) => {
      res.clearCookie('sessionId')
      res.json({
        code: 2,
        data: {},
        msg: 'success'
      })
    }),
    app.post(apiPath.tableApi, urlencodedParser, (req, res) => {
      returnData_(req, res, tableData)
    }),
    app.post(apiPath.getMenuList, urlencodedParser, (req, res) => {
      returnData_(req, res, menuData)
    }),
  app.post(apiPath.getAccount, urlencodedParser, (req, res) => {
      returnData_(req, res, accountData)
    }),
  app.post(apiPath.saveAccount, urlencodedParser, (req, res) => {
    returnData_(req, res, saveAccount)
  })
}


