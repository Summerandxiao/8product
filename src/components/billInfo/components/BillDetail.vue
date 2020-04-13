<template>
  <div class="bill-detail-wrapper">
    <nav-title :title="title" :path="path"></nav-title>
    <div class="bill-info-detail">
      <div class="bill-item flex line-1px">
        <label class="item-label">结算方式</label>
        <span>{{name}}</span>
      </div>
      <div
        v-for="item in reimburseTmpInfo.setTypeInfo[type]"
        :key="item.id"
        class="bill-item flex line-1px">
          <label class="item-label">{{item.stInfoName}}</label>
          <div class="item-content">
            <!--结算方式为汇款转账或公务卡-->
            <input
              v-if="type=='PAY'&&item.codeStr=='recAccName' || type=='BUSINESS'&&item.codeStr=='recAccName'"
              class="input"
              type="text"
              :placeholder="'请输入'+item.stInfoName"
              v-model="bill[type][item.codeStr]"
              @focus="focusAccount"
              @blur="blurAccount($event)"
              @input="inputAccount(item.codeStr)">
            <!--结算方式为支票或现金-->
            <select v-else-if="type=='CHECK'&&item.codeStr=='chequeKind' || type=='CASH'&&item.codeStr=='drCr'"
              v-model="bill[type][item.codeStr]"
              class="check-type">
              <option
                v-for="item in checkTypeList"
                :key="item.id"
                :value="item.sourceCode">{{item.sourceName}}</option>
            </select>
            <date-range v-else-if="type =='BUSINESS'&&item.codeStr=='billDate'"
              :count="1"
              :default="''"
              :datestr="item.codeStr"
              @changeTime="changeTime"/>
            <!--结算方式为现金-->
            <input v-else class="input" type="text" :placeholder="'请输入'+item.stInfoName" v-model="bill[type][item.codeStr]">
            <!--结算方式为汇款转账时的数据联动-->
            <div v-if="type=='PAY'&&item.codeStr=='recAccName'&&ifShowAccount" class="pay-account">
              <!--实现账户可编辑可筛选-->
              <div v-for="item1 in payAccount" :key="item1.bankAccCode" class="account-name" @touchstart="chooseAccount(item1)">{{item1.bankAccName}}</div>
            </div>
            <!--结算方式为公务卡时的数据联动-->
            <div v-if="type=='BUSINESS'&&item.codeStr=='recAccName'&&ifShowAccount" class="pay-account">
              <!--实现持卡人可编辑可筛选-->
              <div v-for="item2 in payAccount" :key="item2.recAccName" class="account-name" @touchstart="chooseAccount(item2)">{{item2.recAccName}}</div>
            </div>
          </div>
      </div>
    </div>
    <mt-button class="save" type="primary" @click="save">保存</mt-button>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import dateRange from '@/components/dateRange'
import { mapGetters, mapMutations } from 'vuex'
import * as Auth from '@/utils/auth'

