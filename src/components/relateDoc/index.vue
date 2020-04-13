<template>
  <div class="relate-doc-wrapper">
    <div v-for="(item, index) in headList" :key="item.id" class="reimburse-detail-module">
      <div class="title flex">
        {{ item.areaName }}
        <div class="total-card">
          <span class="total-money" v-if="money[item.areaType] && money[item.areaType]!=0">¥{{ Number(money[item.areaType])|numFormat }}</span>
          <span class="total-money" v-else>¥0.00</span>
        </div>
      </div>
      <router-link v-for="item1 in reimburseBillInfo[relateList[item.areaType]]" :key="item1.id" :to="{ name: 'changeRelateDoc', query: { data: JSON.stringify(item1), page: 'reimburseDetail', infoId: item.areaType, index} }" class="flex fund line-1px">
        <div class="left flex">{{ markList[item.areaType] }}</div>
        <div class="right">
          <div class="flex item1">
            <span class="billno">
              {{ item1.applyBillNo || item1.loanBillNo || item1.billNo || item1.planCode || item1.contractCode }}
            </span>
            <span class="money">¥{{item1.usedMoney}}</span>
          </div>
          <div class="flex item1">
            <span class="content">{{ item1.applyReason || item1.reason || item1.loanReason || item1.planContent }}</span>
            <i class="iconfont icon-icon-angle-right"></i>
          </div>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'chooseRelateDoc', query: { infoId: item.areaType, billType: billType } }"
        class="add-bill-info">
        <i class="iconfont icon-fangkuai"></i>
        新增{{ item.areaName }}
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { billList } from '@/utils/global'
import * as Auth from '@/utils/auth'
import { watchTmp } from '@/utils/mixin.js'

export default {
  name: 'relateDoc',
  mixins: [watchTmp],
  data () {
    return {
      billType: '',
      billMoney: 0,
      headList: [],
      money: {},
      markList: { // 列表左侧关联单据方式标示
        'APPLY': '请',
        'LOAN': '借',
        'FACARD': '卡',
        'MAINTENANCE': '修',
        'CONTRACT': '合',
        'PURCHASE': '采',
        'APPLY_ITEM': '事'
      }
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'reimburseBillInfo'])
  },
  methods: {
    fillData () {
      this.relateList = billList
      this.billType = this.$route.query.billType || Auth.getStorage('billType')
      this.reimburseTmpInfo.areaLeft.forEach(item => {
        if (item.areaType === 'RELATION') {
          this.headList = item.sonList
          this.figureMoney()
        }
      })
    },
    figureMoney () {
      console.log(this.reimburseBillInfo)
      this.headList.forEach(item => {
        if (this.reimburseBillInfo[this.relateList[item.areaType]]) {
          this.money[item.areaType] = 0
          this.reimburseBillInfo[this.relateList[item.areaType]].forEach(ele => {
            if (!this.money[item.areaType]) this.money[item.areaType] = Number(0)
            this.money[item.areaType] += Number(ele.usedMoney)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .relate-doc-wrapper {
    padding-bottom: 1px;
    .fund {
      .left {
        width: 88px;
        height: 88px;
        background: #ecf3fc;
        color: #3596fa;
        font-size: 48px;
        justify-content: center;
        align-items: center;
      }
      .right {
        width: 584px;
        margin-left: 24px;
        padding-top: 32px;
        font-size: 32px;
        .item1 {
          padding: 0 0 24px;
        }
        .billno {
          color: #3596FA;
        }
        .money {
          color: #333;
        }
        .content {
          font-size: 30px;
          color: #666;
        }
      }
    }
  }
</style>
