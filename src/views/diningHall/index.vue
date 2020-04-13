<template>
  <div>
    <nav-title :title="title" :path='path'></nav-title>
    <iframe name = "child" id = "child" :src="url"
      frameborder="0" scrolling="no"
    ></iframe>
  </div>
</template>

<script>
import md5 from 'js-md5'
import navTitle from '@/components/navTitle'
import { mapGetters } from 'vuex'
import * as Auth from '@/utils/auth'
import { config } from '@/utils/config.js'
export default {
  name: 'diningHall',
  components: {
    navTitle
  },
  data () {
    return {
      title: '智慧生活',
      path: 'main',
      empNo: '',
      url: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    /**
     * 用户刷新页面的情况下store丢失，从缓存读区userInfo
     */
    const userMessage = JSON.parse(Auth.getStorage('userInfo'))
    this.empNo = this.userInfo.user_code ? this.userInfo.user_code : userMessage.user_code
    const sign = md5(this.empNo + 'zyzhzjsgat2019key')
    this.url = `${config.zhshUrl}?empNo=${this.empNo}&sign=${sign}`
  }
}
</script>

<style lang="scss">
#child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 132px;
}
@supports (bottom: env(safe-area-inset-bottom)){
  #child {
    top: calc(88px + constant(safe-area-inset-top));
    top: calc(88px + env(safe-area-inset-top));
  }
}
</style>
