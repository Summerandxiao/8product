<template>
<div class="fund-warper">
    <nav-title :title="title"></nav-title>
    <div class="details-wrapper">
        <h3>{{params.name}}{{params.billMonth}}执行明细</h3>
    </div>
    <div>
        <card-info :sysId='sysId' :cardList="cardJson" :labelObj="labelObj" :isShowAngle="false"></card-info>
    </div>
</div>
</template>
<script>
import navTitle from '../../components/title'
import cardInfo from '../../components/cardInfo'
export default {
  data () {
    return {
      title: '部门经费',
      path: 'depProFund',
      cardJson: [],
      labelObj: {
        busBillDate: '日期',
        summary: '摘要',
        useCur: '执行金额',
        billNo: '单据编号',
        billNoCopy: '凭证号',
        accItem: '科目'
      },
      sysId: ''
    }
  },
  components: {
    navTitle,
    cardInfo
  },
  computed: {
    params: function () {
      return this.$route.query
    }
  },
  mounted () {
    let obj = {
      year: this.params.year,
      departmentCode: this.params.departmentCode,
      month: this.params.billMonth.slice(0, this.params.billMonth.length - 1)
    }
    this.$store.dispatch('getOneDepartmentReportByMonth', obj).then(res => {
      this.cardJson = res.data.list
      this.sysId = res.data.sysId
    })
  }
}
</script>
<style lang="scss" scoped>
.fund-warper {
    background: #F1F3F6;
}

.details-wrapper {
    h3 {
        font-size: 40px;
        padding: 0 20px;
        color: #999999;
        font-weight: normal;
    }
}

@supports (bottom: env(safe-area-inset-bottom)) {
    .mint-tab-container {
        top: calc(10px + env(safe-area-inset-top));
        top: calc(10px + constant(safe-area-inset-top));
    }
    .details-wrapper {
        margin-top: calc(125px + constant(safe-area-inset-top));
        margin-top: calc(125px + env(safe-area-inset-top));
    }
}

</style>
