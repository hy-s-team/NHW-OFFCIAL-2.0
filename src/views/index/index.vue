<template>
  <div class="view">
    <!-- <button @click="changePlan()">切换数据</button> -->
    <three-scene :msg="info"></three-scene>
  </div>
</template>
<script>
import ThreeScene from "../../components/three-scene";

export default {
  components: {
    ThreeScene,
  },
  data() {
    return {
      info: [
        {
          form_id: 12,
          form_json:
            '[{"id":1.0,"name":"逆变器GSE0100T","num":2,"remake":"","select":true},{"id":2.0,"name":"电池模组 1C","num":6,"remake":"","select":true},{"id":3.0,"name":"支架","num":1,"remake":"","select":true},{"id":4.0,"name":"高压盒","num":1,"remake":"","select":true},{"id":5.0,"name":"汇流柜","num":1,"remake":"","select":true},{"id":6.0,"name":"BMS操作系统","num":1,"remake":"","select":true},{"id":7.0,"name":"10尺集装箱","num":1,"remake":"","select":false},{"id":7.1,"name":"空调系统","pid":7.0,"remake":""},{"id":7.2,"name":"消费系统","pid":7.0,"remake":""},{"id":8.0,"name":"运输费用","remake":"","select":false},{"id":9.0,"name":"测试安装","remake":"","select":false}]',
          programme_id: null,
          demand_capacity: "55.29599999999999",
          actual_capacity: "50",
          errmsg: null,
          chose: false,
        },
      ],

      dataInfo: [
        {
          form_id: 12,
          form_json:
            '[{"id":1.0,"name":"逆变器GSE0100T","num":2,"remake":"","select":true},{"id":2.0,"name":"电池模组 1C","num":6,"remake":"","select":true},{"id":3.0,"name":"支架","num":1,"remake":"","select":true},{"id":4.0,"name":"高压盒","num":1,"remake":"","select":true},{"id":5.0,"name":"汇流柜","num":1,"remake":"","select":true},{"id":6.0,"name":"BMS操作系统","num":1,"remake":"","select":true},{"id":7.0,"name":"10尺集装箱","num":1,"remake":"","select":false},{"id":7.1,"name":"空调系统","pid":7.0,"remake":""},{"id":7.2,"name":"消费系统","pid":7.0,"remake":""},{"id":8.0,"name":"运输费用","remake":"","select":false},{"id":9.0,"name":"测试安装","remake":"","select":false}]',
          programme_id: null,
          demand_capacity: "55.29599999999999",
          actual_capacity: "50",
          errmsg: null,
          chose: false,
        },
        {
          form_id: 13,
          form_json:
            '[{"id":1.0,"name":"逆变器GSE0100T","num":2,"remake":"","select":true},{"id":2.0,"name":"电池模组 1C","num":5,"remake":"","select":true},{"id":3.0,"name":"支架","num":1,"remake":"","select":true},{"id":4.0,"name":"高压盒","num":1,"remake":"","select":true},{"id":5.0,"name":"汇流柜","num":1,"remake":"","select":true},{"id":6.0,"name":"BMS操作系统","num":1,"remake":"","select":true},{"id":7.0,"name":"10尺集装箱","num":1,"remake":"","select":false},{"id":7.1,"name":"空调系统","pid":7.0,"remake":""},{"id":7.2,"name":"消费系统","pid":7.0,"remake":""},{"id":8.0,"name":"运输费用","remake":"","select":false},{"id":9.0,"name":"测试安装","remake":"","select":false}]',
          programme_id: null,
          demand_capacity: "46.08",
          actual_capacity: "50",
          errmsg: "逆变器电压下限超出范围,超出:64.00",
          chose: false,
        },
      ],

      isOne: true,
    };
  },
  methods: {
    changePlan() {
      this.info = this.dataInfo[this.isOne ? 0 : 1];
      this.isOne = !this.isOne;
      console.log(this.info, "每次的内容---");
    },
  },
  watch: {
    info: {
      handler(newVal, oldVal) {
        if (newVal) {
          console.log(newVal, "新的数据");
        } else {
          console.log(oldVal, "旧的数据");
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.view {
  width: 100vw;
  height: 100vh;
}
</style>
