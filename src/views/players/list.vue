<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.accountname"
        :placeholder="$t('player.accountname')"
        style="width: 370px;"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        icon="el-icon-search"
        type="primary"
        @click="handleFilter"
      >
        {{ $t('player.btnFilter') }}
      </el-button>
      <el-button
        icon="el-icon-plus"
        type="success"
        @click="createPage"
      >
        {{ $t('player.create') }}
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        label="ID"
        align="center"
      >
        <template v-slot="{row}">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column
        label="accountName"
        align="center"
      >
        <template v-slot="{row}">
          {{ row.accountname }}
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getPlayers } from '@/api/players'
import { Player } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

  @Component({
    name: 'playerList',
    components: {
      Pagination
    }
  })
export default class list extends Vue {
    list: Player[] = []
    listLoading = true

    // 分页
    total = 0
    listQuery = {
      page: 1,
      limit: 10
    }

    created() {
      this.getList()
    }

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }

    createPage() {
      this.$router.push('/players/create')
    }

    async getList() {
      this.listLoading = true
      const { data } = await getPlayers(this.listQuery)
      this.total = data.total
      this.list = data.players
      this.listLoading = false
    }
}
</script>

<style>

</style>
