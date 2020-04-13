<template>
  <div class="feeList-wrapper">
    <nav-title path="reimburseDetail" :title="title"></nav-title>
    <component :is="currentView" :pageData="pageData"></component>
  </div>
</template>
<script>
import travel from './components/Travel'
import otherFee from './components/OtherFee'
import navTitle from '@/components/navTitle'

export default {
  name: 'feeList',
  components: {
    travel,
    otherFee,
    navTitle
  },
  data () {
    return {
      currentView: '',
      title: '',
      pageData: {}
    }
  },
  created () {
    this.currentView = this.$route.query.expenseType === 'TRAVEL' ? 'travel' : 'otherFee'
    this.pageData = JSON.parse(this.$route.query.item)
    this.title = this.pageData.expenseTypeName
  }
}
</script>
<style lang="scss">
  .feeList-wrapper {
    font-family: PingFangSC;
    margin-top: 154px;
    .add-bill-info  {
      display: block;
      width: 630px;
      background: #3596FA;
      padding: 16px 0;
      color: #fff;
      font-size: 32px;
      text-align: center;
      border-radius: 20px;
      margin: 30px auto;
      .icon-fangkuai {
        color: #fff;
        font-size: 32px;
        margin-right: 8px;
      }
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .feeList-wrapper {
      margin-top: calc(110px + constant(safe-area-inset-top));
      margin-top: calc(110px + env(safe-area-inset-top));
    }
  }
</style>
