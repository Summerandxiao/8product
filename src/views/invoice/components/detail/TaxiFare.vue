<template>
  <div class="taxi-wrapper detail-wrapper">
    <nav-title :title="title" :path="path" :save="!readonly" @saveInvoice="saveInvoice(list)"></nav-title>
    <tag :tagName="list.tagName || ''" :fromPath="fromPath" :ifChange="!readonly"></tag>
    <div class="invoice">
      <div class="seal-outer">
        <div class="seal-inter"></div>
      </div>
      <div class="title">{{invoiceTitle}}</div>
      <div>
        <div class="field-item">
          <mt-field
            label="证号"
            v-if="list.invoiceNo!==undefined"
            v-model="list.invoiceNo"
            :readonly="readonly"></mt-field>
          <div class="dotted-line-1px"></div>
          <div class="date-card" v-if="list.invoiceDate !==undefined && list.invoiceDate">
            <span class="date-label">日期</span>
            <date-range :readonly="readonly" :count="1" :default="list.invoiceDate" :datestr="dateStr" @changeTime="changeTime"/>
          </div>
          <div class="time-card"
            v-if="list.getOnTime !==undefined && list.getOffTime !==undefined">
            <span class="time-label">时间</span>
            <input type="text" class="ontime" v-model="list.getOnTime" @click="toTimePicker('getOnTime')" :readonly="readonly"/>
            <span style="color:#666">—</span>
            <input type="text" class="offtime" v-model="list.getOffTime" @click="toTimePicker('getOffTime')" :readonly="readonly"/>
          </div>
          <timePicker :isShow="showTimePicker" :dateTimeStr="dateTimeStr" @change="change"></timePicker>
          <mt-field
            label="里程"
            v-if="list.distance !==undefined"
            v-model="list.distance"
            :readonly="readonly"></mt-field>
          <mt-field
            label="等候"
            v-if="list.waitTime !==undefined"
            v-model="list.waitTime"
            :readonly="readonly"></mt-field>
          <mt-field
            label="金额"
            v-if="list.totalAmount !==undefined"
            v-model="list.totalAmount"
            :readonly="readonly"></mt-field>
          <mt-field
            label="燃油附加费"
            v-if="list.fuel !==undefined"
            v-model="list.fuel"
            :readonly="readonly"></mt-field>
          <div v-if="readonly" class="line-1px"></div>
          <div v-if="readonly" class="flex show-invoice" @click="showPicture()">
            <label class="check-invoice">查看发票</label>
            <i class="iconfont icon-icon-angle-right"></i>
          </div>
          <showPicture :isShowPicture="isShowPicture" @hide="hide"></showPicture>
        </div>
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
import timePicker from '@/components/timePicker'
import navTitle from '@/components/navTitle'
import { invoice } from '@/utils/mixin.js'
import tag from '@/components/tag'
import showPicture from '@/components/showPicture'

export default {
  name: 'TaxiFare',
  components: {
    dateRange,
    timePicker,
    navTitle,
    tag,
    showPicture
  },
  mixins: [invoice],
  data () {
    return {
      readonly: false,
      showTimePicker: false,
      isShowPicture: false,
      dateTimeStr: '',
      path: 'invoice',
      fromPath: 'TaxiFare',
      dateStr: 'invoiceDate',
      title: '出租车票',
      invoiceTitle: '北京市出租汽车专用发票',
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
    this.list.invoiceDate = this.list.invoiceDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
  },
  methods: {
    changeTime (obj) {
      Object.assign(this.list, obj)
    },
    change (obj) {
      Object.assign(this.list, obj)
      this.showTimePicker = false
    },
    toTimePicker (dateTimeStr) {
      if (this.readonly) return
      this.showTimePicker = true
      this.dateTimeStr = dateTimeStr
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
@mixin card {
  margin: 0 0 36px 32px;
  padding-left: 30px;
}
@mixin label {
  display: inline-block;
  min-width: 18vw;
  margin-right: 30px;
  font-size: 32px;
  line-height: 45px;
  font-family: PingFangSC;
  font-weight: 400;
  color: #333;
}
.taxi-wrapper {
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
    background: #eee;
    font-size: 23px;
  }
  .time-card {
    line-height: 100px;
    margin-left: 32px;
    .time-label {
      @include label;
    }
    .ontime {
      border: none;
      width: 100px;
      font-size: 32px;
      color: #666;
    }
    .offtime {
      margin-left: 20px;
      border: #fff;
      width: 100px;
      font-size: 32px;
      color: #666;
    }
  }
  .date-card {
    line-height: 100px;
    margin-left: 32px;
    .date-label {
      @include label;
    }
    .invoiceDate {
      border: none;
      width: 200px;
      font-size: 32px;
      color: #666;
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
  .field-item {
    .mint-field {
      margin: 0 32px;
      padding: 0;
      .mint-cell-text {
        display: inline-block;
        min-width: 18vw;
        font-size: 32px;
        line-height: 45px;
        font-family: PingFangSC;
        font-weight: 400;
        color: #333;
      }
      .mint-cell-title {
        width: 180px;
        text-align: left;
      }
      .mintui {
        font-size: 28px;
      }
    }
  }
}
</style>
