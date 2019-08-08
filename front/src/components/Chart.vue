<template>
  <div class="charts">
    <div class="chart" id="chart" style="width:100%;height:400px;">Chart Loading</div>
  </div>
</template>

<script>
import dayjs from "dayjs"
import echarts from "echarts/lib/echarts"
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import api from '../common/api'

export default {
  data(){
    return {
      data:{},
      height:'',
      xdata:[],
      ydata:[]
    }
  },
  computed: {

  },
  watch:{

  },
  created(){

  },
  mounted(){
    const Chart = echarts.init(document.getElementById('chart'))
    Chart.setOption({
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
              return [pt[0], '10%'];
          },
          backgroundColor:'rgba(255,255,255,.8)',
          borderColor:'51a4fc',
          textStyle:{
            color:'#00298d',
          }
        },
        title: {
            text: ''
        },
        xAxis: {
            name: this.$t('home.charts')[0],
            type: 'category',
            boundaryGap: false,
            axisLine:{
              lineStyle:{
                color:'#7c7c7c',
              }
            },
            data: this.xdata,
            axisTick:{
              show:false//去掉刻度
            }
        },
        yAxis: {
          name:this.$t('home.charts')[1],
          axisLine:{
              lineStyle:{
                color:'#7c7c7c',
              },
              show:false//去掉轴线
            },
            axisTick:{
              show:false//去掉刻度
            }
        },
        series: [{
            name: this.$t('home.charts')[1],
            type: 'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                normal: {
                    color: '#50a3fc'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#50a3fc'
                    }, {
                        offset: 1,
                        color: '#fff'
                    }])
                }
            },
            data: this.ydata
        }]
    });
    this.$axios.get(`${api.txCharts}?days=30`)
      .then(data=>{
        Chart.setOption({
          xAxis: {
            data:data.data.x.map(d => dayjs(d).format('MM-DD'))
          },
          series: [{
            data:data.data.y
          }]
        })
      })
      .catch(e=>console.log(e))


  },
  methods:{
    getCharts(){
      this.$axios({
        url:api.txCharts,
        data:{
          days:30,
        }
      })
      .then(data=>{
        if(data.data.result=="success"){
          this.height = data.data.ledger.ledger_index
        }
        Chart.setOption({
          xAxis: {
            data:xdata
          },
          series: [{
            data:ydata
          }]
        })
      })
      .catch(e=>console.log(e))

    }
  }
}
</script>

<style lang="less" scoped>
  .charts {
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
  }
</style>
