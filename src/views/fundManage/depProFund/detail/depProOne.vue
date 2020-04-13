<template>
<div class="fund-warper">
    <nav-title :title="title" :path="path"></nav-title>
    <div class="details-wrapper">
        <h3>{{this.$route.query.departmentName}}各项目执行明细</h3>
    </div>
    <div>
        <card-info :cardList="cardJson" @getItemInfo="getItemInfo" :labelObj="labelObj"></card-info>
    </div>
</div>
</template>
<script>
import navTitle from '@/components/navTitle'
import cardInfo from '../../components/cardInfo'
export default {
  data () {
    return {
      title: '部门项目经费',
      path: 'depProFund',
      cardJson: [],
      labelObj: {
        projectName: '项目名称',
        realBgItemCur: '预算金额',
        bgItemBalanceCur: '可用余额',
        useCur: '执行金额',
        usePercent: '执行率'
      }
    }
  },
  components: {
    navTitle,
    cardInfo
  },
  methods: {
    getItemInfo (item) {
      let objParams = {}
      objParams.year = this.$route.query.year
      objParams.departmentName = this.$route.query.departmentName
      objParams.departmentCode = this.$route.query.departmentCode
      objParams.projectCode = item.projectCode
      objParams.projectName = item.projectName
      this.$router.push({ name: 'depProMonthDetail', query: objParams })
    }
  },
  mounted () {
    let obj = {
      year: this.$route.query.year,
      departmentCode: this.$route.query.departmentCode
    }
    this.$store.dispatch('getOneDeptReportByProject', obj).then(res => {
      this.cardJson = res.data
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
