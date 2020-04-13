<template>
  <div class="choose-relate-doc">
    <nav-title :title="title" :path="path"></nav-title>
    <div class="relate-doc-list">
      <div class="relate-doc flex" v-for="(item, index) in list" :key="item.id">
        <label class="mint-checklist-label">
          <span class="mint-checkbox">
            <input type="checkbox"
              :value="index"
              v-model="checkboxModal"
              class="mint-checkbox-input"
              @click="choose(index)">
            <span class="mint-checkbox-core"/>
          </span>
        </label>
        <div>
          <div>
            <!-- 请款单/事项申请单/借款单/采购信息/合同 -->
            <span class="bill-type">
              {{ item.applyBillTypeName || item.loanBillTypeName || item.billTypeName || item.planName || item.contractName }}
            </span>
            <span class="billl-num">
              {{ item.applyBillNo || item.loanBillNo || item.billNo || item.planCode || item.contractCode }}
            </span>
          </div>
          <div class="remark">{{ item.applyReason || item.reason || item.loanReason || item.planContent }}</div>
          <div class="flex">
            <!-- 请款单/事项申请单/借款单/采购信息/合同 -->
            <div class="money-num">
              <span>申请金额</span><br/>
              <span>¥{{ Number(item.billMoney || item.planAmount)|numFormat }}</span>
            </div>
            <div class="money-num">
              <span>可用余额</span><br/>
              <span>¥{{ Number(item.balAmt || item.planBalance || item.payableAmount)|numFormat }}</span>
            </div>
          </div>
          <div class="flex usedmoney">
            <span><i class="iconfont icon-bianji1"></i>本次使用金额</span>
            <div class="input-box">¥<input type="text" v-model="item.usedMoney" @click.stop="preventEve"></div>
          </div>
        </div>
      </div>
      <div class="noInfo" v-if="!list.length">
        <img src="@/assets/images/nodata.png" alt="">
        <p>暂无可选择的{{title}}</p>
      </div>
    </div>
    <div class="tab-wrapper flex">
      <label class="mint-checklist-label">
        <span class="mint-checkbox">
          <input type="checkbox"
            v-model="isChoosed"
            class="mint-checkbox-input">
          <span class="mint-checkbox-core"/>
        </span>
        <span class="mint-checkbox-label">已选{{count}}</span>
      </label>
      <div>
        <mt-button type="default" class="btn btn-confirm" @click="confirm">确认</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import { mapGetters, mapMutations } from 'vuex'
import { billList } from '@/utils/global'

