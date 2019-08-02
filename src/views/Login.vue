<template>
  <div class="login">
    <el-header></el-header>
    <el-main id="main">
      <el-form></el-form>
    </el-main>
  </div>
</template>

<script lang="ts">
import ParticleLine from '@/libs/particle-line'
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Login extends Vue {
  private create(): void {
    const line = new ParticleLine('main', {})
    line.init()
  }
}
</script>

<style lang='scss' scope>

</style>

