<template>
  <div class="leads-wrapper">
    <v-touch v-on:swipeleft="swipeleft" class="item">
      <img class="img" :src="img">
      <p class="line1">智能记账助手</p>
      <p class="line2">自动识别各类发票</p>
      <div class="mint-swipe-indicators">
        <div class="mint-swipe-indicator is-active"></div>
        <div class="mint-swipe-indicator"></div>
        <div class="mint-swipe-indicator"></div>
      </div>
      <div class="jump-lead" @click="jumpLead">跳过引导</div>
    </v-touch>
  </div>
</template>
<script>
import { getStorage } from '@/utils/auth.js'

export default {
  name: 'lead',
  data () {
    return {
      img: require('@/assets/images/lead1.png')
    }
  },
  created () {
    if (getStorage('hasLogin')) {
      this.jumpLead()
    } else {
      const time = setTimeout(() => {
        this.jumpLead()
      }, 10000)
      this.$once('hook:beforeDestroy', () => {
        clearTimeout(time)
      })
    }
  },
  methods: {
    swipeleft () {
      this.$router.push({ path: 'lead1' })
    },
    jumpLead () {
      if (getStorage('tokenid')) this.$router.push({ path: 'main' })
      else this.$router.push({ path: 'login' })
    }
  }
}
</script>
<style lang="scss">
  .leads-wrapper {
    .mint-swipe-indicators {
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 70px;
      top: 760px;
    }
    .mint-swipe-indicator {
      width: 14px;
      height: 14px;
    }
    .mint-swipe-indicator.is-active {
      width: 32px;
      height: 14px;
      border-radius: 14px;
      background: #0099FF;
      opacity: 1;
    }
    p {
      margin: 0;
    }
    .line2 {
      font: 400 26px PingFangSC;
      margin-top: 27px;
    }
    .item {
      width: 100vw;
      height: 100vh;
      background: #fff;
      text-align: center;
      .line1 {
        font: 500 38px PingFangSC;
        margin-top: 77px;
      }
      .img {
        width: 619px;
        height: 404px;
        margin-top: 343px;
      }
      .jump-lead {
        position: fixed;
        left: 50%;
        bottom: 117px;
        transform: translate(-50%, 0);
        color: #0099FF;
        font-size: 26px;
      }
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .leads-wrapper {
      .img {
        margin-top: calc(343px + constant(safe-area-inset-top));
        margin-top: calc(343px + env(safe-area-inset-top));
      }
      .jump-lead {
        bottom: calc(117px + constant(safe-area-inset-bottom));
        bottom: calc(117px + env(safe-area-inset-bottom));
      }
    }
  }
</style>
