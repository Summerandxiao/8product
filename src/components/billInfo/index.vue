<template>
  <div class="bill-info-wrapper">
    <div v-if="show" class="reimburse-detail-module">
      <div class="title flex">结算信息
        <div class="total-card">
          <span class="total-money" v-if="billMoney!=0">¥{{ Number(billMoney)|numFormat }}</span>
          <span class="total-money" v-else>¥0.00</span>
        </div>
      </div>
      <!--路由的同时传递结算方式-->
      <router-link
        v-for="(item, index) in settlementData"
        :key="item.key"
        :to="{ name: 'billInfo', query: { type: item.settlementType, name: item.name, obj: JSON.stringify(item), index } }"
        class="item-wrapper">
        <div class="item flex line-1px">
          <div>{{item.name}}</div>
          <div>
            <span>¥{{ Number(item.money)|numFormat }}</span>
            <i class="iconfont icon-icon-angle-right"></i>
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'chooseBillType' }" class="add-bill-info"><i class="iconfont icon-fangkuai"></i>新增结算信息</router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { watchTmp } from '@/utils/mixin.js'

export default {
  name: 'BillInfo',
  props: ['data'],
  mixins: [watchTmp],
  data () {
    return {
      show: false,
      billMoney: 0,
      settlementData: {}
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'reimburseBillInfo'])
  },
  watch: {
    reimburseBillInfo () {
      if (this.reimburseBillInfo.settlementList) this.integrateData(this.reimburseBillInfo.settlementList)
    }
  },
  methods: {
    fillData () {
      // setType长度为0，说明没有结算信息
      if (this.reimburseTmpInfo && this.reimburseTmpInfo.setType.length) this.show = true
      else return
      const billData = this.reimburseBillInfo.settlementList
      this.integrateData(billData)
    },
    // 更新结算信息数据
    integrateData (billData) {
      if (!billData) return false
      // 清空settlementData数据，渲染结算数据
      this.settlementData = []
      this.billMoney = 0
      this.$nextTick(() => {
        this.reimburseBillInfo.settlementList.forEach(ele => {
          this.reimburseTmpInfo.setType.forEach(item => {
            if (ele.settlementType === item.settlementTypeCode) {
              ele.name = item.settlementTypeName
            }
          })
          this.billMoney += Number(ele.money)
          this.settlementData.push(ele)
        })
      })
    }
  }
}
</script>
<style lang="scss">
  .bill-info-wrapper {
    .item-wrapper {
      color: #333;
    }
    .item {
      height: 100px;
    }
  }
</style>
