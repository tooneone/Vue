<template>

  <el-table :data="gridData" @row-click='getname' stripe>
    <el-table-column width="150" property="date" label="日期"></el-table-column>
    <el-table-column width="100" property="name" label="姓名"></el-table-column>
    <el-table-column width="300" property="address" label="地址"></el-table-column>
  </el-table>

</template>
<script>
export default {
  name: "user-list",
  data() {
    return {
      gridData: []
    };
  },
  mounted() {
    let _this = this;
    this.$store.dispatch("getTableData", {}).then(function(data) {
      // console.log("data", data.data);
      _this.gridData = data.data;
    });
  },
  methods: {
    getname(row, event, column) {
      this.$emit("newnodeEvent", row);
    }
  }
};
</script>
<style lang="scss" scoped>

</style>

