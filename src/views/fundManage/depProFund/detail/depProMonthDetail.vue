<template>
<div class="fund-warper">
    <nav-title :title="title"></nav-title>
    <div class="details-wrapper">
        <h3>{{params.departmentName}}{{params.projectName}}各月执行明细</h3>
    </div>
    <div>
        <card-info @getItemInfo="getItemInfo" :cardList="cardJson" :labelObj="labelObj"></card-info>
    </div>
</div>
</template>
<script>
import navTitle from '../../components/title'
import cardInfo from '../../components/cardInfo'
export default {
  data () {
    return {
      title: '部门项目经费',
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
  computed: {
    params: function () {
      return this.$route.query
    }
  },
  mounted () {
    let obj = {
      projectCode: this.params.projectCode,
      departmentCode: this.params.departmentCode,
      year: this.params.year
    }
    this.$store.dispatch('getDeptAndProjectReport', obj).then(res => {
      this.cardJson = res.data
    })
  },
  methods: {
    getItemInfo (item) {
      let paramsObj = {}
      paramsObj.year = this.$route.query.year
      paramsObj.departmentName = this.$route.query.departmentName
      paramsObj.departmentCode = this.$route.query.departmentCode
      paramsObj.projectName = this.$route.query.projectName
      paramsObj.projectCode = this.$route.query.projectCode
      paramsObj.month = item.billMonth
      this.$router.push({ name: 'depProMonth', query: paramsObj })
    }
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
