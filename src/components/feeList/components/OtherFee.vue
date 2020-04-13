<template>
<div class="otherFee-wrapper">
  <router-link class="fee-card"
      v-for="(item, index) in feeList"
      :key="item.id"
      :to="{name: 'editCharge', query: {
        expenseType: query.expenseType,
        index: index,
        item: JSON.stringify(item),
        type: 'change' }}">
    <div class="flex card">
      <div class="flex">
        <span v-if="item.info" class="city">{{item.info.ARRIVAL_PLACE}}</span>
        <span v-if="item.peopleNumber" class="number">{{item.peopleNumber}}人</span>
        <span v-if="item.standard" class="price">{{item.standard}}元/人</span>
      </div>
      <span class="price-all">¥{{item.money}}</span>
    </div>
    <div class="flex card">
      <div class="flex">
        <span v-if="item.info" class="start-time">{{item.info.START_DATE}}</span>
        <span style="color:#666">至</span>
        <span v-if="item.info" class="end-time">{{item.info.END_DATE}}</span>
      </div>
      <span class="days">共{{item.days}}天</span>
    </div>
    <div class="human card">{{item.people}}</div>
  </router-link>
  <router-link :to="{ name: 'editCharge', query: { expenseType: query.expenseType } }" class="add-bill-info">
    <i class="iconfont icon-fangkuai"></i>新增费用明细
  </router-link>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { feeMatchItem } from '@/utils/mixin.js'

export default {
  name: 'OtherFee',
  props: ['pageData'],
  mixins: [feeMatchItem],
  data () {
    return {
      path: 'reimbursementDetail',
      title: '',
      query: {},
      feeList: [],
      businessMan: []
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'areaData'])
  }
}
</script>
<style lang="scss">
.otherFee-wrapper {
  font-family: PingFangSC;
  margin-top: 132px;
  .fee-card {
    display: block;
    width: 710px;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto 0;
    padding: 24px 0;
    .card {
      margin: 15px 24px;
    }
    .city {
      line-height: 50px;
      font-size: 36px;
      font-weight: 600;
      color: #333;
    }
    .number {
      font-size: 20px;
      width: 52px;
      line-height: 36px;
      text-align: center;
      background: #ecf3fc;
      color: #4a90e2;
      margin-left: 20px;
    }
    .price {
      font-size: 20px;
      width: 102px;
      line-height: 36px;
      text-align: center;
      background: #ecf3fc;
      color: #4a90e2;
      margin-left: 12px;
    }
    .price-all {
      font-size: 32px;
      color: #f5a623;
    }
    .start-time {
      font-size: 32px;
      color: #666;
      margin-right: 12px;
    }
    .end-time {
      font-size: 32px;
      color: #666;
      margin-left: 12px;
    }
    .days {
      font-size: 32px;
      color: #333;
    }
    .human {
      text-align: left;
      font-size: 32px;
      color: #666;
    }
  }
}
@supports (bottom: env(safe-area-inset-bottom)){
  .otherFee-wrapper {
    margin-top: calc(110px + constant(safe-area-inset-top));
    margin-top: calc(110px + env(safe-area-inset-top));
  }
}
</style>
