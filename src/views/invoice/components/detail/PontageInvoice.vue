<template>
  <div class="pontage-wrapper detail-wrapper">
    <nav-title :title="title" :path="path" :save="!readonly" @saveInvoice="saveInvoice(list)"></nav-title>
    <tag :tagName="list.tagName || ''" :fromPath="fromPath" :ifChange="!readonly"></tag>
    <div class="invoice">
      <div class="seal-outer">
        <div class="seal-inter"></div>
      </div>
      <div class="invoice-title">{{invoiceTitle}}</div>
      <div class="invoice-company">{{invoiceCompany}}</div>
      <div class="invoice-label">{{invoiceLabel}}</div>
      <div>
        <div class="passages">
          <div class="flex item">
            <div v-if="list.departCity" class="depart-card">
              <div class="depart">入口</div>
              <input class="input" v-model="list.departCity" :readonly="readonly">
            </div>
            <div v-if="list.arriveCity" class="arrive-card">
              <div class="arrive">出口</div>
              <input class="input" v-model="list.arriveCity" :readonly="readonly">
            </div>
          </div>
          <div v-if="list.totalAmount || list.totalAmount !==undefined" class="flex item">
            <mt-field label="金额" v-model="list.totalAmount" :readonly="readonly"></mt-field>
            <!-- <mt-field v-if="" label="车型" :readonly="readonly"></mt-field> -->
          </div>
          <div v-if="list.invoiceDate || list.invoiceDate !==undefined" class="date-card">
            <div style="date-label">日期</div>
            <date-range class="date" :readonly="readonly" :count="1" :default="list.invoiceDate" :datestr="dateStr" @changeTime="changeTime"/>
            <!-- <mt-field v-if="" label="工号" :readonly="readonly"></mt-field> -->
          </div>
        </div>
        <mt-field v-if="list.invoiceCode || list.invoiceCode !==undefined" label="发票代码" v-model="list.invoiceCode" :readonly="readonly"></mt-field>
        <mt-field v-if="list.invoiceNo || list.invoiceNo !==undefined" label="发票号码" v-model="list.invoiceNo" :readonly="readonly"></mt-field>
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
import tag from '@/components/tag'
import navTitle from '@/components/navTitle'
import showPicture from '@/components/showPicture'
import { invoice } from '@/utils/mixin.js'
import dateRange from '@/components/dateRange'
export default {
  name: 'PontageInvoice',
  components: {
    navTitle,
    tag,
    showPicture,
    dateRange
  },
  mixins: [invoice],
  data () {
    return {
      readonly: false,
      isShowPicture: false,
      title: '通行费',
      invoiceTitle: '北京市税务局过路(过桥)费专用发票',
      invoiceCompany: '北京市首都公路发展集团有限公司',
      invoiceLabel: '发票联',
      path: 'invoice',
      fromPath: 'PontageInvoice',
      dateStr: 'invoiceDate',
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
.pontage-wrapper {
  .invoice {
    position: relative;
    .seal-outer {
      position: absolute;
      top: 35px;
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
    font-family: FangSong;
    font-weight: 200;
    text-align: center;
    color: #8F221A;
    padding: 36px 0 8px 0;
    font-size: 36px;
  }
  .invoice-company {
    text-align: center;
    color:#8F221A;
    font-weight: 400;
    font-size: 32px;
    margin-bottom: 8px;
  }
  .invoice-label {
    text-align: center;
    color:#8F221A;
    font-weight: 500;
    font-size: 32px;
  }
  .passages {
    margin-top: 20px;
    .depart-card, .arrive-card {
      margin: 0 32px;
      width: 277px;
      .depart, .arrive {
        color: #333;
        height: 50px;
      }
    }
    .input {
      width: 277px;
      border: none;
      color: #666;
      font-size: 32px;
    }
    .date-card {
      margin: 0 32px;
      font-size: 32px;
      line-height: 90px;
      display: flex;
      .date-label {
        font-size: 16px;
        color: #666;
      }
      .invoiceDate {
        margin-left: 32px;
        font-size: 32px;
        color: #666;
        border: none;
      }
    }
    .item {
      line-height: 90px;
    }
  }
  .mint-cell {
    min-height: 90px;
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
