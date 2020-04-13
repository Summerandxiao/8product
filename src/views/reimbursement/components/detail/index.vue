<template>
  <div class="reimburse-detail-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <div class="reimburse-item-wrapper">
      <base-info></base-info>
      <bill-info></bill-info>
      <relate-doc></relate-doc>
      <detail-of-charge></detail-of-charge>
      <budget></budget>
      <file-list></file-list>
      <mt-button class="save" type="primary" @click="checkBill">保存</mt-button>
    </div>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import baseInfo from '@/components/baseInfo'
import billInfo from '@/components/billInfo'
import relateDoc from '@/components/relateDoc'
import budget from '@/components/budget'
import fileList from '@/components/fileList'
import detailOfCharge from '@/components/detailOfCharge'
import { mapGetters, mapMutations } from 'vuex'
import * as Auth from '@/utils/auth'

export default {
  name: 'ReimburseDetail',
  components: {
    navTitle,
    baseInfo,
    billInfo,
    budget,
    relateDoc,
    fileList,
    detailOfCharge
  },
  data () {
    return {
      title: '报销单详情',
      path: 'reimbursement',
      billId: '',
      role_code: '',
      templetCode: '',
      getIdFlag: false,
      query: {}
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'reimburseBillInfo', 'areaData'])
  },
  created () {
    this.role_code = JSON.parse(Auth.getStorage('userInfo')).roleCode
    const billType = Auth.getStorage('billType')
    if (this.$route.query.id) Auth.setStorage('billId', this.$route.query.id)
    this.billId = this.$route.query.id || Auth.getStorage('billId')
    // 获取单据详情数据
    if (this.$route.query.id) this.getBillInfo(this.billId)
    // 获取模版code
    this.query = {
      billType: this.$route.query.billType || billType,
      positionCode: this.role_code
    }
    this.$store.dispatch('getPositionList', this.query).then((data) => {
      this.templetCode = data.templetCode
      Auth.setStorage('templetCode', this.templetCode)
      if (this.query.billType) Auth.setStorage('billType', this.query.billType)
      this.getTmpInfo()
    })
    if (!this.areaData.length) this.$store.dispatch('getFullArea') // 获取地区三级联动
  },
  beforeRouteLeave (to, from, next) {
    // 返回列表页，清空报销单详情
    if (to.name === 'reimbursement') {
      Auth.removeItem('templetCode')
      Auth.removeItem('billType')
      Auth.removeItem('billId')
      this.CLEARBILLINFO()
      this.CLEARTMPINFO()
    }
    next()
  },
  methods: {
    ...mapMutations(['CLEARTMPINFO', 'CLEARBILLINFO']),
    /**
     * 获取单据模版信息,暂时写死参数
    */
    getTmpInfo () {
      const obj = {
        billType: this.query.billType,
        templetCode: this.templetCode,
        coCode: JSON.parse(Auth.getStorage('userInfo')).coCode,
        role_code: this.role_code
      }
      this.$store.dispatch('getTemplateInfo', obj)
    },
    getBillInfo (id) {
      this.$store.dispatch('getBillInfo', id)
    },
    checkBill () {
      if (!Object.keys(this.reimburseBillInfo).length) return
      if (this.reimburseBillInfo.expenseList) {
        // checkBill接口对费用明细进行校验
        this.$store.dispatch('checkBill', this.reimburseBillInfo).then((res) => {
          if (res) this.save()
        })
      } else {
        this.save()
      }
    },
    save () {
      this.$store.dispatch('saveBill', this.reimburseBillInfo).then((rs) => {
        this.$message('提示', `单据保存成功`)
        this.$router.push({ path: 'reimbursement' })
      })
    }
  }
}
</script>
<style lang="scss">
  .reimburse-detail-wrapper {
    .reimburse-item-wrapper {
      margin-top: 132px;
      padding-bottom: 150px;
      background: #F1F3F6;
      overflow-y: scroll;
      .iconfont {
        font-size: 24px;
        color: #ccc;
        margin-left: 10px;
      }
      .save {
        position: fixed;
        left: 32px;
        bottom: 50px;
        width: 686px;
        height: 90px;
        border-radius: 45px;
        font-size: 36px;
      }
    }
    .reimburse-detail-module {
      width: 686px;
      padding: 0 32px;
      background: #fff;
      padding-top: 20px;
      margin-bottom: 20px;
      font-size: 32px;
    }
    .line-1px:before {
      border: none;
      border-bottom: 1px solid #eee;
    }
    .title {
      height: 80px;
      font-size: 36px;
      font-weight: bold;
    }
    .add-bill-info  {
      display: block;
      padding: 27px 0;
      color: #3596FA;
      font-size: 32px;
      text-align: center;
      .icon-fangkuai {
        color: #3596FA;
        font-size: 32px;
        margin-right: 8px;
      }
    }
    .total-card{
      text-align: right;
      .total-money {
        color: #f5a623;
      }
    }
    @supports (bottom: env(safe-area-inset-bottom)){
      .reimburse-item-wrapper {
        margin-top: calc(88px + constant(safe-area-inset-top));
        margin-top: calc(88px + env(safe-area-inset-top));
      }
    }
    .base-wrapper {
      margin-bottom: 20px;
    }
  }
</style>
