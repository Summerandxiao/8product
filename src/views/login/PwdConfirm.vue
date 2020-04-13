<template>
  <div class="pwd-confirm-form">
    <div class="title">确认密码</div>
    <m-input :label="labelPwd" :type="type" :value="password" @input="inputWords"></m-input>
    <m-input :label="labelPwdConfirm" :type="type" :value="passwordConfirm" @input="inputWords"></m-input>
    <mt-button type="primary"  @click="sure">确定</mt-button>
  </div>
</template>

<script>
import mInput from '@/components/m-input'

export default {
  name: 'PwdConfirm',
  components: {
    mInput
  },
  data () {
    return {
      labelPwd: '新密码',
      labelPwdConfirm: '确认密码',
      type: 'password',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    sure () {
      if (!this.password.trim()) {
        this.$message('提示', '密码不能为空')
        return
      }
      if (!this.passwordConfirm.trim()) {
        this.$message('提示', '确认密码不能为空')
        return
      }
      if (this.password !== this.passwordConfirm) {
        this.$message('提示', '密码与确认密码不一致，请您确认')
        return
      }
      this.$store.dispatch('pwdConfirm', this.password).then(() => {
        this.$router.push({ path: 'main' })
      })
    },
    inputWords (obj) {
      if (obj.label === '新密码') {
        this.password = obj.value
      } else {
        this.passwordConfirm = obj.value
      }
    }
  }
}
</script>

<style lang="scss">
  .pwd-confirm-form {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    font-family: PingFangSC-Medium;
    padding: 0 86px;
    text-align: left;
    .title {
      color: #424242;
      font-size: 60px;
      font-weight: 500;
      margin: 224px 0 0 0;
    }
    .mintui-field-error:before {
      font-size: 32px;
    }
    .mint-button {
      width: 574px;
      height: 100px;
      background: linear-gradient(to right, #00A1FF, #208EFE);
      border-radius: 100px;
      color: #fff;
      display: flex;
      justify-content: center;
      text-align: center;
      font-size: 40px;
      font-weight: 500;
      margin-top: 60px;
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .pwd-confirm-form {
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
    }
  }
</style>
