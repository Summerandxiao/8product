<template>
  <div class="train-wrapper detail-wrapper">
    <nav-title :title="title" :path="path" :save="!readonly" @saveInvoice="saveInvoice(list)"></nav-title>
    <tag :tagName="list.tagName || ''" :fromPath="fromPath" :ifChange="!readonly"></tag>
    <div class="invoice-wrapper">
      <div class="train-message">
        <mt-field class="invoice-number" placeholder="" v-model="list['number']" :readonly="readonly"></mt-field>
        <div class="city flex">
          <mt-field class="depart-city-name" placeholder="" v-model="list['departCity']" :readonly="readonly"></mt-field>
          <div>
            <mt-field class="train-number" placeholder="" v-model="list['trainNumber']" :readonly="readonly"></mt-field>
            <div class="line">
              <div class="incline">|</div>
            </div>
          </div>
          <mt-field class="arrive-city-name" placeholder="" v-model="list['arriveCity']" :readonly="readonly"></mt-field>
        </div>
        <div class="date-wrapper flex">
          <mt-field class="leave-time" placeholder="" v-model="list['time']" :readonly="readonly"></mt-field>
        </div>
        <div class="money flex">
          ¥<mt-field class="total-amount" placeholder="" v-model="list['totalAmount']" :readonly="readonly"></mt-field>
          <mt-field class="seat-classes" placeholder="" v-model="list['seatClasses']" :readonly="readonly"></mt-field>
        </div>
        <div class="tip">限乘当次列车</div>
      </div>
      <div class="passenger-wrapper flex">
        <mt-field class="passenger-number" placeholder="" v-model="list['identityNumber']" :readonly="readonly"></mt-field>
        <mt-field class="passenger-name" placeholder="" v-model="list['passenger']" :readonly="readonly"></mt-field>
      </div>
    </div>
    <div class="flex show-invoice" v-if="readonly" @click="showPicture">
      <label class="check-invoice">查看发票</label>
      <i class="iconfont icon-icon-angle-right"></i>
    </div>
    <showPicture :isShowPicture="isShowPicture" @hide="hide"></showPicture>
  </div>
</template>

<script>
import * as Auth from '@/utils/auth'
import tag from '@/components/tag'
import navTitle from '@/components/navTitle'
import { invoice } from '@/utils/mixin.js'
import showPicture from '@/components/showPicture'

export default {
  name: 'TrainTicket',
  components: {
    tag,
    navTitle,
    showPicture
  },
  mixins: [invoice],
  data () {
    return {
      title: '火车票',
      path: 'invoice',
      fromPath: 'TrainTicket',
      isShowPicture: false,
      readonly: false,
      readonly1: true,
      dateStr: 'invoiceDate',
      list: {}
    }
  },
  created () {
    if (this.$route.query.id) this.readonly = true
    this.list = JSON.parse(Auth.getStorage('invoiceDetail'))
    if (this.$route.query && this.$route.query.tagName) {
      this.list.tagName = this.$route.query.tagName
      this.list.tagId = this.$route.query.tagId
    }
    if (this.list.invoiceDate) this.list.invoiceDate = this.list.invoiceDate.replace(/[\u4e00-\u9fa5]/g, '').replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
  },
  methods: {
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
@mixin wrapper {
   width: 622px;
   padding: 0 32px;
   background: #fff;
   border-radius: 6px;
   margin: 32px auto 20px;
}
.train-wrapper {
  .show-invoice {
    @include wrapper;
    height: 100px;
  }
  .invoice-wrapper {
    width: 686px;
    background: #fff;
    border-radius: 6px;
    margin: 32px auto 20px;
    padding-top: 16px;
    .train-message {
      padding: 0 32px;
    }
    .mint-field-core {
      line-height: inherit;
    }
    .mint-cell {
      min-height: 0
    }
    .invoice-number {
      .mint-field-core {
        color: #CC3333;
      }
    }
    .depart-city-name, .arrive-city-name {
      margin-top: 49px;
      .mint-field-core {
        width: 180px;
        text-align: left;
        font-size: 36px;
      }
    }
    .train-number {
      .mint-cell-wrapper {
        width: 200px;
      }
      .mint-field-core {
        text-align: center;
        font-size: 32px;
      }
    }
    .line {
      width: 100%;
      height: 10px;
      border-bottom: 1px solid #999;
      position: relative;
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
    .date-wrapper {
      justify-content: flex-start;
      .invoiceDate {
        width: 210px;
        font-size: 24px;
        text-align: center;
        border: none;
      }
    }
    .money {
      font-size: 36px;
      .mint-field-core {
        font-size: 36px;
      }
    }
    .leave-time {
      width: 400px;
    }
    .seat-classes {
      width: 220px;
    }
    .tip {
      font-size: 24px;
      color: #666;
    }
    .passenger-wrapper {
      width: 654px;
      height: 80px;
      padding-left: 32px;
      margin-top: 28px;
      background: #E5F4FF;
      border-radius: 0 0 6px 6px;
      .mint-cell-wrapper {
        background: #E5F4FF;
      }
      .mint-field-core {
        background: #E5F4FF;
        font-size: 28px;
      }
    }
  }
}

</style>
