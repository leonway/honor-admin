<template>
  <div class='app-container'>
    <!-- 过滤条件 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.accountname"
        :placeholder="$t('player.accountname')"
        style="width: 200px"
        @keyup.enter.native="handleFilter"
      >
      </el-input>
      <el-button type='primary' icon='el-icon-search' @click='handleFilter' style="margin-left: 20px">
        {{$t('player.buttonFilter')}}
      </el-button>
      <!-- 新增按钮 -->
      <el-button type="success" icon='el-icon-edit' @click='handleCreate' style="margin-left: 20px">
        {{$t('player.buttonCreate')}}
      </el-button>
    </div>
    <!-- 列表 -->
    <el-table
      v-loading='listLoading'
      :data="list"
      border
      fit
      hightlight-current-row
      style='width:100%'
    >
      <el-table-column
        label='ID'
        align='center'
        width="80"
      >
        <template v-slot='{row}'>
          {{row.id}}
        </template>
      </el-table-column>
      <el-table-column
        label='账户名'
        align='center'
      >
        <template v-slot='{row}'>
          {{row.accountname}}
        </template>
      </el-table-column>
      <el-table-column
        label='头像'
        align='center'
      >
        <template v-slot='{row}'>
          <img :src="row.avatar" alt="" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column
        label='擅长英雄'
        align='center'
      >
        <template v-slot='{row}'>
          <span v-for="(item,index) in row.wanttoplay" :key="index+'wantToPlay'">
            {{item.name}}
            {{index!==2&&','||''}}
          </span>
        </template>
      </el-table-column>
       <el-table-column
        label='操作'
        align='center'
      >
        <template v-slot='scope'>
          <router-link :to="'/players/edit/'+scope.row.id">
             <el-button type="primary" icon="el-icon-edit">
               更新
             </el-button>
           </router-link>
             <el-button @click="handleDelete(scope)" type="danger" icon="el-icon-delete">
               删除
             </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    >
    </pagination>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import { getPlayers, deletePlayer } from '@/api/players'
import { Player } from '../../api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'PlayerList',
  components: {
    Pagination
  }
})
export default class list extends Vue {
  // 玩家列表数据
  list: Player[] = []

  // 加载状态
  listLoading = true

  // 总条目数
  total = 0

  // 查询条件
  listQuery = {
    page: 1, // 默认是第一页
    limit: 10, // 每一页的条数
    accountname: undefined // 按照账户名搜索
  }

  created() {
    // 获取列表数据
    this.getList()
  }

  // 获取列表
  async getList() {
    this.listLoading = true
    const { data } = await getPlayers(this.listQuery)
    console.log(data)
    // 设置列表数据
    this.list = data.players
    this.total = data.total
    this.listLoading = false
  }

  // 过滤(搜索)的处理
  handleFilter() {
    // 重置页码
    this.listQuery.page = 1
    this.getList()
  }

  // 新增玩家
  handleCreate() {
    this.$router.push('/players/create')
  }

  // 删除玩家
  handleDelete(scope:any) {
    const { $index, row } = scope
    this.$confirm('确定删除玩家信息？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      await deletePlayer(row.id)
      this.list.splice($index, 1)
      this.$message({
        type: 'success',
        message: '删除成功！'
      })
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<style scoped>

</style>
