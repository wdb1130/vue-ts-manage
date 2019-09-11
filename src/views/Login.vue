<template>
  <div class="login" id="login">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import ParticleLine from '@/libs/particle-line'
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Login extends Vue {
  private loginForm = {
    username: 'admin',
    password: '123456'
  }
  private rules = {
    username: { required: true, message: '用户名不能为空', trigger: 'blur' },
    password: { required: true, message: '密码不能为空', trigger: 'blur' }
  }
  created(): void {
    console.log('hfei')
    const line = new ParticleLine('main')
    line.init()
    console.log(line)
  }
}
</script>

<style lang='scss' scope>
  .login {
    .login-form {
      width: 600px;
      padding: 30px;
    }
  }
</style>

