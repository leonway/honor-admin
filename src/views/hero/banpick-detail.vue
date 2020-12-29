<template>
  <div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getBanpickDetail } from '@/api/heros'
import { BanPickDetailAndHero } from '@/api/types'

@Component({
  name: 'BanPickDetail'
})
export default class extends Vue {
  detail: BanPickDetailAndHero | null = null
  async created() {
    const res = await getBanpickDetail(this.$route.params.id)
    this.detail = res.data.detail
    console.log(this.detail)
  }
}
</script>

<style scoped>

</style>
