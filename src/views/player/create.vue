<template>
  <div>
    <!-- 创建一个player-detail 组件 更新时可复用 -->
    <player-detail :is-edit='false'></player-detail>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import PlayerDetail from './components/PlayerDetail'

@Component({
  components: {
    PlayerDetail
  }
})
export default class Create extends Vue {

}
</script>

<style lang="scss" scoped>

</style>
