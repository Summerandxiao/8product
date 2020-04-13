<template>
  <div class="login-form">
    <div v-if="show">
      <div class="title">钉钉用户绑定</div>
      <m-input :label="labelUser" :value="userInfo.userCode" @input="input"></m-input>
      <m-input :label="labelPwd" :type="type" :value="userInfo.password" @input="input"></m-input>
      <div class="tip">用户名密码与PC端警保平台通用</div>
      <mt-button type="primary"  @click="login">登录</mt-button>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import mInput from '@/components/m-input'
import { Indicator } from 'mint-ui'
import md5 from 'js-md5'
export default {
  name: 'ddLogin',
  components: {
    mInput
  },
  data () {
    return {
      labelUser: '用户名',
      labelPwd: '密码',
      type: 'password',
      popText: '',
      show: false,
      userInfo: {
        ddToken: '',
        userCode: '',
        password: ''
        // datetimepickerValue: ''
      }
    }
  },
  created () {
    Indicator.open()
    /**
     * 钉钉小程序登录绑定
     */
    // eslint-disable-next-line
    mtl.getAuthCode({
      success: res => {
        this.authCode = res.authCode // 返回识别结果，同上
        this.$store.dispatch('getIfBind', this.authCode).then((res) => {
          Indicator.close()
          if (res.isBind === 'Y') {
            this.$router.push({ path: 'main' })
          } else {
            this.show = true
            this.userInfo.ddToken = res.ddToken
          }
        })
      }
    })
  },
  methods: {
    login () {
      if (!this.userInfo.ddToken) {
        this.$message('提示', '未获取到ddToken')
        return
      }
      for (let key in this.userInfo) {
        // 暂时不传datetimepickerValue时间戳
        if (!this.userInfo[key].trim()) {
          this.popText = key === 'userCode' ? '用户名不能为空' : '密码不能为空'
          this.$message('提示', this.popText)
          return
        }
      }
      this.$store.dispatch('ddLogin', this.userInfo).then(() => {
        this.$router.push({ path: 'main' })
      })
    },
    input (obj) {
      if (obj.label === '用户名') {
        this.userInfo.userCode = obj.value
      } else {
        this.userInfo.password = md5(obj.value)
      }
    }
  }
}
</script>

<style lang="scss">
  .mint-msgbox {
    &-title, &-content, &-confirm {
      font-size: 32px;
    }
    &-content {
      padding: 40px 0;
    }
    &-btns {
      padding: 20px 0;
    }
  }
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
    .tip {
      font-size: 22px;
      color: #bbb;
      margin-top: 30px;
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
</style>
