<template>
  <div class="budget-wrapper">
    <div v-if="show" class="reimburse-detail-module">
      <div class="title flex">指标信息
        <div class="total-card">
          <span class="total-money" v-if="billMoney!=0">¥{{ Number(billMoney)|numFormat }}</span>
          <span class="total-money" v-else>¥0.00</span>
        </div>
      </div>
      <router-link
        v-for="(item,index) in reimburseBillInfo.arBillBalanceList" :key="item.id"
        :to="{ name: 'changeTarget', query: { data: JSON.stringify(item), index } }"
        class="line-1px">
          <div class="item flex line-1px">
            <div>{{item.projectCode}}</div>
            <div>
              <span>¥{{ Number(item.usedMoney)|numFormat }}</span>
              <i class="iconfont icon-icon-angle-right"></i>
            </div>
          </div>
      </router-link>
      <div class="btn-group">
        <mt-button class="budget-btn" type="primary" @click="choosePro">选择项目</mt-button>
        <mt-button class="budget-btn" type="primary" @click="chooseTarget">选择指标</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as Auth from '@/utils/auth'
import { watchTmp } from '@/utils/mixin.js'

export default {
  name: 'budget',
  mixins: [watchTmp],
  data () {
    return {
      show: false,
      departmentCode: '',
      appId: '',
      billMoney: 0
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'reimburseBillInfo'])
  },
  watch: {
    reimburseBillInfo () {
      this.fillMoney()
    }
  },
  mounted () {
    this.$root.Bus.$on('changeAppId', obj => {
      this.appId = obj.appId
      this.departmentCode = obj.orgCode
    })
    this.fillMoney()
  },
  beforeDestroy () {
    this.$root.Bus.$off('changeAppId')
  },
  methods: {
    fillMoney () {
      if (this.reimburseBillInfo.arBillBalanceList) {
        this.reimburseBillInfo.arBillBalanceList.forEach((item) => {
          this.billMoney += Number(item.usedMoney)
        })
      }
    },
    fillData () {
      this.reimburseTmpInfo.areaLeft.forEach(item => {
        if (item.areaType === 'BUDGET') this.show = true
      })
    },
    // 选择项目之后，调用关联指标接口
    changePro () {
      this.showPro = false
      const obj = {
        projectCode: this.pro,
        departmentCode: this.departmentCode,
        tabName: 'v_bg_balance_detail',
        billType: this.$route.query.billType || Auth.getStorage('billType')
      }
      this.getTargets(obj)
    },
    // 直接选择关联指标
    chooseTarget () {
      const obj = {
        projectCode: '',
        departmentCode: this.departmentCode,
        tabName: 'v_bg_balance_detail',
        billType: this.$route.query.billType || Auth.getStorage('billType')
      }
      this.getTargets(obj)
    },
    choosePro () {
      // 获取项目数据下拉树
      const obj = {
        infoId: 'PROJECT',
        appId: this.appId, // 报销人需要使用
        userId: JSON.parse(Auth.getStorage('userInfo')).user_code, // 经办人
        departmentCode: this.departmentCode
      }
      this.$router.push({ path: 'choosetarget', query: { obj: JSON.stringify(obj) } })
    },
    getTargets (obj) {
      // 获取对应的指标
      this.$store.dispatch('getTargets', obj).then((data) => {
        let arr = []
        if (data.length) {
          if (this.reimburseBillInfo.arBillBalanceList && this.reimburseBillInfo.arBillBalanceList.length) {
            data.forEach(val => {
              this.reimburseBillInfo.arBillBalanceList.forEach((ele) => {
                if (val.projectCode !== ele.projectCode) arr.push(val)
              })
            })
          }
          this.$router.push({ path: 'chooseTarget', query: { list: JSON.stringify(arr) } })
        } else {
          this.$message('提示', '预算指标数据为空')
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .budget-wrapper {
    .btn-group {
      padding-bottom: 20px;
    }
    .item {
      height: 100px;
      color: #333;
    }
    .budget-btn {
      width: 200px;
      height: 50px;
      margin: 10px 20px;
      line-height: 50px;
      font-size: 32px;
    }
  }
</style>