export default {
  name: 'ChooseRelateDoc',
  components: {
    navTitle
  },
  data () {
    return {
      title: '',
      path: 'reimburseDetail',
      count: 0,
      isChoosed: false,
      list: [],
      checkboxModal: [],
      titleList: {
        'APPLY': '请款信息',
        'LOAN': '借款信息',
        'FA_CARD': '资产卡片',
        'FACARD': '资产卡片',
        'MAINTENANCE': '维修申请',
        'CONTRACT': '合同信息',
        'PURCHASE': '采购信息',
        'APPLY_ITEM': '事项申请'
      },
      codeList: {
        'LOAN': 'loanBillNo',
        'CONTRACT': 'contractCode',
        'PURCHASE': 'planCode',
        'APPLY_ITEM': 'billNo',
        'APPLY': 'applyBillNo'
      }
    }
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'reimburseBillInfo'])
  },
  watch: {
    isChoosed () {
      this.count = this.isChoosed ? this.list.length : 0
      this.checkboxModal = this.isChoosed ? Array.from({ length: this.list.length }, (v, k) => k) : []
    }
  },
  created () {
    this.title = this.titleList[this.$route.query.infoId]
    this.infoId = this.$route.query.infoId === 'FACARD' ? 'FA_CARD' : this.$route.query.infoId
    this.$store.dispatch('getRelateBill', { infoId: this.infoId, billType: this.$route.query.billType }).then((data) => {
      this.list = data.refListData
      // 遍历单据列表数据，同时遍历store找到匹配的数据并选中
      if (this.reimburseBillInfo[billList[this.infoId]]) {
        this.reimburseBillInfo[billList[this.infoId]].forEach((item1) => {
          this.list.forEach((item, index) => {
            if (item[this.codeList[this.infoId]] === item1[this.codeList[this.infoId]]) {
              item.usedMoney = item1.usedMoney
              this.checkboxModal.push(index)
              this.count = this.checkboxModal.length
            }
          })
        })
      }
    })
  },
  methods: {
    ...mapMutations(['SETBILLINFO']),
    /**
     * 多选更改数组的值
     */
    choose (index) {
      if (!this.checkboxModal.includes(index)) {
        this.checkboxModal.push(index)
      } else {
        this.checkboxModal.splice(this.checkboxModal.findIndex(v => v === index), 1)
      }
      this.count = this.checkboxModal.length
      this.isChoosed = this.checkboxModal.length === this.list.length
    },
    confirm () {
      if (!this.checkboxModal.length) {
        this.$message('提示', '请选择关联单据')
        return false
      }
      const list = []
      let flag = true
      this.checkboxModal.forEach(item => {
        if (!this.list[item].usedMoney) {
          flag = false
          this.$message('提示', `请输入关联单据的使用金额`)
          return
        }
        list.push(this.list[item])
      })
      if (!flag) return false
      this.SETBILLINFO({ data: list, type: 'relate', info: 'relate', infoId: this.infoId })
      this.$router.push({ path: 'reimburseDetail' })
    },
    preventEve () {}
  }
}
</script>
<style lang="scss">
  .choose-relate-doc {
    .relate-doc-list {
      margin-top: 132px;
      height: calc(100vh - 220px);
      overflow-y: scroll;
    }
    .flex {
      align-items: flex-start;
    }
    .noInfo {
      text-align: center;
      margin-top: 200px;
      background-size: 100% 100%;
      img {
        width: 314px;
        height: 242px;
      }
    }
    .tab-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100px;
      padding: 27px 32px 0;
      background: #fff;
      box-shadow: 1px -2px 10px 0px rgba(0,0,0,0.2);
      .btn-confirm {
        width: 200px;
        height: 63px;
        border-radius: 63px;
        font-size: 32px;
        background: #fff;
        box-shadow: none;
        border: 1px solid #3596FA;
        color: #3596FA;
      }
    }
    .relate-doc {
      background: #fff;
      margin-bottom: 20px;
      padding: 24px 46px 24px 22px;
      .bill-type {
        display: inline-flex;
        padding: 5px 20px;
        font-size: 28px;
        color: #3596FA;
        background: rgba(74,144,226, .1);
        margin-right: 16px;
      }
      .remark {
        margin: 24px 0;
      }
      .money-num {
        width: 300px;
        background: #F3F3F3;
        padding: 14px 0;
        border-radius: 10px;
        text-align: center;
        color: #666;
        &:first-child {
          margin-right: 20px;
        }
        span:first-child {
          font-size: 28px;
        }
        span:nth-child(3) {
          font-size: 32px
        }
      }
      .usedmoney {
        margin-top: 40px;
        font-size: 32px;
        .input-box {
          width: 250px;
        }
        input {
          width: 210px;
          outline: none;
          font-size: 32px;
        }
      }
    }
    .mint-checklist-label {
      padding: 0;
    }
    .mint-checkbox-core {
      width: 40px;
      height: 40px;
      margin-right: 22px;
    }
    .mint-checkbox-input:checked + .mint-checkbox-core::after {
      width: 18px;
      height: 10px;
      left: 10px;
      top: 12px;
      transform: rotate(-45deg) scale(-1, 1)
    }
    @supports (bottom: env(safe-area-inset-bottom)){
      .relate-doc-list {
        height: calc(100vh - 220px - constant(safe-area-inset-bottom) - constant(safe-area-inset-top));
        height: calc(100vh - 220px - env(safe-area-inset-bottom) - env(safe-area-inset-top));
        margin-top: calc(88px + constant(safe-area-inset-top));
        margin-top: calc(88px + env(safe-area-inset-top));
      }
      .tab-wrapper {
        height: calc(100px + constant(safe-area-inset-bottom));
        height: calc(100px + env(safe-area-inset-bottom));
      }
    }
  }
</style>
