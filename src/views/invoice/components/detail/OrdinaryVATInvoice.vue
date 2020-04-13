<template>
  <div class="ordinary-wrapper detail-wrapper">
    <nav-title :title="title" :path="path" :save="!readonly" @saveInvoice="saveInvoice(list)"></nav-title>
    <tag :tagName="list.tagName || ''" :fromPath="fromPath" :ifChange="!readonly"></tag>
    <div class="invoice">
      <div class="seal-outer">
        <div class="seal-inter"></div>
      </div>
      <div class="title">{{invoiceTitle}}</div>
      <div class="invoice-form">
        <div class="field-item">
          <!--开票方-->
          <mt-field label="开票方" v-model="list['salerName']" :readonly="readonly">
            <i :class="['iconfont',showSaler ? 'icon-icon-angle-bottom' : 'icon-icon-angle-right']" @click="changeArrow('showSaler')"></i>
          </mt-field>
          <div v-if="showSaler" class="inner">
            <mt-field v-if="list['salerTaxNo']!==undefined" label="纳税人识别号" v-model="list['salerTaxNo']" :readonly="readonly"></mt-field>
            <mt-field v-if="list['salerAddress']!==undefined" label="地址电话" v-model="list['salerAddress']" :readonly="readonly"></mt-field>
            <mt-field v-if="list['salerAcount']!==undefined" label="开户行账户"  v-model="list['salerAcount']"></mt-field>
          </div>
          <!--收票方-->
          <mt-field label="收票方"  v-model="list['buyerName']" :readonly="readonly">
            <i :class="['iconfont',showBuyer ? 'icon-icon-angle-bottom' : 'icon-icon-angle-right']" @click="changeArrow('showBuyer')"></i>
          </mt-field>
          <div v-if="showBuyer" class="inner">
            <mt-field v-if="list['buyerTaxNo']!==undefined" label="纳税人识别号" v-model="list['buyerTaxNo']" :readonly="readonly"></mt-field>
            <mt-field v-if="list['buyerAddress']!==undefined" label="地址电话" v-model="list['buyerAddress']" :readonly="readonly"></mt-field>
            <mt-field v-if="list['buyerAcount']!==undefined" label="开户行账户" v-model="list['buyerAcount']" :readonly="readonly"></mt-field>
          </div>
          <!--开票日期-->
          <div class="invoice-date">
            <span class="label-date">开票日期</span>
            <date-range v-if="list.invoiceDate!==undefined" :readonly="readonly" :count="1" :datestr="dateStr" :default="list.invoiceDate" @changeTime="changeTime"/>
          </div>
          <!--发票金额-->
          <mt-field label="发票金额" v-model="list['totalAmount']" :readonly="readonly">
            <i :class="['iconfont',showMoneyDetail ? 'icon-icon-angle-bottom' : 'icon-icon-angle-right']" @click="changeArrow('showMoneyDetail')"></i>
          </mt-field>
          <div v-if="showMoneyDetail" class="inner">
            <mt-field v-if="list['invoiceAmount']!==undefined" label="金额" v-model="list['invoiceAmount']" :readonly="readonly"></mt-field>
            <mt-field v-if="list['taxRate']!==undefined" label="税率" v-model="list['taxRate']" :readonly="readonly"></mt-field>
            <mt-field v-if="list['taxAmount']!==undefined" label="税额" v-model="list['taxAmount']" :readonly="readonly"></mt-field>
          </div>
          <div class="dotted-line-1px"></div>
          <!--发票内容-->
          <div v-if="list.detailList&&list.detailList.length">
            <mt-field label="发票内容" v-model="list.detailList[0]['goodName']" :readonly="readonly1">
              <i :class="['iconfont',showInvoiceContent ? 'icon-icon-angle-bottom' : 'icon-icon-angle-right']" @click="changeArrow('showInvoiceContent')"></i>
            </mt-field>
          </div>
          <div v-if="showInvoiceContent" class="invoice-content-wrapper">
            <ul class="table-header flex">
              <li v-for="(value1, key1) in tableHeader" :key="key1">{{value1}}</li>
            </ul>
            <div v-for="item in list['detailList']" :key="item.num" class="invoice-table">
              <div v-for="(value1, key1) in tableHeader" :key="key1" class="input-wrapper">
                <mt-field v-if="key1!=='taxRate'" v-model="item[key1]" :readonly="readonly"></mt-field>
                <mt-field v-else-if="key1==='taxRate'" v-model="item[key1]" :readonly="readonly"></mt-field>
              </div>
            </div>
          </div>
          <!--发票号码-->
          <mt-field label="发票号码" v-model="list['invoiceNo']" :readonly="readonly"></mt-field>
          <mt-field label="发票代码" v-model="list['invoiceCode']" :readonly="readonly"></mt-field>
        </div>
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
import navTitle from '@/components/navTitle'
import { invoice } from '@/utils/mixin.js'
import * as Auth from '@/utils/auth'
import showPicture from '@/components/showPicture'
import tag from '@/components/tag'
import dateRange from '@/components/dateRange'

