<template>
  <div>
    表单
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
export default class PlayerDetail extends Vue {
    @Prop({ default: false })
    private isEdit!: boolean
}
</script>

<style scoped>

</style>
