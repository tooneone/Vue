<template>
  <el-container class="bc-continer">
    <el-header class="bc-Breadcrumb">
      <bcMainHeader></bcMainHeader>
    </el-header>
    <el-main>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="用户角色" prop="role">
        <el-select v-model="ruleForm.role" placeholder="请选择角色">
          <el-option label="角色一" value="admin"></el-option>
          <el-option label="角色二" value="demo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户金额" prop="money">
        <el-input v-model="ruleForm.money"></el-input>
      </el-form-item>
      <el-form-item label="密码设置" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="账户状态" prop="delivery">
        <el-switch
          v-model="value3"
          active-text="启用"
          inactive-text="禁用">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    data () {
      var checkMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户金额不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value * 1)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value * 1 < 0) {
              callback(new Error('必须是正数'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          name: '',
          role: '',
          money: '',
          pass: '',
          checkPass: ''
        },
        value3: true,
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          role: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
          money: [
            { validator: checkMoney, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
         let _this=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            this.$store.dispatch('saveAccount', this.ruleForm).then(function(data){
              console.log(data.data[0].success)
              alert(data.data[0].success)
            })
          } else {
            console.log('error submit!!')
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
  .bc-continer .el-main {
    padding: 15px 200px 0 200px;
  }
</style>
