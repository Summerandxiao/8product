<template>
  <div class="card-wrapper">
    <div class="card"  @click="toDetail(data.invoiceType, data)">
      <div class="flex first-line">
        <div>
          <div :class="setClass(data.invoiceType)">{{ invoiceType[data.invoiceType] || '其它发票' }}</div>
          <span v-if="data.invoiceDate" class="invoice-date">{{ data.invoiceDate | toDate }}</span>
        </div>
        <span>{{ checkState[data.checkState] }}</span>
      </div>
      <p class="invoice-content">{{ data.invoiceGoodName }}</p>
      <div class="flex">
        <span class="saler-name">{{ data.salerName }}</span>
        <span class="invoice-amount">¥{{ data.totalAmount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { invoiceType, checkState } from '@/utils/global.js'
import * as Auth from '@/utils/auth'
export default {
  name: 'card',
  props: ['list', 'data'],
  data () {
    return {
      lists: [],
      colorList: {
        1: 'primary',
        2: 'success',
        3: 'warning',
        4: 'green'
      },
      subStatusText: {
        1: '未提交',
        2: '审批中',
        3: '已审批'
      }
    }
  },
  created () {
    this.invoiceType = invoiceType
    this.checkState = checkState
    this.lists = this.list
  },
  methods: {
    setClass (invoiceType) {
      let setClassName = ''
      switch (invoiceType) {
        case '01': setClassName = `invoice-type ${this.colorList[1]}`; break
        case '04': case '10': case '11': setClassName = `invoice-type ${this.colorList[2]}`; break
        case '95': case '00': case '24': setClassName = `invoice-type ${this.colorList[3]}`; break
        case '91': case '92': case '93': case '98': setClassName = `invoice-type ${this.colorList[4]}`; break
        default: setClassName = `invoice-type ${this.colorList[1]}`; break
      }
      return setClassName
    },
    left (index) {
      this.lists[index].isHide = false
      this.isHide = false
    },
    right (index) {
      this.isHide = true
    },
    toDetail (invoiceType, data) {
      Auth.setStorage('invoiceDetail', JSON.stringify(data))
      let toPath = ''
      switch (invoiceType) {
        case '01': case '04': case '10': case '11': toPath = 'OrdinaryVATInvoice'; break
        case '91': toPath = 'taxiFare'; break
        case '92': toPath = 'trainTicket'; break
        case '93': toPath = 'airTicket'; break
        case '24': toPath = 'quotaInvoice'; break
        case '98': toPath = 'pontageInvoice'; break
        default: toPath = 'otherInvoice'; break
      }
      this.$router.push({ path: toPath, query: { id: data.id } })
    }
  }
}
</script>

<style lang="scss">
$size28: 28px;
$size32: 32px;
.card-wrapper {
  .card {
    width: 662px;
    background: #fff;
    padding: 30px 24px;
    border-radius: 10px;
    font-family: MicrosoftYaHei;
    color: #333;
    margin: 0 auto;
    .invoice-content {
      text-align: left;
    }
    .first-line {
      font-size: $size28;
      .invoice-type {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        padding: 0px 20px;
        height: 40px;
        justify-content: center;
        font-size: $size28;
      }
    }
    .invoice-date, .saler-name {
      color: #666;
      font-size: 28px;
    }
    .invoice-content, .invoice-amount {
      font-size: $size32;
      color: #333;
    }
    .primary {
      color: #4A90E2;
      background: rgba(74,144,226, .1);
    }
    .warning {
      color: #FF9C00;
      background:rgba(255,156,0,.1);
    }
    .success {
      color: #7DAC4F;
      background:rgba(126,211,33,.1);
    }
    .green {
      color: #33CC99;
      background:#EAF9F4;
    }
  }
}
</style>
