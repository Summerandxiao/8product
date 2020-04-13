<template>
  <div class="choose-bill-type-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <!--路由的同时传递结算方式-->
    <router-link
      v-for="item in reimburseTmpInfo.setType"
      :key="item.key"
      :to="{ name: 'billInfo', query: { type: item.settlementTypeCode, name: item.settlementTypeName } }"
      class="item-wrapper">
      <div v-if="item.isUsed=='Y'" class="item flex line-1px">
        <div>{{item.settlementTypeName}}</div>
        <i class="iconfont icon-icon-angle-right"></i>
      </div>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import navTitle from '@/components/navTitle'

export default {
  name: 'ChooseBillType',
  components: {
    navTitle
  },
  data () {
    return {
      billMoney: 0,
      title: '选择结算方式',
      path: 'reimburseDetail'
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo'])
  }
}
</script>
<style lang="scss">
  .choose-bill-type-wrapper {
    width: 686px;
    padding: 0 32px;
    background: #fff;
    padding-top: 132px;
    margin-bottom: 30px;
    font-size: 32px;
    .item-wrapper {
      color: #333;
    }
    .item {
      height: 100px;
    }
    .line-1px:before {
      border: none;
      border-bottom: 1px solid #eee;
    }
    .iconfont {
      font-size: 24px;
      color: #ccc;
      margin-left: 10px;
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .choose-bill-type-wrapper {
      padding-top: calc(88px + constant(safe-area-inset-top));
      padding-top: calc(88px + env(safe-area-inset-top));
    }
  }
</style>
