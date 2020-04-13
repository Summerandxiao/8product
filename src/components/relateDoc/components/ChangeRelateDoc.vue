<template>
  <div class="relate-info-wrapper">
    <nav-title :title="title" :path="path" :query="query"></nav-title>
    <div
      v-for="(item, index) in head" :key="item"
      class="relate-item flex line-1px">
        <label class="item-label"> {{ item }} </label>
        <div class="item-content">
          <!--单据名称-->
          <input v-if="data.applyBillTypeName && index === 0" class="input" type="text" v-model="data.applyBillTypeName">
          <input v-else-if="data.loanBillTypeName  && index === 0" class="input" type="text" v-model="data.loanBillTypeName">
          <input v-else-if="data.billTypeName  && index === 0" class="input" type="text" v-model="data.billTypeName">
          <input v-else-if="data.planName && index === 0" class="input" type="text" v-model="data.planName">
          <input v-else-if="data.contractName && index === 0" class="input" type="text" v-model="data.contractName">
          <!--单据事由-->
          <input v-if="data.reason && index === 1" class="input" type="text" v-model="data.reason">
          <input v-if="data.applyReason && index === 1" class="input" type="text" v-model="data.applyReason">
          <input v-if="data.loanReason && index === 1" class="input" type="text" v-model="data.loanReason">
          <input v-if="data.planContent && index === 1" class="input" type="text" v-model="data.planContent">
          <!--金额-->

          <input v-if="data.billMoney && index === 2" class="input" type="text" v-model="data.billMoney">
          <input v-if="data.planAmount && index === 2" class="input" type="text" v-model="data.planAmount">
          <!--可用余额-->
          <input v-if="data.balAmt && index === 3" class="input" type="text" v-model="data.balAmt">
          <input v-if="data.planBalance && index === 3" class="input" type="text" v-model="data.planBalance">
          <input v-if="data.payableAmount && index === 3" class="input" type="text" v-model="data.payableAmount">
          <!--本次使用金额-->
          <input v-if="index === 4" class="input" type="text" v-model="data.usedMoney">
        </div>
    </div>
    <mt-button class="save" type="primary" @click="save">保存</mt-button>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import { mapMutations } from 'vuex'

export default {
  name: 'RelateInfo',
  components: {
    navTitle
  },
  data () {
    return {
      index: 0,
      path: '',
      title: '修改关联单据',
      query: {},
      data: {},
      head: ['单据类型', '单据事由', '金额', '可用金额', '本次使用金额']
    }
  },
  created () {
    this.data = JSON.parse(this.$route.query.data)
    this.path = this.$route.query.page
    this.index = this.$route.query.index
    if (this.$route.query.billType) {
      this.query = {
        infoId: this.$route.query.infoId,
        billType: this.$route.query.billType
      }
    }
  },
  methods: {
    ...mapMutations(['CHANGEBILLINFO']),
    save () {
      this.CHANGEBILLINFO({ info: 'relate', data: this.data, infoId: this.$route.query.infoId, index: this.index })
      this.$router.push({ path: this.path, query: this.query })
    }
  }
}
</script>
<style lang="scss">
  .relate-info-wrapper {
    padding-top: 132px;
    background: #fff;
    .line-1px::before {
      border: none;
      border-bottom: 1px solid #eee;
    }
    .relate-item {
      width: 686px;
      padding: 18px 0;
      background: #fff;
      margin: 0 auto;
      .item-label {
        width: 210px;
        margin-right: 20px;
        font-weight: 400;
        color: #666;
        font-size: 32px;
      }
      .item-content {
        position: relative;
        .input {
          display: inline-block;
          width: 456px;
          height: 48px;
          text-align: right;
          background: #fff;
          outline: none;
          border: none;
          color: #333;
          font-size: 32px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          z-index: 100;
        }
      }
    }
    .save {
      position: absolute;
      left: 32px;
      bottom: 88px;
      width: 686px;
      height: 90px;
      border-radius: 45px;
      font-size: 36px;
    }
  }
</style>
