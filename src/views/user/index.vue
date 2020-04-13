<template>
  <div class="user-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <div class="user-wrapper-top flex">
      <div class="portrait flex">{{userName}}</div>
      <div class="name">{{userMessage.userName}}</div>
    </div>
    <ul class="user-massage">
      <li v-for="item in userlabel" :key="item.label" class="flex">
        <div><i :class="item.icon"></i>{{item.value}}</div>
        <span>{{userMessage[item.label]}}</span>
      </li>
      <li class="flex">
        <div><i class="iconfont icon-xiugaimima"></i>修改密码</div>
        <span class="iconfont icon-icon-angle-right"></span>
      </li>
      <li class="flex" @click="toChangeRole()">
        <div><i class="iconfont icon-qiehuan"></i>全局设置</div>
        <span class="iconfont icon-icon-angle-right"></span>
      </li>
      <li class="flex" @click="clearStorage">清理缓存</li>
    </ul>
    <mt-button class="logout" v-if="show" type="primary"  @click="loginOut">退出登录</mt-button>
    <ChangeRole :type="type" :isShow="isShow" @hideScan="hideScan"></ChangeRole>
  </div>
</template>

<script>
import * as Auth from '@/utils/auth'
import navTitle from '@/components/navTitle'
import * as dd from 'dingtalk-jsapi'
import { Toast } from 'mint-ui'
import ChangeRole from './components/ChangeRole'
import { userlabel } from '@/utils/global.js'
export default {
  name: 'user',
  components: {
    navTitle,
    ChangeRole
  },
  data () {
    return {
      type: '',
      title: '',
      userName: '',
      userNameTxt: '',
      userMessage: '',
      path: 'main',
      show: false,
      isShow: false, // 切换角色组件
      userlabel: []
    }
  },
  created () {
    this.userlabel = userlabel
    if (dd.env.platform === 'notInDingTalk') this.show = true
    this.userMessage = JSON.parse(Auth.getStorage('userInfo'))
    this.userNameTxt = this.userMessage.userName
    this.userName = this.userNameTxt.length > 2 ? this.userNameTxt.substring(this.userNameTxt.length - 2) : this.userNameTxt
  },
  methods: {
    loginOut () {
      this.$store.dispatch('loginOut').then(() => {
        this.$router.push({ path: 'login' })
      })
    },
    clearStorage () {
      Auth.removeStorage()
      Toast({ message: '缓存清理完成', iconClass: 'iconfont icon-duigou', duration: 1000 })
    },
    toChangeRole (data) {
      this.isShow = true
    },
    hideScan () {
      this.isShow = false
      this.$store.dispatch('cwGetUserInfo').then(res => {
        this.userMessage = JSON.parse(Auth.getStorage('userInfo'))
        this.$store.dispatch('getMenuListByRole', this.userMessage.roleId)
      })
    }
  }
}
</script>

<style lang="scss">
  .mint-toast {
    .icon-duigou {
      font-size: 80px;
    }
    &-text {
      font-size: 32px;
    }
  }
  .user-wrapper {
    .user-wrapper-top {
      width: 686px;
      background: #54A1FD;
      padding: 172px 32px 40px;
      color: #fff;
      justify-content: flex-start;
      font-size:38px;
      font-weight:400;
      .portrait {
        width: 160px;
        height: 160px;
        background: #A0D9F6;
        border-radius: 100%;
        margin-right: 40px;
        justify-content: center;
      }
    }
    @supports (bottom: env(safe-area-inset-bottom)){
      .user-wrapper-top {
        padding-top: calc(128px + constant(safe-area-inset-top));
        padding-top: calc(128px + env(safe-area-inset-top));
      }
    }
    .user-massage {
      padding: 0 20px;
      margin-top: 30px;
      background: #fff;
      font-size:32px;
      font-weight:400;
      color: #333;
      li {
        height: 100px;
        align-items: center;
        .iconfont {
          font-size: 34px;
          color: #3596FA;
          margin-right: 24px;
        }
        &:not(:last-child) {
          border-bottom: 1px solid #eee;
        }
      }
    }
    .logout {
      width: 574px;
      height: 100px;
      margin: 100px auto;
      background: linear-gradient(to right, #00A1FF, #208EFE);
      border-radius: 100px;
      color: #fff;
      display: flex;
      justify-content: center;
      text-align: center;
      font-size: 40px;
      font-weight: 500;
    }
  }
</style>
