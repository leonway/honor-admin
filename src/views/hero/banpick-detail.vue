<template>
  <div class="chart-container">
    <!-- 周期选择 -->
    <div class="range">
    <el-radio-group v-model="range">
    <el-radio-button label="week">周</el-radio-button>
    <el-radio-button label="month">⽉</el-radio-button>
    <el-radio-button label="quarter">季度</el-radio-button>
    <el-radio-button label="year">年</el-radio-button>
    </el-radio-group>
    </div>
    <line-chart v-if="detail" height="100%" :chart-data="this.chartData" />
    <p v-else>没有任何数据...</p>
 </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getBanpickDetail } from '@/api/heros'
import { BanPickDetailAndHero, RangeType, RangeData } from '@/api/types'

// 引⼊图表
import LineChart from './components/LineChart.vue'
// import { getDateArray } from '@/utils/gen-month-date'
// RangeData：时间区间数据
const rangeData: RangeData = {
  week: ['周⼀', '周⼆', '周三', '周四', '周五', '周六', '周⽇'],
  month: new Array(31).fill(1).map((v, i) => (i + 1) + ''),
  quarter: ['⼀季度', '⼆季度', '三季度', '四季度'],
  year: new Array(12).fill(1).map((v, i) => (i + 1) + '⽉')
}
@Component({
  name: 'BanPickDetail',
  components: {
    LineChart
  }
})
export default class extends Vue {
  detail: BanPickDetailAndHero | null = null
  // 默认时间区间是周
  range: RangeType = 'week';
  async created() {
    const res = await getBanpickDetail(this.$route.params.id)
    // if (res) {
    //   ax()
    // }
    this.detail = res.data.detail
    console.log(this.detail)
  }

  // 计算属性：根据detail和range获取显示数据内容
  get chartData() {
    // 数据不存在时
    if (!this.detail) {
      return { heroName: '', xAxisData: [], banData: [], pickData: [] }
    }
    // 数据存在或发⽣变化时
    const xAxisData = rangeData[this.range]
    const banData = this.detail[this.range].ban
    const pickData = this.detail[this.range].pick
    const data = {
      heroName: this.detail.hero.name,
      xAxisData,
      banData,
      pickData
    }
    return data
  }
}
</script>

<style scoped>
.range {
 padding: 20px;
 position: absolute;
 z-index: 10;
 left: -138px;
 width: 275px;
 margin: 0 50%; }
.chart-container {
 position: relative;
 width: 100%;
 height: calc(100vh - 84px);
}
</style>
