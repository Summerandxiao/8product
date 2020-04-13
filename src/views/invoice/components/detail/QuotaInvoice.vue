<template>
  <div class="quota-wrapper detail-wrapper">
    <nav-title :title="title" :path="path" :save="!readonly" @saveInvoice="saveInvoice(list)"></nav-title>
    <tag :tagName="list.tagName || ''" :fromPath="fromPath" :ifChange="!readonly"></tag>
    <div class="invoice">
      <div class="seal-outer">
        <div class="seal-inter"></div>
      </div>
      <div class="invoice-title">{{invoiceTitle}}</div>
      <div class="invoice-label">{{invoiceLabel}}</div>
      <div class="detail-item">
        <mt-field
          label="发票代码"
          v-if="list.invoiceCode || list.invoiceCode !==undefined"
          v-model="list.invoiceCode"
          :readonly="readonly"></mt-field>
        <mt-field
          label="发票号码"
          v-if="list.invoiceNo || list.invoiceNo !==undefined"
          v-model="list.invoiceNo"
          :readonly="readonly"></mt-field>
        <mt-field
          label="发票金额"
          v-if="list.totalAmount || list.totalAmount !==undefined"
          v-model="list.totalAmount"
          :readonly="readonly"></mt-field>
        <!-- <mt-field label="信息码" v-model="list" :readonly="readonly"></mt-field> -->
        <!-- <mt-field label="入场时间" v-model="list" :readonly="readonly"></mt-field> -->
        <!-- <mt-field label="出场时间" v-model="list" :readonly="readonly"></mt-field> -->
        <div v-if="readonly" class="line-1px"></div>
        <div v-if="readonly" class="flex show-invoice" @click="showPicture()">
          <label class="check-invoice">查看发票</label>
          <i class="iconfont icon-icon-angle-right"></i>
        </div>
        <showPicture :isShowPicture="isShowPicture" @hide="hide"></showPicture>
      </div>
      <div class="flex bubble-wrapper">
        <div v-for="item in buble" :key="item" class="bubble"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Auth from '@/utils/auth'
import navTitle from '@/components/navTitle'
import { invoice } from '@/utils/mixin.js'
import tag from '@/components/tag'
import showPicture from '@/components/showPicture'
export default {
  name: 'QuotaInvoice',
  components: {
    navTitle,
    tag,
    showPicture
  },
  mixins: [invoice],
  data () {
    return {
      readonly: false,
      isShowPicture: false,
      path: 'invoice',
      fromPath: 'QuotaInvoice',
      dateStr: 'invoiceDate',
      title: '定额发票',
      invoiceTitle: '北京市税务局定额专用发票',
      invoiceLabel: '发票联',
      buble: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      list: {}
    }
  },
  mounted () {
    if (this.$route.query.id) this.readonly = true
    this.list = JSON.parse(Auth.getStorage('invoiceDetail'))
    if (this.$route.query && this.$route.query.tagName) {
      this.list.tagName = this.$route.query.tagName
      this.list.tagId = this.$route.query.tagId
    }
  },
  methods: {
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
.quota-wrapper {
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
  .detail-item {
    margin-top: 32px;
  }
  .show-invoice{
    margin:27px 32px 0;
    .check-invoice{
      font-size:32px;
    }
    .iconfont{
      font-size:24px;
    }
  }
}
</style>
