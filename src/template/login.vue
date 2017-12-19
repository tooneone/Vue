<template>
  <div class="login">
    <div class="header">
      <h2>欢迎来到登录界面</h2>
    </div>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >

      <el-form :model="ruleForm2"  status-icon :rules="rules2" ref="ruleForm2" label-width="0" class="demo-ruleForm  el-col-xs-24 el-col-sm-8 el-col-md-6 el-col-lg-6 el-col-xl-6">
        <h3 class="">账号登录</h3>
        <el-form-item  prop="user">
          <el-input placeholder="用户名 admin" type="text" v-model="ruleForm2.user" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="pass">
          <el-input placeholder="密码 123456" type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="valid">
          <el-input placeholder="验证码" v-model="ruleForm2.valid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <div class="footer">
      我的网络科技有限公司©2014 浙ICP备12040171号
    </div>

  </div>
</template>
<script>
  import {initMenu} from '../config/MenuInit'
  export default {
    data () {
      // var checkAge = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('年龄不能为空'));
      //   }
      //   setTimeout(() => {
      //     if (!Number.isInteger(value)) {
      //     callback(new Error('请输入数字值'));
      //   } else {
      //     if (value < 18) {
      //       callback(new Error('必须年满18岁'));
      //     } else {
      //       callback();
      //     }
      //   }
      // }, 1000);
      // };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          if (this.ruleForm2.user !== '') {
            // this.$refs.ruleForm2.validateField('user')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm2.pass !== '') {
            // this.$refs.ruleForm2.validateField('pass')
            callback()
          }
        }
      }
      var checkValid = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else {
          if (this.ruleForm2.valid !== '') {
            // this.$refs.ruleForm2.validateField('valid')
            callback()
          }
        }
      }
      // var validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入密码'))
      //   } else if (value !== this.ruleForm2.pass) {
      //     callback(new Error('两次输入密码不一致!'))
      //   } else {
      //     callback()
      //   }
      // }
      return {
        ruleForm2: {
          user: '',
          pass: '',
          valid: ''
        },
        rules2: {
          user: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          valid: [
            { validator: checkValid, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        var _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$store.dispatch('login', _this.ruleForm2).then((data) => {
              if (data.code === 1) {
                _this.$notify({title: '提示', message: data.msg, type: 'error'})
              } else if (data.code === 2) {
                _this.$notify({title: '登录成功', type: 'success'})
                initMenu(_this.$store, _this.$router, _this.$Cookies, 'login', function () {
                  let path = _this.$router.currentRoute.query.redirect ? _this.$router.currentRoute.query.redirect : '/index'
                  _this.$router.replace(path)
                })
              }
            })
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style scoped>
  h3 {
    font-size: 20px;
    font-weight: 500;
    height: 48px;
    margin-bottom: 50px;
    line-height: 48px;
    color: #66b1ff;
    background-color: #E3E3E3;
    padding: 0 31px;

  }



  h2{
    font-size: 25px;
    width: 80%;
    margin: 20px auto;
    height: 70px;
  }
 .login {
   height: 100%;
   width: 100%;
   padding: 98px 0 98px 0;
   box-sizing: border-box;
   position: relative;
 }
  .el-col {
    width: 100%;
    height: 100%;
    background: url("../assets/baner_bg.jpg") no-repeat top/cover;
  }
  @media screen and (max-width: 768px) {
    .el-form {
      background-color: white;
      /*border: solid 2px #e6e5e5;*/
    }
  }
  @media screen and (min-width: 768px)and (max-width: 992px) {
    .el-form {
      background-color: white;
      /*border: solid 2px #e6e5e5;*/

    }
  }
  @media screen and (min-width: 992px) and (max-width: 1200px) {
    .el-form {
      float: right;
      height: 400px;
      right: 100px;
      background-color: white;
      border: solid 2px #e6e5e5;
      position: absolute;
      top: 50%;
      margin-top: -200px;
      /*padding-bottom: 98px;*/
    }
  }
  @media screen and (min-width: 1200px) and (max-width: 1920px) {
    .el-form {
      float: right;
      height: 400px;
      right: 100px;
      background-color: white;
      border: solid 2px #e6e5e5;
      position: absolute;
      top: 50%;
      margin-top: -200px;
      /*padding-bottom: 98px;*/
    }
  }
  @media screen and (min-width: 1920px) {
    .el-form {
      float: right;
      height: 400px;
      right: 100px;
      background-color: white;
      border: solid 2px #e6e5e5;
      position: absolute;
      top: 50%;
      margin-top: -200px;
      /*padding-bottom: 98px;*/
    }
  }

  .el-form-item {
    padding: 0 31px;
  }
  .header {
    height: 98px;
    width: 100%;
    position: absolute;
    background-color: white;
    top: 0;

  }
  .footer {
    height:98px;
    position: absolute;
    width: 100%;
    bottom: 0;
    text-align: center;
    font-size: 14px;
    color: #666666;
    line-height: 150px;
  }
</style>
