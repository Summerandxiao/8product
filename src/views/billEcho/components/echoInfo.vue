<template>
  <div class="info-wrapper">
    <div v-if="(type=='BASE'||type=='SETTMENT'||type== 'BUDGET'||type=='FILE'||type=='DETAIL') && billInfo.length" class="tmp-module">
      <div class="title flex">{{title}}
        <div v-if="type !== 'BASE' && type !== 'FILE'" class="total-card">
          <span class="total-money">{{areTotal | numFormat}}</span>
        </div>
      </div>
      <div v-for="item in billInfo" :key="item.key" class="item-wrapper">
        <!--判断是否需要跳转-->
        <div v-if="item.path" class="item flex" @click="goto(item.path, item.params)">
          <div>{{item.key}}<div v-if="item.count" class="cost-num flex">{{item.count}}</div></div>
          <div v-if="type === 'DETAIL'">{{item.value | numFormat}}<i class="iconfont icon-icon-angle-right"></i></div>
          <div v-else>{{item.value}}<i class="iconfont icon-icon-angle-right"></i></div>
        </div>
        <div v-else class="item flex">
          <div>{{item.key}}<div v-if="item.count" class="cost-num flex">{{item.count}}</div></div>
         <div v-if="type === 'DETAIL'">{{item.value | numFormat}}</div>
          <div v-else>{{item.value}}</div>
        </div>
      </div>
    </div>
    <div v-if="(type=='APPLY' || type=='LOAN' || type=='FACARD' ||type=='MAINTENANCE' ||type=='CONTRACT' ||type=='PURCHASE' ||type=='APPLY_ITEM') && billInfo.length" class="tmp-module">
      <div class="title flex">{{title}}
        <div class="total-card">
          <span class="total-money">{{areTotal | numFormat}}</span>
        </div>
      </div>
      <div v-for="item in billInfo" :key="item.id" class="flex fund">
        <div v-if="type=='APPLY'" class="left flex">请</div>
        <div v-if="type=='LOAN'" class="left flex">借</div>
        <div v-if="type=='FACARD'" class="left flex">资</div>
        <div v-if="type=='MAINTENANCE'" class="left flex">维</div>
        <div v-if="type=='CONTRACT'" class="left flex">合</div>
        <div v-if="type=='PURCHASE'" class="left flex">采</div>
        <div v-if="type=='APPLY_ITEM'" class="left flex">事</div>
        <div class="right">
          <div class="flex item1">
            <span class="billno">{{item.billno}}</span>
            <span class="money">{{item.money}}</span>
          </div>
          <div class="flex item1">
            <span class="content">{{item.content}}</span>
            <!--后续需要做穿透-->
            <!-- <i class="iconfont icon-icon-angle-right"></i> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'info',
  props: ['type', 'title', 'list', 'thisAreData', 'areType'],
  data () {
    return {
      billInfo: [],
      areTotal: 0 // 此区域金额合计
    }
  },
  computed: {
    ...mapGetters(['translateData', 'userInfo', 'areData'])
  },
  watch: {
    translateData () {
      this.init()
    }
  },
  methods: {
    init () {
      // 封装单据模板中获取的单据模板信息和所对应的数据
      this.initPageData(this.translateData)
    },
    initPageData (_data) {
      let that = this
      let sum = 0
      switch (this.areType) {
        case 'SETTMENT':
          let settleMentType = this.areData.setType
          let settleMentList = _data.settlementList
          if (settleMentList) {
            settleMentList.forEach(item => {
              let param = {
                key: '',
                value: '',
                dataType: '',
                path: 'bugetAndSettment',
                params: {
                  'type': 'settlement',
                  'id': item.id
                }
              }
              settleMentType.forEach(ele => {
                if (ele.settlementTypeCode === item.settlementType) {
                  param.key = ele.settlementTypeName
                  sum += item.money
                  param.value = that.toStr(item.money)
                  this.billInfo.push(param)
                }
              })
            })
          }
          break
        case 'BASE':
          if (this.thisAreData) {
            let arBill = _data.arBill
            this.thisAreData.forEach(element => {
              if (arBill) {
                Object.keys(arBill).forEach(keys => {
                  if (keys === element.arField) {
                    let param = {
                      key: element.infoName,
                      value: arBill[keys]
                    }
                    that.billInfo.push(param)
                  }
                })
              }
            })
          }
          break
        case 'BUDGET':
          if (this.thisAreData) {
            let arBillBalanceList = _data.arBillBalanceList
            if (arBillBalanceList) {
              arBillBalanceList.forEach(item => {
                this.thisAreData.forEach(ele => {
                  if (ele.codeStr === 'projectCode') {
                    let param = {
                      key: '',
                      value: '',
                      path: 'bugetAndSettment',
                      params: {
                        'type': 'buget',
                        'id': item.id
                      }
                    }
                    param.key = ele.infoName
                    sum += item.usedMoney
                    param.value = this.toStr(item.usedMoney)
                    this.billInfo.push(param)
                  }
                })
              })
            }
          }
          console.log(this.billInfo, '1233343')
          break
        case 'FILE':
          if (this.areData.fileTypeInfo) {
            let fileList = _data.fileList
            if (fileList) {
              fileList.forEach(item => {
                let param = {
                  key: '',
                  path: ''
                }
                param.key = item.fileName
                this.billInfo.push(param)
              })
            }
          }
          break
        case 'DETAIL':
          let expenseList = _data.expenseList
          if (expenseList) {
            expenseList.forEach(item => {
              sum += item.money
              let flag = false
              let param = {
                key: '',
                expenseType: '',
                value: '',
                count: 0,
                path: ''
              }
              this.billInfo.forEach(ele => {
                if (ele.expenseType === item.expenseType) {
                  ele.count += 1
                  flag = true
                }
              })
              if (!flag) {
                param.key = item.expenseTypeName
                param.expenseType = item.expenseType
                param.count += 1
                param.value = item.money
                if (item.expenseType === 'TRAVEL' || item.expenseType === 'TRAFFIC_SUBSIDY' || item.expenseType === 'JTBZ') {
                  param.path = 'tranlateTravel'
                } else if (item.expenseType === 'HOUSE_FEE') {
                  param.path = 'houseFee'
                } else if (item.expenseType === 'MEAL_SUBSIDY') {
                  param.path = 'mealSub'
                }
                this.billInfo.push(param)
              }
            })
          }
          break
        case 'APPLY':
          let applyList = _data.applyList
          if (applyList) {
            applyList.forEach(item => {
              let param = {
                billno: '',
                money: '',
                content: ''
              }
              param.billno = item.applyBillNo
              sum += item.usedMoney
              param.money = this.toStr(item.usedMoney)
              param.content = item.applyReason
              this.billInfo.push(param)
            })
          }
          break
        case 'LOAN':
          let loanList = _data.loanList
          if (loanList) {
            loanList.forEach(item => {
              let param = {
                billno: '',
                money: '',
                content: ''
              }
              param.billno = item.loanBillNo
              sum += item.usedMoney
              param.money = this.toStr(item.usedMoney)
              param.content = item.loanReason
              this.billInfo.push(param)
            })
          }
          break
        default:
          break
      }
      this.areTotal = sum
    },
    toStr (num) {
      let c = ''
      if (num) {
        c = (num.toString().indexOf('.') !== -1) ? num.toFixed(2).toLocaleString() : num.toFixed(2).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      }
      return c
    },
    goto (path, param) {
      if (path !== '1') this.$router.push({ name: path, params: param })
    }
  }
}
</script>
<style lang="scss">
  .info-wrapper {
    .tmp-module {
      width: 686px;
      padding: 0 32px;
      background: #fff;
      padding-top: 20px;
      margin-bottom: 20px;
      font-size: 32px;
    }
    .title {
      height: 80px;
      font-size: 36px;
      font-weight: bold;
    }
    .item-wrapper:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
    .item {
      height: 100px;
    }
    .cost-num {
      display: inline-flex;
      width: 42px;
      height: 42px;
      justify-content: center;
      align-items: center;
      margin-left: 8px;
      background: #EAF4FE;
      color: #3596FA;
      border-radius: 100%;
    }
    .fund {
      .left {
        width: 88px;
        height: 88px;
        background: #ecf3fc;
        color: #3596fa;
        font-size: 48px;
        justify-content: center;
        align-items: center;
      }
      .right {
        width: 584px;
        margin-left: 24px;
        padding-top: 32px;
        .item1 {
          padding: 0 0 24px;
        }
        .billno {
          color: #666;
        }
        .money {
          color: #333;
        }
        .content {
          font-size: 30px;
          color: #666;
        }
      }
    }
    .fund:not(:last-child) {
      border-bottom: 1px solid #eee
    }
    .iconfont {
      font-size: 24px;
      color: #ccc;
      margin-left: 10px;
    }
    .total-card{
      text-align: right;
      padding: 32px 0;
      .total-money {
        color: #f5a623;
      }
    }
  }
</style>
