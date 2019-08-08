<template>
  <div>
    <div class="charts" v-if="show">
      <div class="chart"  id="chart" style="width:100%;height:400px;">Chart Loading</div>
    </div>
    <div class="nodata value" v-else >{{$t('nodata')}}</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import api from "../common/api";

export default {
  data() {
    return {
      show: true,
      data: {},
      height: "",
      xdata: [],
      ydata: []
    };
  },
  props: ["currency"],
  computed: {},
  watch: {},
  created() {},
  watch: {
    $route: {
      handler() {
        this.getChart();
      }
    }
  },

  mounted() {
    this.getChart();
  },
  methods: {
    getChart() {
      const Chart = echarts.init(document.getElementById("chart"));
      Chart.setOption({
        //设置图表与容器的间隔
        grid: {
          left: "12%"
        },
        tooltip: {
          trigger: "axis",
          position: function(pt) {
            return [pt[0], "10%"];
          },
          backgroundColor: "rgba(255,255,255,.8)",
          borderColor: "51a4fc",
          textStyle: {
            color: "#00298d"
          }
        },
        title: {
          text: ""
        },
        xAxis: {
          name: this.$t("home.charts")[0],
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#7c7c7c"
            }
          },
          data: this.xdata,
          axisTick: {
            show: false //去掉刻度
          }
        },
        yAxis: {
          name: this.$t("home.charts")[1],
          axisLine: {
            lineStyle: {
              color: "#7c7c7c"
            },
            show: false //去掉轴线
          },
          axisTick: {
            show: false //去掉刻度
          }
        },
        series: [
          {
            name: this.$t("home.charts")[1],
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              normal: {
                color: "#50a3fc"
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#50a3fc"
                  },
                  {
                    offset: 1,
                    color: "#fff"
                  }
                ])
              }
            },
            data: this.ydata
          }
        ]
      });
      this.$axios
        .get(`${api.currencyChart}?currency=${this.currency}`)
        .then(data => {
          let arr = Object.keys(data.data)
          if (arr.length == 0) {
            this.show = false
            return
          }
          Chart.setOption({
            xAxis: {
              data: data.data.x
            },
            series: [
              {
                data: data.data.y
              }
            ]
          });
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style lang="less" scoped>
.charts {
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
}
.nodata {
    margin:30px 30px 0px 60px;
    font-size:15px;
    box-shadow:0 0 10px rgba(0, 0, 0, .05);
    text-align:center;
    line-height:250px;
}

.value {
    color: #0b0b0b;
}
</style>
