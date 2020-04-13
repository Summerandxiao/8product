<template>
  <div class="leads-wrapper">
    <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="item2">
      <img class="img" :src="img">
      <p class="line1">智能里程计算</p>
      <p class="line2">车票费用透明化</p>
      <div class="mint-swipe-indicators">
        <div class="mint-swipe-indicator"></div>
        <div class="mint-swipe-indicator"></div>
        <div class="mint-swipe-indicator is-active"></div>
      </div>
      <mt-button type="primary" class="to-login" @click="swiperleft">立即登录</mt-button>
    </v-touch>
  </div>
</template>
<script>
import { getStorage } from '@/utils/auth.js'

export default {
  name: 'lead',
  data () {
    return {
      img: require('@/assets/images/lead3.png')
    }
  },
  created () {
    const time = setTimeout(() => {
      this.swiperleft()
    }, 10000)
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(time)
    })
  },
  methods: {
    swiperleft () {
      if (getStorage('tokenid')) this.$router.push({ path: 'main' })
      else this.$router.push({ path: 'login' })
    },
    swiperright () {
      this.$router.push({ path: 'lead1' })
    }
  }
}
</script>
<style lang="scss">
  .leads-wrapper {
    .item2 {
      width: 100vw;
      height: 100vh;
      background: #fff;
      text-align: center;
      .line1 {
        font: 500 38px PingFangSC;
        margin-top: -30px;
      }
      .img {
        width: 619px;
        height: 496px;
        margin-top: 360px;
      }
      .to-login {
        width: 360px;
        height: 90px;
        background: linear-gradient(360deg,rgba(0,153,255,1) 0%,rgba(0,204,255,1) 100%);
        border-radius: 45px;
        margin-top: 100px;
        font-size: 36px;
      }
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .leads-wrapper {
      .img {
        margin-top: calc(360px + constant(safe-area-inset-top));
        margin-top: calc(360px + env(safe-area-inset-top));
      }
      .jump-lead {
        bottom: calc(117px + constant(safe-area-inset-bottom));
        bottom: calc(117px + env(safe-area-inset-bottom));
      }
    }
  }
</style>
