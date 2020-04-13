<template>
  <mt-popup
    class="reimburse-screening-wrapper"
    v-model="popupVisible"
    position="right"
    popup-transition="popup-fade"
    :modal="false"
    :closeOnClickModal="true">
    <div class="blacklog-screening">
      <!--业务模版-->
      <date-range :title="title" :reset="ifReset" @changeTime="changeTime"/>
      <div class="bill-types">
        <div class="title">单据类型
          <select v-model="params.billType" class="select flex">
            <option
              v-for="item in reimburseTypeList"
              :key="item.billType"
              :value="item.billType">{{item.billName}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="btncard">
      <mt-button type="primary" class="reset" @click="reset()">重置</mt-button>
      <mt-button type="primary" class="determine" @click="confirm()">确定</mt-button>
    </div>
  </mt-popup>
</template>
<script>
import dayjs from 'dayjs'
import dateRange from '@/components/dateRange'
import { mapGetters } from 'vuex'

export default {
  props: ['screenVisible'],
  components: {
    dateRange
  },
  data () {
    return {
      title: '单据日期',
      ifReset: false,
      popupVisible: false,
      params: {
        startDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        billType: ''
      }
    }
  },
  computed: {
    ...mapGetters(['reimburseTypeList'])
  },
  watch: {
    screenVisible () {
      this.popupVisible = this.screenVisible
    }
  },
  methods: {
    changeTime (obj) {
      Object.assign(this.params, obj)
    },
    reset () {
      this.ifReset = true
      this.params.billType = ''
    },
    confirm () {
      this.ifReset = false
      this.params.startDate = dayjs(this.params.startDate).valueOf()
      this.params.endDate = dayjs(this.params.endDate).add(1, 'day').valueOf()
      this.popupVisible = false
      if (this.popupVisible === false) {
        this.$emit('getParams', this.params)
      }
    }
  }
}
</script>
<style lang="scss">
.reimburse-screening-wrapper {
  width: 585px;
  height: 100%;
  box-sizing: border-box;
  padding: 106px 32px;
  background: #fff;
  text-align: left;
  font-family: MicrosoftYaHei;
  .select {
    width: 200px;
    height: 60px;
    border: none;
    display: inline-flex;
    background: #f4f4f4;
    padding: 5px 10px;
    margin-left: 10px;
    color: #333;
    appearance: none;
  }
  .business-type {
    width: 130px;
    height: 60px;
    padding: 0 10px;
    margin-right: 20px;
  }
  .title {
    font-size: 32px;
    color: #888;
  }
  .time-range-wrapper {
    .time-range {
      input {
        text-align: center;
        padding: 0;
      }
    }
    .title, .time-range {
      margin-bottom: 32px;
    }
  }
  .gap {
    margin: 0 13px;
  }
  .btncard {
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 100%;
    height: 8%;
    background: #fff;
    padding-left: 160px ;
    .mint-button {
      width: 180px;
      height: 64px;
      font-size: 32px;
      border-radius: 32px;
    }
    .reset {
      background: linear-gradient(270deg,rgba(86, 190, 255, 1) 0%, rgba(120, 232, 254, 1) 100%);
      margin: 22px 32px 0 0;
    }
    .determine {
      background: linear-gradient(90deg, rgba(88, 163, 252, 1) 0%,rgba(83, 160, 253, 1) 48%, rgba(114, 176, 249, 1) 100%);
    }
  }
}
@supports (bottom: env(safe-area-inset-bottom)){
  .reimburse-screening-wrapper {
    padding-top: calc(106px + env(safe-area-inset-top));
    padding-top: calc(106px + constant(safe-area-inset-top));
  }
  .btncard {
    bottom: calc(60px + constant(safe-area-inset-bottom));
    bottom: calc(60px + env(safe-area-inset-bottom));
  }
}
</style>
