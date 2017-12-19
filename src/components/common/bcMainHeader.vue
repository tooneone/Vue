<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }"><i class="iconfont icon-homepage_fill"></i>首页</el-breadcrumb-item>
      <el-breadcrumb-item  v-if="$route.meta.currentMenu && !$route.meta.currentMenu.type"  >{{currentName}}</el-breadcrumb-item>
      <el-breadcrumb-item  v-for="item in allBreadArr"  :to="{ path: item.path }" v-if="$route.meta.currentMenu && $route.meta.currentMenu.type && (isparent(item) ||  item.path === $route.meta.currentMenu.path)" :key="item.path"><i class="iconfont" :class="item.icon" v-if="isparent(item)"></i>{{item.menuName}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
  export default {
    name: "bcMainHeader",
    data () {
      return {
        currentName: this.$route.meta.pageName,
        allBreadArr: []
      }
    },
    mounted () {
      console.log(this.$route)
      this.getAllBread(this.$store.getters.menuItem)
    },
    methods: {
      getAllBread (currentArr) {
        let _this = this
        currentArr.forEach(function(item){
            _this.allBreadArr.push(item)
            if(item.operarte && item.operarte.length > 0)_this.getAllBread(item.operarte)
        })
        return this.allBreadArr
      },
      isparent (item) {
        let _this = this
        if(item.operarte && item.operarte.length > 0) {
          for(let j = 0; j < item.operarte.length; j++){
             let current = item.operarte[j]
             if( current.path === _this.$route.meta.currentMenu.path) return true
             else if(_this.isparent(current)) return true
             else if(j === item.operarte.length-1) return false
          }
        }
        else  return false
      }
    }
  }
</script>

<style scoped lang="scss">
  .iconfont{
    font-size: 14px;
  }
</style>