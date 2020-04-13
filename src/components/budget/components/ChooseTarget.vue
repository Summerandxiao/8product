<template>
  <div class="choose-target-wrapper">
    <nav-title :title="title"></nav-title>
    <div class="target-list">
      <div v-if="isFromPro" class="flex">
        <tree-select
          v-model="pro"
          placeholder='项目名称'
          :multiple="false"
          :searchable="true"
          :normalizer="normalizer"
          :options="optsPro"
          @input="changePro()"
          class="tree"/>
      </div>
      <div v-if="list.length">
        <div class="target flex" v-for="(item, index) in list" :key="item.id">
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
              <span class="bill-type">指标编码</span>
              <span class="bill-num">{{item.bgItemCode}}</span>
            </div>
            <div class="remark">{{ item.projectCode }}</div>
            <div class="flex">
              <div class="money-num">
                <span>指标总额</span><br/>
                <span>¥{{ Number(item.bgItemCur)}}</span>
              </div>
              <div class="money-num">
                <span>可用余额</span><br/>
                <span>¥{{ Number(item.bgItemBalanceCur)|numFormat }}</span>
              </div>
            </div>
            <div class="flex usedmoney">
              <span><i class="iconfont icon-bianji1"></i>本次使用金额</span>
              <div class="input-box">¥<input type="text" v-model="item.usedMoney" @click.stop="preventEve"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="noInfo" v-if="!list.length">
        <img src="@/assets/images/nodata.png" alt="">
        <p>该项目暂无配置指标</p>
      </div>
    </div>
    <div class="tab-wrapper flex">
      <label v-if="list.length" class="mint-checklist-label">
        <span class="mint-checkbox">
          <input type="checkbox"
            v-model="isChoosed"
            class="mint-checkbox-input">
          <span class="mint-checkbox-core"/>
        </span>
        <span class="mint-checkbox-label">已选{{count}}</span>
      </label>
      <div>
        <mt-button type="default" class="btn btn-confirm" @click="cancel">返回</mt-button>
        <mt-button v-if="list.length" type="default" class="btn btn-confirm" @click="confirm">确认</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import navTitle from '@/components/navTitle'
import { mapMutations, mapGetters } from 'vuex'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import * as Auth from '@/utils/auth'

export default {
  name: 'ChooseTarget',
  components: {
    navTitle,
    TreeSelect
  },
  data () {
    return {
      title: '预算指标',
      isChoosed: false,
      isFromPro: false,
      count: 0,
      list: [],
      checkboxModal: [],
      pro: null,
      optsPro: [],
      queryProObj: {}
    }
  },
  computed: {
    ...mapGetters(['reimburseBillInfo'])
  },
  watch: {
    isChoosed () {
      this.count = this.isChoosed ? this.list.length : 0
      this.checkboxModal = this.isChoosed ? Array.from({ length: this.list.length }, (v, k) => k) : []
    }
  },
  created () {
    if (this.$route.query.list) { // 表示通过通过点击预算指标进入
      this.list = JSON.parse(this.$route.query.list)
    } else {
      this.isFromPro = true
      this.queryProObj = JSON.parse(this.$route.query.obj)
      this.$store.dispatch('getProInfo', {
        infoId: 'PROJECT',
        appId: this.queryProObj.appId,
        userId: this.queryProObj.userId }).then((data) => {
        this.optsPro = data.refListData
      })
    }
  },
  methods: {
    ...mapMutations(['SETBILLINFO']),
    changePro () {
      const obj = {
        projectCode: this.pro,
        departmentCode: this.queryProObj.departmentCode,
        tabName: 'v_bg_balance_detail',
        billType: this.$route.query.billType || Auth.getStorage('billType')
      }
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
        }
        this.list = arr
      })
    },
    normalizer (node) {
      // 去掉children=[]的children属性映射进treeselect数组
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.projectCode,
        label: node.projectName,
        children: node.children
      }
    },
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
        this.$message('提示', '请选择预算指标')
        return false
      }
      const list = []
      let flag = true
      this.checkboxModal.forEach(item => {
        if (!this.list[item].usedMoney) {
          flag = false
          this.$message('提示', `请输入预算指标的使用金额`)
          return
        }
        list.push(this.list[item])
      })
      if (!flag) return false
      this.SETBILLINFO({ data: list, type: 'balance', info: 'balance' })
      this.$router.push({ path: 'reimburseDetail' })
    },
    cancel () {
      this.$router.push({ path: 'reimburseDetail' })
    },
    preventEve () {}
  }
}
</script>
<style lang="scss">
  .choose-target-wrapper {
    width: 100Vw;
    height: 100vh;
    background: #F3F3F3;
    .target-list {
      margin-top: 132px;
      height: calc(100vh - 120px);
      overflow-y: scroll;
      .tree {
        width: 100vw;
        margin-bottom: 20px;
        .vue-treeselect__control {
          width: 100vw;
          height: 100px;
        }
        .vue-treeselect__single-value, .vue-treeselect__placeholder {
          line-height: 100px;
          text-align: center
        }
        .vue-treeselect__x-container {
          display: none;
        }
      }
    }
    .flex {
      align-items: flex-start;
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
        margin-left: 20px;
        border: 1px solid #3596FA;
        color: #3596FA;
      }
    }
    .target {
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
    .noInfo {
      text-align: center;
      margin-top: 200px;
      img {
        width: 314px;
        height: 242px;
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
      .target-list {
        height: calc(100vh - 120px - constant(safe-area-inset-bottom) - constant(safe-area-inset-top));
        height: calc(100vh - 120px - env(safe-area-inset-bottom) - env(safe-area-inset-top));
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
