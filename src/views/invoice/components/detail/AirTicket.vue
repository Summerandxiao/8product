<template>
  <div class="air-wrapper detail-wrapper">
    <nav-title :title="title" :path="path" :save="!readonly" @saveInvoice="saveInvoice(list)"></nav-title>
    <tag :tagName="list.tagName || ''" :fromPath="fromPath" :ifChange="!readonly"></tag>
    <div class="invoice">
      <div class="seal-outer">
        <div class="seal-inter"></div>
      </div>
      <div class="title">{{invoiceTitle}}</div>
      <div class="flex air-information">
        <input class="departCity" v-model="list.departCity" :readonly="readonly">
        <div class="air-card">
          <date-range v-if="list.invoiceDate!==undefined" :readonly="readonly" :count="1" :datestr="dateStr1" :default="list.invoiceDate" @changeTime="changeTime"/>
          <div class="line">
            <div class="incline">|</div>
          </div>
          <input class="flightNumber" v-model="list.flightNumber" :readonly="readonly">
        </div>
        <input class="arriveCity" v-model="list.arriveCity" :readonly="readonly">
      </div>
      <div class="air-items">
        <mt-field label="旅客姓名"
          v-if="list.passenger!==undefined" v-model="list.passenger" :readonly="readonly"></mt-field>
        <mt-field label="证件号"
          v-if="list.identityNumber !==undefined" v-model="list.identityNumber" :readonly="readonly"></mt-field>
        <mt-field label="仓位等级"
          v-if="list.seatClasses !==undefined" v-model="list.seatClasses" :readonly="readonly"></mt-field>
        <mt-field label="票价合计"
          v-if="list.totalAmount !==undefined" v-model="list.totalAmount" :readonly="readonly">
          <i :class="['iconfont',showTotal ? 'icon-icon-angle-bottom' : 'icon-icon-angle-right']" @click="toShowTotal()"></i>
        </mt-field>
        <div class="flex total" v-show="showTotal">
          <div>
            <div>票价</div>
            <input class="total-input" v-if="list.invoiceAmount !==undefined" v-model="list.invoiceAmount" :readonly="readonly">
          </div>
          <div>
            <div>民航发展基金</div>
            <input class="total-input" v-if="list.caacDevelopmentFund !==undefined" v-model="list.caacDevelopmentFund" :readonly="readonly">
          </div>
          <div>
            <div>燃油附加费</div>
            <input class="total-input" v-if="list.fuelSurcharge !==undefined" v-model="list.fuelSurcharge" :readonly="readonly">
          </div>
        </div>
        <div class="dotted-line-1px"></div>
        <div class="dateOfIssue-card">
          <label class="date-issue-label">填开日期</label>
          <date-range v-if="list.dateOfIssue!==undefined" :readonly="readonly" :count="1" :datestr="dateStr" :default="list.dateOfIssue" @changeTime="changeTime"/>
        </div>
        <mt-field label="印刷序号"
          v-if="list.serlalNumber!==undefined" v-model="list.serlalNumber" :readonly="readonly"></mt-field>
        <mt-field label="电子客票号"
          v-if="list.electronicTicketNumber!==undefined" v-model="list.electronicTicketNumber" :readonly="readonly"></mt-field>
        <mt-field label="填开单位"
          v-if="list.issuedBy!==undefined" v-model="list.issuedBy" :readonly="readonly"></mt-field>
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
import dateRange from '@/components/dateRange'
import navTitle from '@/components/navTitle'
import tag from '@/components/tag'
import { invoice } from '@/utils/mixin.js'
import showPicture from '@/components/showPicture'

export default {
  name: 'AirTicket',
  components: {
    dateRange,
    navTitle,
    showPicture,
    tag
  },
  mixins: [invoice],
  data () {
    return {
      isShowPicture: false,
      readonly: false,
      showTotal: false,
      path: 'invoice',
      fromPath: 'AirTicket',
      dateStr: 'dateOfIssue',
      dateStr1: 'invoiceDate',
      title: '机票行程单',
      invoiceTitle: '航空运输电子客票行程单',
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
    if (this.list.dateOfIssue) this.list.dateOfIssue = this.list.dateOfIssue.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
    if (this.list.invoiceDate) this.list.invoiceDate = this.list.invoiceDate.replace(/[\u4e00-\u9fa5]/g, '').replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
  },
  methods: {
    toShowTotal () {
      this.showTotal = !this.showTotal
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
.air-wrapper {
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
  .air-items .mint-cell-text {
    display: inline-block;
    min-width: 21vw;
  }
  .air-information {
    font-family: PingFangSC;
    margin: 0 77px 0px;
    .departCity, .arriveCity {
      border: none;
      width: 110px;
      font-size: 36px;
    }
    .air-card {
      text-align: center;
      .invoiceDate, .flightNumber {
        border: none;
        text-align: center;
        color:#999;
        font-size: 24px;
        width: 150px;
      }
      .line {
        width: 206px;
        height: 10px;
        border-bottom: 1px solid #999;
        position: relative;
        margin-left: 10px;
        .incline {
          color: #999;
          position: absolute;
          right: -4px;
          top: 14px;
          transform-origin: top;
          transform: rotate(135deg);
          font-size: 20px;
        }
      }
    }
  }
  .air-items{
    .total {
      margin: 0 32px 10px;
      background: #eee;
      padding: 20px;
      .total-input {
        width: 100px;
        border: none;
        margin-top: 20px;
        background: #eee;
      }
    }
    .dateOfIssue-card {
      line-height: 100px;
      margin-left: 32px;
      .date-issue-label {
        font-size: 32px;
        margin-right: 62px;
        color: #333;
      }
      .dateOfIssue {
        font-size: 32px;
        color: #666;
        border: none;
      }
    }
    .show-invoice {
      margin: 27px 32px 0;
      .check-invoice{
        font-size: 32px;
      }
    }
  }
  .iconfont {
    font-size: 24px;
  }
}
</style>
