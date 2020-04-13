<template>
  <div class="nav-title-wrapper">
    <div class="nav-title">
      <router-link v-if="path" class="left" :to="{ name: path, query: query }"><i class="iconfont icon-icon-angle-left "></i>返回</router-link >
      <router-link  v-if="toUser" class="left" to="user">
        <i class="iconfont icon-icon-person"></i>
      </router-link >
      <div class="center">{{title}}</div>
      <div v-if="save" class="right" @click="saveInvoice">保存</div>
      <router-link v-if="add" :to="{ name: 'addTag', query: { path: path } }" class="right iconfont icon-icon-plus"></router-link>
      <div v-if="ifScreen" class="right iconfont icon-filter-" @click="screen"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'navTitle',
  props: {
    title: {
      type: String,
      default: ''
    }, // 标题
    path: {
      type: String,
      default: ''
    }, // 返回跳转路径
    save: {
      type: Boolean,
      default: false
    }, // 发票详情页面保存按钮
    toUser: {
      type: Boolean,
      default: false
    }, // 发票详情页面保存按钮
    add: {
      type: Boolean,
      default: false
    }, // 添加图标
    ifScreen: {
      type: Boolean,
      default: false
    }, // 是否筛选
    query: {
      type: Object,
      default: () => {}
    } // 是否需要传参
  },
  data () {
    return {}
  },
  methods: {
    saveInvoice () {
      this.$emit('saveInvoice')
    },
    screen () {
      this.$emit('changeScreenAble')
    }
  }
}
</script>
<style lang="scss">
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
      font-size: 28px;
      .iconfont {
        font-size: 28px;
      }
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
@supports (bottom: env(safe-area-inset-bottom)){
  .nav-title-wrapper {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
}
</style>
