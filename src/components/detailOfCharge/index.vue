<template>
  <div class="detail-of-charge-wrapper">
    <div v-if="show" class="reimburse-detail-module">
      <div class="title flex">费用明细
        <div class="total-card">
          <span class="total-money" v-if="billMoney!=0">¥{{ Number(billMoney)|numFormat }}</span>
          <span class="total-money" v-else>¥0.00</span>
        </div>
      </div>
      <!--下拉模式费用明细下方不展示默认新增选项选项-->
      <router-link
        v-for="(item, key) in expenseListData" :key="key"
        :to="{ name: item.list&&item.list.length ? 'feeList': 'editCharge',
        query: {
          expenseType: item.expenseType,
          item: JSON.stringify(item)
        } }"
        class="item-wrapper">
        <div class="item flex line-1px">
          <div>
            {{ item.expenseTypeName }}
            <div v-if="item.list&&item.list.length" class="cost-num flex">{{ item.list.length}}</div>
          </div>
          <div>
            <span v-if="item.totalMoney || item.totalMoney===0">¥{{ Number(item.totalMoney)|numFormat }}</span>
            <i class="iconfont icon-icon-angle-right"></i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { watchTmp } from '@/utils/mixin.js'

export default {
  name: 'DetailOfCharge',
  props: ['data'],
  mixins: [watchTmp],
  data () {
    return {
      show: false,
      billMoney: 0,
      query: {},
      expenseListData: []
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'reimburseBillInfo'])
  },
  watch: {
    reimburseBillInfo () {
      this.fillDataByType()
    }
  },
  methods: {
    // 渲染费用明细数据
    fillData () {
      if (this.reimburseTmpInfo && this.reimburseTmpInfo.expType && this.reimburseTmpInfo.expType.length) this.show = true
      else return
      this.expenseListData = this.reimburseTmpInfo.expType
      this.fillDataByType()
    },
    fillDataByType () {
      if (!(this.reimburseBillInfo.expenseList && this.reimburseBillInfo.expenseList.length)) return
      switch (this.reimburseTmpInfo.showType) {
        case '01': case '03': // 分组模式
          this.fillDetailData(this.reimburseBillInfo.expenseList)
          break
        case '02': // 下拉模式
          this.integrateData(this.reimburseBillInfo.expenseList)
          break
        // case '03': // 平铺模式
        //   break
      }
    },
    fillDetailData (data) {
      if (!data) return false
      this.billMoney = 0
      // 新增费用明细之后回显到单据详情页，遍历单据模版和明细数据进行匹配
      this.expenseListData.forEach(obj => {
        obj.list = []
        obj.totalMoney = 0
        data.forEach(item => {
          if (obj.expenseType === item.expenseType) {
            obj.list.push(item)
            if (!obj.totalMoney) obj.totalMoney = 0
            obj.totalMoney += Number(item.money)
            this.billMoney += Number(item.money)
          }
        })
        // console.log(this.expenseListData)
      })
    },
    integrateData (billData) {
      if (!billData) return false
      // 清空expenseListData数据，渲染结算数据
      this.expenseListData = {}
      this.$nextTick(() => {
        this.billMoney = 0
        billData.forEach(ele => {
          if (!this.expenseListData[`_${ele.expenseType}_`]) {
            this.expenseListData[`_${ele.expenseType}_`] = {}
            this.expenseListData[`_${ele.expenseType}_`].expenseTypeName = ele.expenseTypeName
            this.expenseListData[`_${ele.expenseType}_`].list = []
          }
          this.expenseListData[`_${ele.expenseType}_`].list.push(ele)
          if (!this.expenseListData[`_${ele.expenseType}_`].totalMoney) this.expenseListData[`_${ele.expenseType}_`].totalMoney = 0
          this.expenseListData[`_${ele.expenseType}_`].totalMoney += Number(ele.money)
          this.billMoney += Number(ele.money)
        })
      })
    }
  }
}
</script>
<style lang="scss">
  .detail-of-charge-wrapper {
    .item-wrapper {
      color: #333;
    }
    .cost-num {
      display: inline-flex;
      width: 42px;
      height: 42px;
      justify-content: center;
      align-items: center;
      margin-left:8px;
      background: #EAF4FE;
      color:#3596FA;
      border-radius: 100%;
    }
    .item {
      height: 100px;
    }
  }
</style>
