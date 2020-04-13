<template>
  <div class="file-list-wrapper">
    <div v-if="show" class="reimburse-detail-module">
      <div class="title flex">附件信息</div>
      <!--下拉模式费用明细下方不展示默认新增选项选项-->
      <router-link
        v-for="(item, key) in fileListData" :key="key"
        :to="{ name: 'fileList', query: { name: item.fileTypeName, id: item.id, fileTypeId: item.fileTypeId } }"
        class="item-wrapper">
        <div class="item flex line-1px">
          <div>
            {{ item.fileTypeName }}
            <div v-if="item.list&&item.list.length" class="cost-num flex">{{ item.list.length}}</div>
          </div>
          <i class="iconfont icon-icon-angle-right"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { watchTmp } from '@/utils/mixin.js'

export default {
  name: 'FileList',
  props: ['data'],
  mixins: [watchTmp],
  data () {
    return {
      show: false,
      query: {},
      fileListData: []
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'reimburseBillInfo'])
  },
  methods: {
    // 渲染费用明细数据
    fillData () {
      if (this.reimburseTmpInfo && this.reimburseTmpInfo.fileTypeInfo.length) this.show = true
      else return
      this.fileListData = this.reimburseTmpInfo.fileTypeInfo
      // this.fillDetailData(this.reimburseBillInfo.expenseList)
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
            // if (!obj.totalMoney) obj.totalMoney = 0
            // obj.totalMoney += Number(item.money)
            // this.billMoney += Number(item.money)
          }
        })
      })
    },
    integrateData (billData) {
      if (!billData) return false
      // 清空expenseListData数据，渲染结算数据
      this.expenseListData = {}
      this.$nextTick(() => {
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
  .file-list-wrapper {
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