export default {
  name: 'BillInfoDetal',
  components: {
    navTitle,
    dateRange
  },
  data () {
    return {
      type: '',
      title: '结算信息',
      path: 'chooseBillType',
      ifShowAccount: false,
      payAccount: [],
      copyAccount: [],
      checkTypeList: [],
      businessAccount: {},
      bill: {
        'PAY': {},
        'CASH': {},
        'BUSINESS': {},
        'CHECK': {}
      }
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'reimburseBillInfo'])
  }, // 获取报销单模版信息
  created () {
    this.type = this.$route.query.type
    this.name = this.$route.query.name
    const billType = Auth.getStorage('billType')
    let obj = {}
    let url = ''
    switch (this.type) {
      case 'PAY':
        // 获取已有的转账账户
        url = 'getCurrentAccount'
        break
      case 'BUSINESS':
        // 获取现有的公务卡账户
        obj = {
          billType: billType,
          infoId: 'V_REC_ACC_CARD'
        }
        url = 'getBusinessAccount'
        break
      case 'CHECK':
        obj = {
          billType: billType,
          infoId: 'CHEQUE_KIND',
          settlementTypeCode: 'CHECK'
        }
        url = 'getCheckTypeList'
        break
      case 'CASH':
        obj = {
          billType: 'EXP_TRIP',
          infoId: 'DR_CR',
          settlementTypeCode: 'CASH'
        }
        url = 'getCashTypeList'
    }
    this.$store.dispatch(url, obj).then((account) => {
      if (this.type === 'PAY' || this.type === 'BUSINESS') {
        this.payAccount = account
        this.copyAccount = account
      } else {
        this.checkTypeList = account
      }
    })
    // 判断store里是否存储结算信息，如果有则渲染
    if (this.$route.query.obj && JSON.parse(this.$route.query.obj)) {
      this.path = 'reimburseDetail'
      this.bill[this.type] = JSON.parse(this.$route.query.obj)
      delete this.bill[this.type].name // 删除多余的字段
    }
  },
  methods: {
    ...mapMutations(['SETBILLINFO', 'CHANGEBILLINFO']),
    focusAccount () {
      const recAccName = this.bill[this.type]['recAccName']
      this.ifShowAccount = true
      if (!recAccName) {
        this.payAccount = this.copyAccount
      } else {
        this.fuzzyMatch(recAccName)
      }
    },
    blurAccount (e) {
      this.ifShowAccount = false
    },
    inputAccount (str) {
      this.ifShowAccount = true
      const recAccName = this.bill[this.type]['recAccName']
      this.fuzzyMatch(recAccName)
    },
    // 模糊匹配
    fuzzyMatch (recAccName) {
      this.payAccount = []
      this.copyAccount.forEach(ele => {
        switch (this.type) {
          case 'PAY': if (ele.bankAccName.match(recAccName)) this.payAccount.push(ele); break
          case 'BUSINESS': if (ele.recAccName.match(recAccName)) this.payAccount.push(ele); break
        }
      })
    },
    chooseAccount (item) {
      switch (this.type) {
        case 'PAY':
          this.bill[this.type].recAccName = item.bankAccName
          this.bill[this.type].recAccNo = item.bankAccCode
          this.bill[this.type].recBanknodeName = item.banknodeName
          break
        case 'BUSINESS':
          this.bill[this.type].recAccName = item.recAccName
          this.bill[this.type].recAccNo = item.recAccNo
      }
      this.ifShowAccount = false
    },
    changeTime (obj) {
      Object.assign(this.bill[this.type], obj)
    },
    save () {
      const obj = this.reimburseTmpInfo.setTypeInfo[this.type]
      // 遍历模版信息，判断必填项是否填写完毕，否则弹窗
      let flag = true
      obj.forEach(item => {
        if (item.isNotEmpty === 'Y' && !this.bill[this.type][item.codeStr]) {
          this.$message('提示', `请输入${item.stInfoName}`)
          flag = false
        }
      })
      if (flag) {
        // 根据地址栏数据是否传对象，判断是新增还是更新,如果是更新，需要传更新的下标
        if (this.$route.query.obj && JSON.parse(this.$route.query.obj)) {
          this.CHANGEBILLINFO({
            data: this.bill[this.type],
            type: this.type,
            info: 'settlement',
            index: this.$route.query.index
          })
        } else {
          this.SETBILLINFO({ data: this.bill[this.type], type: this.type, info: 'settlement' })
        }
        this.$router.push({ path: 'reimburseDetail' })
      }
    }
  }
}
</script>
<style lang="scss">
  .bill-detail-wrapper {
    padding-top: 132px;
    background: #fff;
    .line-1px::before {
      border: none;
      border-bottom: 1px solid #eee;
    }
    .bill-item {
      width: 686px;
      padding: 18px 0;
      background: #fff;
      margin: 0 auto;
      .item-label {
        width: 210px;
        margin-right: 20px;
        font-weight: 400;
        color: #666;
        font-size: 32px;
      }
      .item-content {
        position: relative;
        .input, .check-type, .billDate {
          display: inline-block;
          width: 456px;
          height: 48px;
          text-align: right;
          background: #fff;
          outline: none;
          border: none;
          color: #333;
          font-size: 32px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          z-index: 100;
        }
        .check-type {
          direction: rtl;
        }
        .pay-account {
          padding: 10px 0;
          background: #eee;
          position: absolute;
          right: 0px;
          top: 50px;
          z-index: 1000;
          text-align: right;
          .account-name {
            width: 340px;
            height: 40px;
            padding: 10px 30px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .save {
      position: fixed;
      left: 32px;
      bottom: 88px;
      width: 686px;
      height: 90px;
      border-radius: 45px;
      font-size: 36px;
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .bill-detail-wrapper {
      padding-top: calc(88px + constant(safe-area-inset-top));
      padding-top: calc(88px + env(safe-area-inset-top));
    }
  }
</style>
