<template>
<div>
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
      title: '项目经费',
      path: 'proFund',
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
      let routeObj = {
        year: this.$route.query.year,
        projectName: this.$route.query.name,
        projectCode: item.projectCode,
        billMonth: item.billMonth
      }
      this.$router.push({ name: 'monthDetail', query: routeObj })
    }
  },
  mounted () {
    let obj = {
      year: this.$route.query.year,
      projectCode: this.$route.query.pcode
    }
    this.$store.dispatch('getProOneList', obj).then(res => {
      this.cardJson = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
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
