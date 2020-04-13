<template>
  <div class="budget-wrapper module">
    <nav-title :path="path" :title="title"></nav-title>
    <div class="target-amount">{{ thisTitle }}</div>
    <div class="amount">{{ thisTimeMoney | numFormat }}</div>
    <div class="line"></div>
    <div class="card flex" v-for="item in budget" :key="item.list">
      <div class="budget-items">{{item.list}}</div>
      <div class="items-content">{{item.content}}</div>
    </div>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      path: 'billEchoMain',
      title: '',
      thisTimeMoney: 0,
      thisTitle: '',
      budget: [
      ]
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    ...mapGetters(['translateData', 'userInfo', 'areData', 'typeString'])
  },
  methods: {
    init () {
      if (this.$route.params.type === 'buget') {
        this.thisTitle = '本次指标金额'
        this.title = '预算指标'
        let arBillBalanceList = this.translateData.arBillBalanceList
        let bugetAreList = this.areData.areaInfo[this.typeString + 'BUDGET']
        let targetData = {}
        arBillBalanceList.forEach(element => {
          if (this.$route.params.id === element.id) {
            targetData = element
          }
        })
        this.thisTimeMoney = targetData.usedMoney
        bugetAreList.forEach(item => {
          let param = {
            list: '',
            content: ''
          }
          param.list = item.infoName
          if (item.dataType === '03') {
            param.content = this.toStr(targetData[item.codeStr])
          } else {
            param.content = targetData[item.codeStr]
          }
          this.budget.push(param)
        })
      } else if (this.$route.params.type === 'settlement') {
        this.thisTitle = '本次结算金额'
        this.title = '结算信息'
        let settlementList = this.translateData.settlementList
        let setData = {}
        settlementList.forEach(item => {
          if (this.$route.params.id === item.id) {
            setData = item
          }
        })
        this.thisTimeMoney = setData.money
        let settlementType = this.areData.setType
        settlementType.forEach(item => {
          if (item.settlementTypeCode === setData.settlementType) {
            let param = {
              list: '结算方式',
              content: ''
            }
            param.content = item.settlementTypeAlias
            this.budget.push(param)
          }
        })
        this.areData.setTypeInfo[setData.settlementType].forEach(item => {
          let dd = {
            list: '',
            content: ''
          }
          dd.list = item.stInfoName
          if (item.dataType === '03') {
            dd.content = this.toStr(setData[item.codeStr])
          } else {
            dd.content = setData[item.codeStr]
          }
          this.budget.push(dd)
        })
      }
    },
    toStr (num) {
      let c = ''
      if (num) {
        c = (num.toString().indexOf('.') !== -1) ? num.toFixed(2).toLocaleString() : num.toFixed(2).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      }
      return c
    }
  },
  components: {
    navTitle
  }
}
</script>
<style lang="scss">
.budget-wrapper.module{
  background: #fff;
  padding: 174px 0 50px;
  .target-amount{
    text-align: center;
    font-size: 32px;
    color: #333;
  }
  .amount{
    text-align: center;
    font-size:40px;
    font-weight:600;
    color:#333;
    margin-top:21px;
  }
  .line{
    width:710px;
    height:1px;
    background: #EEE;
    margin:50px auto 0px;
  }
  .card{
    width: 630px;
    margin: 35px auto;
    font-size: 32px;
    text-align: left;
    .budget-items{
      margin-right: 36px;
      width: 200px;
      color:#666;
    }
    .items-content{
      width: 390px;
      text-align: left;
      color:#333;
    }
  }
}
@supports (bottom: env(safe-area-inset-bottom)){
  .budget-wrapper {
    padding-top: calc(130px + constant(safe-area-inset-top));
    padding-top: calc(130px + env(safe-area-inset-top));
  }
}
</style>
