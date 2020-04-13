<template>
  <div class="leads-wrapper">
    <v-touch v-on:swipeleft="swipeleft" v-on:swiperight="swiperight" class="item1">
      <img class="img" :src="img">
      <p class="line1">导出数据</p>
      <p class="line2">一键导出专业的报销单</p>
      <div class="mint-swipe-indicators">
        <div class="mint-swipe-indicator"></div>
        <div class="mint-swipe-indicator is-active"></div>
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
      img: require('@/assets/images/lead2.png')
    }
  },
  created () {
    const time = setTimeout(() => {
      this.jumpLead()
    }, 10000)
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(time)
    })
  },
  methods: {
    swipeleft () {
      this.$router.push({ path: 'lead2' })
    },
    swiperight () {
      this.$router.push({ path: 'lead' })
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
    .item1 {
      width: 100vw;
      height: 100vh;
      background: #fff;
      text-align: center;
      .line1 {
        font: 500 38px PingFangSC;
        margin-top: 30px;
      }
      .img {
        width: 619px;
        height: 378px;
        margin-top: 414px;
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
        margin-top: calc(414px + constant(safe-area-inset-top));
        margin-top: calc(414px + env(safe-area-inset-top));
      }
      .jump-lead {
        bottom: calc(117px + constant(safe-area-inset-bottom));
        bottom: calc(117px + env(safe-area-inset-bottom));
      }
    }
  }
</style>
