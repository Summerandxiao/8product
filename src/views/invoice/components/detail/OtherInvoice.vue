<template>
  <div class="detail-wrapper other-invoice">
    <nav-title :title="title" :path="path" :save="!readonly" @saveInvoice="saveInvoice(list)"></nav-title>
    <tag :tagName="list.tagName || ''" :fromPath="fromPath" :ifChange="!readonly"></tag>
    <div class="invoice">
      <div class="seal-outer">
        <div class="seal-inter"></div>
      </div>
      <div class="invoice-title">{{invoiceTitle}}</div>
      <div class="invoice-label">{{invoiceLabel}}</div>
      <div class="invoice-date">
        <span class="label-date">开票日期</span>
        <date-range v-if="list.invoiceDate!==undefined" :readonly="readonly" :count="1" :datestr="dateStr" :default="list.invoiceDate" @changeTime="changeTime"/>
      </div>
      <mt-field label="发票代码" v-model="list['invoiceCode']" :readonly="readonly"></mt-field>
      <mt-field label="发票号码" v-model="list['invoiceNo']" :readonly="readonly"></mt-field>
      <mt-field label="发票金额" v-model="list['totalAmount']" :readonly="readonly"></mt-field>
      <div v-if="readonly" class="line-1px"></div>
      <div v-if="readonly" class="flex show-invoice" @click="showPicture()">
        <label class="check-invoice">查看发票</label>
        <i class="iconfont icon-icon-angle-right"></i>
      </div>
      <showPicture :isShowPicture="isShowPicture" @hide="hide"></showPicture>
      <div class="flex bubble-wrapper">
        <div v-for="item in buble" :key="item" class="bubble"></div>
      </div>
    </div>
  </div>
</template>

<script>
import tag from '@/components/tag'
import navTitle from '@/components/navTitle'
import { invoice } from '@/utils/mixin.js'
import showPicture from '@/components/showPicture'
import * as Auth from '@/utils/auth'
import dateRange from '@/components/dateRange'

export default {
  name: 'OtherInvoice',
  components: {
    tag,
    navTitle,
    dateRange,
    showPicture
  },
  mixins: [invoice],
  data () {
    return {
      list: {},
      title: '其他发票',
      invoiceTitle: '通用发票',
      invoiceLabel: '发票联',
      path: 'invoice',
      fromPath: 'OtherInvoice',
      dateStr: 'dateOfIssue',
      readonly: false,
      isShowPicture: false
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.readonly = true
      this.$store.dispatch('getInvoiceDetailById', this.$route.query.id).then((res) => {
        this.list = res
        this.initData()
      })
    } else {
      this.list = JSON.parse(Auth.getStorage('invoiceDetail'))
      this.initData()
    }
  },
  methods: {
    initData () {
      if (this.$route.query && this.$route.query.tagName) {
        this.list.tagName = this.$route.query.tagName
        this.list.tagId = this.$route.query.tagId
      }
      // 先用正则将日期中的年月日匹配掉然后显示
      if (this.list.invoiceDate) this.list.invoiceDate = this.list.invoiceDate.replace(/[\u4e00-\u9fa5]/g, '').replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
    },
    changeTime (obj) {
      Object.assign(this.list, obj)
    },
    showPicture () {
      this.isShowPicture = true
    },
    hide () {
      this.isShowPicture = false
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/invoiceDetail.scss';
  .other-invoice {
    .invoice {
      position: relative;
      .seal-outer {
        position: absolute;
        top: 25px;
        left: 245px;
        width: 180px;
        height: 98px;
        border: 5px solid rgba(254,160,153,0.6);
        border-radius: 50%;
      }
      .seal-inter {
        width: 162px;
        height: 82px;
        border: 3px solid rgba(254,160,153,0.3);
        border-radius: 50%;
        margin: 5.5px auto;
      }
    }
    .invoice-title {
      font-size: 32px;
      color: #8F221A;
      padding: 40px 0 8px 0;
      text-align: center;
      font-weight: 400;
    }
    .invoice-label {
      text-align: center;
      color: #8F221A;
      font-weight: 500;
      font-size: 32px;
    }
    .label-date{
      display: inline-block;
      font-size: 32px;
      padding: 0 33px 0 30px;
      min-width: 135px;
    }
    .invoice-date {
      line-height: 100px;
    }
    .dateOfIssue {
      font-size: 32px;
      color: #666;
      border: none;
    }
    .show-invoice {
      margin: 27px 32px 0;
      .check-invoice{
        font-size: 32px;
      }
    }
  }
</style>
