<template>
  <div class="show-picture-wrapper">
    <mt-popup v-model="popupVisible" class="show-picture" popup-transition="popup-fade" :modal="true" :closeOnClickModal="false">
      <i class="iconfont icon-icon-close close" @click="toClose()"></i>
      <div class="picture">
        <img :src="img" class="img" alt="">
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { config } from '@/utils/config.js'
export default {
  props: ['isShowPicture'],
  data () {
    return {
      popupVisible: false,
      imgList: '',
      id: '',
      img: '',
      imgId: ''
    }
  },
  watch: {
    isShowPicture () {
      this.popupVisible = this.isShowPicture
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.$store.dispatch('getInvoicePicture', this.id).then((res) => {
        this.imgId = res[0].id
        this.img = `${config.baseURL}/file/billFile/downloadNormalFile/${this.imgId}`
      })
    }
  },
  methods: {
    toClose () {
      this.popupVisible = false
      if (this.popupVisible === false) {
        this.$emit('hide')
      }
    }
  }
}
</script>
<style lang="scss">
.show-picture-wrapper{
  .show-picture {
    width:100%;
    height:100%;
    background: #474849;
    .picture {
      width:100%;
      height:80%;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      text-align: center;
      overflow-y: scroll;
    }
    .img {
      text-align: center;
      width:100%;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
    }
    .iconfont {
      font-size: 50px;
      color: #fff;
    }
    .close {
      float: right;
      margin: 44px 20px 0 0;
    }
    @supports (bottom: env(safe-area-inset-bottom)){
      .close {
        margin-top: calc(20px + constant(safe-area-inset-top));
        margin-top: calc(20px + env(safe-area-inset-top));
      }
    }
  }
}
</style>
