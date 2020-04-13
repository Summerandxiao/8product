<template>
  <div class="login-form">
    <div class="title">登录</div>
    <m-input :label="labelUser" :value="userInfo.userCode" @input="inputWords"></m-input>
    <m-input :label="labelPwd" :type="type" :value="userInfo.password" @input="inputWords"></m-input>
    <mt-button type="primary"  @click="login">登录</mt-button>
  </div>
</template>

<script>
import mInput from '@/components/m-input'
import { setStorage, getStorage } from '@/utils/auth.js'
import * as dd from 'dingtalk-jsapi' // 此方式为整体加载，也可按需进行加载

export default {
  name: 'login',
  components: {
    mInput
  },
  data () {
    return {
      labelUser: '用户名',
      labelPwd: '密码',
      type: 'password',
      userId: '',
      userInfo: {
        userCode: '',
        password: ''
      }
    }
  },
  created () {
    setStorage('hasLogin', true)
    if (dd.env.platform !== 'notInDingTalk') {
      this.$router.push({ path: 'ddLogin' })
    } else {
      if (getStorage('tokenid')) {
        this.$router.push({ path: 'main' })
      }
    }
  },
  methods: {
    login () {
      if (!this.userInfo['userCode'].trim()) {
        this.$message('提示', '用户名不能为空')
        return
      } else if (!this.userInfo['password'].trim()) {
        this.$message('提示', '密码不能为空')
        return
      }
      this.$store.dispatch('login', this.userInfo).then((res) => {
        if (res.data.result === 'AR01') { // 首次登录，需要设置密码进行后台注册
          this.$router.push({ path: 'pwdConfirm' })
        } else if (res.data.result === '1') { // 已登录过
          this.$router.push({ path: 'main' })
        }
      })
    },
    inputWords (obj) {
      if (obj.label === '用户名') {
        this.userInfo.userCode = obj.value
      } else {
        this.userInfo.password = obj.value
      }
    }
  }
}
</script>

<style lang="scss">
  .login-form {
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
    .login-form {
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
    }
  }
</style>
