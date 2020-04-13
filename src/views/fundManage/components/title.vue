<template>
<div class="nav-title-wrapper">
    <div class="nav-title">
        <a class="left" @click="goBack"><i class="iconfont icon-icon-angle-left "></i>返回</a>
        <div class="center">{{title}}</div>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-title-wrapper {
    width: 674px;
    height: 88px;
    position: fixed;
    left: 0;
    top: 0;
    padding: 44px 38px 0;
    z-index: 100;
    background: linear-gradient(to right, #58A3FC, #72B0F9);
    font: 400 38px PingFangSC;
    color: #fff;
    text-align: center;
    line-height: 88px;
    .nav-title {
        overflow: hidden;
        position: relative;
        width: 674px;
        height: 88px;
        a {
            text-decoration: none;
            color: #fff
        }
        .left {
            float: left;
        }
        .center {
            position: absolute;
            width: 100%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -45%);
            z-index: -1;
        }
        .right {
            float: right;
            font-size: 28px;
        }
        .icon-filter- {
            font-size: 50px;
        }
    }
}

@supports (bottom: env(safe-area-inset-bottom)) {
    .nav-title-wrapper {
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
    }
}
</style>
