<template>
<div class="fund-outer-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <div class="details-wrapper">
        <h3>{{this.$route.query.name}}各月份执行明细</h3>
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
      title: '部门经费',
      path: 'depFund',
      cardJson: [],
      labelObj: {
        billMonth: '月份',
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
      objParams.name = this.$route.query.name
      objParams.departmentCode = item.departmentCode
      objParams.billMonth = item.billMonth
      this.$router.push({ name: 'depMonthDetail', query: objParams })
    }
  },
  mounted () {
    let obj = {
      year: this.$route.query.year,
      departmentCode: this.$route.query.departmentCode
    }
    this.$store.dispatch('getOneDepartmentReport', obj).then(res => {
      this.cardJson = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
.fund-outer-wrapper {
    background: #f3f3f3!important;
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
