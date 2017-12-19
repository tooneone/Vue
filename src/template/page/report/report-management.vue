<template>
  <el-container class="bc-continer">
    <el-header class="bc-Breadcrumb">
      <bcMainHeader></bcMainHeader>
    </el-header>
    <el-main>
      <el-popover ref="userlist" placement="bottom" trigger="hover">
        <userlist @newnodeEvent='setname'></userlist>
      </el-popover>
      <el-form ref="form" :model='form'>
        <el-row type='flex' justify='space-between' flex-wrap>
          <el-col :md='3' :sm='8' :xs="24">
            <el-input v-model="input_name" placeholder="请输入用户名查询 " v-popover:userlist @click.native="inputClick"></el-input>
            <!--  -->
          </el-col>
          <el-col :md="4" :sm='8' :xs="24">
            <el-select v-model="value" placeholder="请选择所属广告计划">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :md='4' :sm='24' :xs="24">
            <el-select v-model="values" placeholder="请选择所属维度">
              <el-option v-for="items in dimension" :key="items.value" :label="items.label" :value="items.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :md='8' :sm='16' :xs="16">
            <el-tag type='success'>请选择时间段:</el-tag>
            <el-date-picker v-model="value4" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
            </el-date-picker>
          </el-col>
        </el-row>
      </el-form>
      <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">
      </div>
    </el-main>
  </el-container>
</template>
<script>
import echarts from "echarts";
import userlist from "../assembly/user-list.vue";
import { utils } from "../../../config/mUtils";

export default {
  components: { userlist },
  props: {
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "mychart"
    },
    width: {
      type: String
      // default: "800px"
    },
    height: {
      type: String,
      default: "500px"
    }
  },
  data() {
    return {
      input_name: "",
      value: "",
      values: "",
      chart: null,
      options: [],
      dimension: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value4: ""
    };
  },
  mounted() {
    this.initChart();

    let _this = this;
    this.$store.dispatch("getadoptions", {}).then(function(data) {
      console.log("data", data.data);
      _this.options = data.data;
    });
    this.$store.dispatch("getaddimension", {}).then(function(data) {
      _this.dimension = data.data;
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
        title: {
          text: "投放统计报表",
          x: "left",
          align: "right"
        },
        color: ["#ffca28", "#48c569", "#42a5f5", "#ff7143"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["竞价成功数", "展示数", "点击数", "花费"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        // grid: {
        //   left: "3%",
        //   right: "4%",
        //   bottom: "3%",
        //   containLabel: true
        // },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            // axisTick: {
            //   alignWithLabel: true
            // }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "竞价成功数",
            type: "line",
            barWidth: "10%",
            data: [10, 56, 220, 354, 340, 350, 290]
          },
          {
            name: "展示数",
            type: "line",
            barWidth: "10%",
            data: [15, 52, 210, 334, 350, 330, 230]
          },
          {
            name: "点击数",
            type: "line",
            barWidth: "10%",
            data: [20, 57, 230, 304, 360, 380, 240]
          },
          {
            name: "花费",
            type: "line",
            barWidth: "10%",
            data: [25, 60, 250, 314, 390, 380, 250]
          }
        ]
      });
    },
    setname(data) {
      // console.log(data);
      this.input_name = data.name;
      this.isshow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-row--flex {
  flex-wrap: wrap;
}
#mychart {
  margin: 20px auto;
}
</style>
