<template>
<div class="fund-outer-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <navbar :navLabels="navLabels" :selected="selected"></navbar>
    <mt-tab-container infinite-scroll-disabled="loading" v-model="selected" v-infinite-scroll="loadMore" style="clear:both;">
        <mt-tab-container-item :id="item.id" v-for="(item,index) in navLabels" :key="index">
            <card-info :isCircularCard="true" @getItemInfo="getItemInfo" :cardList="cardJson1" :labelObj="labelObj"></card-info>
        </mt-tab-container-item>
    </mt-tab-container>
    <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
    </p>
</div>
</template>
<script>
import navTitle from '@/components/navTitle'
import navbar from '@/components/navbar'
import cardInfo from '../components/cardInfo'
export default {
  components: {
    navTitle,
    navbar,
    cardInfo
  },
  data () {
    return {
      path: 'main',
      title: '部门项目经费',
      selected: '1',
      navLabels: [],
      year: (new Date()).getFullYear(),
      cardJson1: [],
      loading: false,
      labelObj: {
        departmentName: '部门',
        realBgItemCur: '预算金额',
        bgItemBalanceCur: '可用金额',
        useCur: '执行金额',
        usePercent: '执行率'
      }
    }
  },
  watch: {
    selected () {
      if (this.selected === '1') {
        this.cardJson1 = []
        this.getList(this.year)
      } else if (this.selected === '2') {
        this.cardJson1 = []
        console.log(this.cardJson1, '2')
        this.getList(this.year - 1)
      } else {
        this.cardJson1 = []
        console.log(this.cardJson1, '3')
        this.getList(this.year - 2)
      }
    }
  },
  mounted () {
    for (let j = this.year; j > this.year - 3; j--) {
      this.navLabels.push({
        id: (this.year - j + 1).toString(),
        label: j
      })
    }
    this.$root.Bus.$on('changeSelected', value => {
      this.selected = value
    })
    this.getList(this.year)
  },
  methods: {
    getList (year) {
      this.$store.dispatch('getSumReportInDepartmentAll', year).then((res) => {
        this.loading = false
        this.cardJson1 = res.data
      })
    },
    loadMore () {
      console.log('加载更多')
    },
    getItemInfo (item) {
      this.$router.push({ name: 'depProOne', query: { year: item.setYear, departmentCode: item.departmentCode, departmentName: item.departmentName } })
    }
  }
}
</script>

<style lang="scss" scoped>
.fund-outer-wrapper {
    background: #f3f3f3!important;
}

.mint-tab-container {
    margin-top: 190px!important;
}

@supports (bottom: env(safe-area-inset-bottom)) {
    .mint-tab-container {
        top: calc(10px + env(safe-area-inset-top));
        top: calc(10px + constant(safe-area-inset-top));
    }
}
</style>