export default {
  name: 'OrdinaryVATInvoice',
  components: {
    tag,
    navTitle,
    dateRange,
    showPicture
  },
  mixins: [invoice],
  data () {
    return {
      showSaler: false,
      showBuyer: false,
      showMoneyDetail: false,
      showInvoiceContent: false,
      readonly: false,
      readonly1: true,
      dateStr: 'invoiceDate',
      path: 'invoice',
      fromPath: 'OrdinaryVATInvoice',
      isShowPicture: false,
      title: '电子发票',
      invoiceTitle: '',
      buble: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      tableHeader: {
        goodName: '名称',
        detailAmount: '金额',
        taxRate: '税率',
        taxAmount: '税额'
      },
      list: {}
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
      switch (this.list.invoiceType) {
        case '01': this.invoiceTitle = '增值税专用发票'; break
        case '04': this.invoiceTitle = '增值税普通发票'; break
        case '10': this.invoiceTitle = '增值税普通发票( 电子)'; break
        case '11': this.invoiceTitle = '增值税普通发票( 卷式)'; break
      }
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
    changeArrow (param) {
      this[param] = !this[param]
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
  $bg-color: #eee;
  .ordinary-wrapper {
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
    .invoice-content-wrapper {
      width: 606px;
      padding: 20px;
      margin: 14px auto;
      background: $bg-color;
      font-size: 23px;
      .mint-cell .mint-cell-wrapper {
        padding: 0;
      }
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
    .invoiceDate {
      color: #666;
      font-size: 32px;
      border: none;
    }
    .inner {
      width: 630px;
      padding: 10px;
      margin: 0 20px;
      background: $bg-color;
      .mint-field {
        background: $bg-color;
        padding: 0 10px!important;
        .mint-field-core {
          background: $bg-color;
          font-size: 28px;
        }
        .mint-cell-text {
          font-size: 28px;
        }
      }
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
    ul, li {
      list-style: none;
      padding: 0 0;
      margin: 0;
    }
    ul {
      li:first-child {
        width: 250px;
        text-align: left;
      }
      li:nth-child(2), li:nth-child(4) {
        width: 138px;
        text-align: center;
      }
      li:nth-child(3) {
        width: 60px;
        text-align: right;
      }
    }
  }
  .field-item {
    .mint-cell-text {
      display: inline-block;
      min-width: 18vw;
    }
    .iconfont {
      font-size: 32px;
      color: #ccc;
    }
  }
  .invoice-table {
    .input-wrapper {
      display: inline-block;
      .mint-field-core {
        background: $bg-color;
        font-size: 20px;
      }
      &:first-child{
        width: 250px;
      }
      &:nth-child(2), &:nth-child(4) {
        width: 138px;
        .mint-cell {
          margin-left: 20px;
        }
        .mint-field-core {
          text-align: center;
        }
      }
      &:nth-child(3) {
        width: 60px;
        .mint-cell {
          padding-right: 20px;
          &:after {
            display: block;
            content: '%';
            position: absolute;
            right: 0px;
            top: 8px;
          }
        }
        .mint-field-core {
          text-align: right;
        }
      }
    }
  }
</style>
