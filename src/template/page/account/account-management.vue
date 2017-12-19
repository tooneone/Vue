<template>
  <el-container class="bc-continer">
    <el-header class="bc-Breadcrumb">
      <bcMainHeader></bcMainHeader>
    </el-header>
    <el-main>
    <!--<el-row>-->
      <!--<el-col :span="1"><div class="grid-content bg-purple"></div></el-col>-->
      <!--<el-col :span="6"><div class="grid-content bg-purple-light">-->
        <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
          <!--<el-breadcrumb-item  :to="{ path: '/new-account' }"> <el-button type="primary"  icon="el-icon-plus">创建用户</el-button></el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
      <!--</div></el-col>-->
      <!--<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
      <!--<el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>-->
    <!--</el-row>-->
      <el-form :inline="true" :model="formInline" size="small" class="demo-form-inline">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="center"
            unlink-panels
            range-separator="至"
            start-placeholder=""
            end-placeholder=""
            :picker-options="pickerOptions2" size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.user" placeholder="输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/new-account' }"><el-button type="primary"  icon="el-icon-plus" >创建用户</el-button></el-breadcrumb-item>
          </el-breadcrumb>
        </el-form-item>
      </el-form>
    <el-row>
      <!--<el-col :span="1"><div class="grid-content bg-purple"></div></el-col>-->
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <el-table
          :data="tableData4"
          style="width: 100%;"
          max-height="250" size="small">
          <el-table-column
            fixed
            prop="date"
            label="用户名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="账户角色"
            width="120">
          </el-table-column>
          <el-table-column
            prop="province"
            label="账户金额"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="账户状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="注册时间"
            width="260">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="更新时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData4)"
                type="text"
                size="small">
                移除
              </el-button>
              <el-button
                type="text"
                size="small" @click="check()">
                查看
              </el-button>
              <el-button
                type="text"
                size="small" @click="editer()">
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div></el-col>
      <!--<el-col :span="1"><div class="grid-content bg-purple"></div></el-col>-->
    </el-row>
    </el-main>
    </el-container>

</template>
<style scoped>

  .el-row {
    margin-bottom: 20px
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple {
    /*background: #d3dce6;*/
  }
  .bg-purple-light {
    /*background: #e5e9f2;*/
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    /*background-color: #f9fafc;*/
  }
</style>
<script>

  export default {
    methods: {
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      check () {
        this.$router.push({path:"/new-account"})
      },
      editer () {
        this.$router.push({path:"/new-account"})
      }
    },
    data () {
      return {
        tableData4:[],
        formInline: {
          user: '',
          region: ''
        },
        value7: '',
      }
    },
    mounted () {
      let _this=this
      this.$store.dispatch('getAccount', {}).then(function(data){
        console.log(data.data)
        _this.tableData4=data.data
      })
    }
  }
</script>
