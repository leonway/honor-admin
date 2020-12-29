<template>
  <div :class='classname' :style="{height: height,width: width}">

  </div>
</template>

<script lang="ts">
import echarts, { EChartOption } from 'echarts'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ResizeMixin from '@/components/Charts/mixins/resize'

// 修改数据接口
export interface ILineChartData {
  heroName:string
  xAxisData:string[]
  banData:number[]
  pickData:number[]
}

  @Component({
    name: 'LineChart'
  })
export default class extends mixins(ResizeMixin) {
  @Prop({ required: true })
  private chartData!:ILineChartData

  @Prop({ default: 'chart' })
  private className!:string

  @Prop({ default: '100%' })
  private width!:string

  @Prop({ default: '350px' })
  private height!:string

  @Watch('chartData', { deep: true })
  private onChartDataChange(value:ILineChartData) {
    this.setOptions(value)
  }

  mounted() {
    this.$$nextTick(() => {
      this.initChart()
    })
  }

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }

  private initChart() {
    this.chart = echarts.init(this.$el as HTMLDivElement, 'macarons')
    this.setOptions(this.chartData)
  }

  private setOptions(chartData:ILineChartData) {
    if (this.chart) {
      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: this.chartData.heroName + '近期办选走势',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          formatter: ([f1, f2]:EChartOption.Tooltip.Format[]) => {
            const v1 = f1.data * 100 + '%'
            const v2 = f2.data * 100 + '%'
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
