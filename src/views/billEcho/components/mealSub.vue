<template>
<div>
  <nav-title :path="path" :title="title"></nav-title>
  <div class="food-wrapper">
    <div class="food-card" v-for="item in food" :key="item.id">
      <div class="flex card position">
        <div class="flex">
          <span class="city">{{item.city}}</span>
          <span class="number">{{item.number}}</span>
          <span class="price">{{item.price}}</span>
        </div>
        <span class="price-all">{{item.total | numFormat}}</span>
      </div>
      <div class="flex card">
        <div class="flex">
          <span class="start-time">{{item.starttime}}</span>
          <span style="color:#666">—</span>
          <span class="end-time">{{item.endtime}}</span>
        </div>
        <span class="days">{{item.days}}</span>
      </div>
      <div class="human card">{{item.name}}</div>
    </div>
  </div>
</div>
</template>
<script>
import navTitle from '@/components/navTitle'
import { mapGetters } from 'vuex'
export default {
  name: 'FoodAllowance',
  data () {
    return {
      path: 'billEchoMain',
      title: '伙食补贴',
      food: [
      ]
    }
  },
  computed: {
    ...mapGetters(['translateData', 'areData'])
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let expenseList = this.translateData.expenseList
      let travelExpTypeInfo = this.areData.expTypeInfo['MEAL_SUBSIDY']
      if (expenseList) {
        expenseList.forEach(element => {
          if (element.expenseType === 'MEAL_SUBSIDY') {
            let param = {
              city: '',
              number: '',
              price: '',
              total: '',
              starttime: '',
              endtime: '',
              days: '',
              name: ''
            }
            travelExpTypeInfo.forEach(item => {
              switch (item.infoId) {
                case 'ARRIVAL_PLACE':
                  param.city = element[item.arField]
                  break
                case 'PEOPLE_NUMBER':
                  param.number = element[item.arField]
                  break
                case 'MONEY':
                  param.total = element[item.arField]
                  break
                case 'START_DATE':
                  param.starttime = element[item.arField]
                  break
                case 'END_DATE':
                  param.endtime = element[item.arField]
                  break
                case 'DAYS':
                  param.days = element[item.arField] + '天'
                  break
                case 'BUSINESS_MAN':
                  param.name = element[item.arField]
                  break
                case 'STANDARD':
                  param.price = element[item.arField] + '元/天'
                  break
                default:
                  break
              }
            })
            this.food.push(param)
          }
        })
      }
    }
  },
  components: {
    navTitle
  }
}
</script>
<style lang="scss">
.food-wrapper {
  font-family: PingFangSC;
  margin-top: 154px;
  .food-card {
    background: #fff;
    width: 710px;
    height: 222px;
    margin: 20px 24px 0;
    font-family: MicrosoftYaHei;
    .position {
      padding-top: 20px;
    }
    .card {
      margin: 20px 24px 0;
    }
    .city {
      line-height: 50px;
      font-size: 36px;
      font-weight: 600;
      color: #333;
    }
    .number {
      font-size: 20px;
      width: 52px;
      line-height: 36px;
      text-align: center;
      background: #ecf3fc;
      color: #4a90e2;
      margin-left: 20px;
    }
    .price {
      font-size: 20px;
      width: 102px;
      line-height: 36px;
      text-align: center;
      background: #ecf3fc;
      color: #4a90e2;
      margin-left: 12px;
    }
    .price-all {
      font-size: 32px;
      color: #f5a623;
    }
    .start-time {
      font-size: 32px;
      color: #666;
      margin-right: 12px;
    }
    .end-time {
      font-size: 32px;
      color: #666;
      margin-left: 12px;
    }
    .days {
      font-size: 32px;
      color: #333;
    }
    .human {
      text-align: left;
      font-size: 32px;
      color: #666;
    }
  }
}
@supports (bottom: env(safe-area-inset-bottom)){
  .food-wrapper {
    margin-top: calc(110px + constant(safe-area-inset-top));
    margin-top: calc(110px + env(safe-area-inset-top));
  }
}
</style>
