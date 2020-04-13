<template>
  <mt-popup v-model="visible" :modal="false" :closeOnClickModal="true"  position="right" class="screening-wrapper">
    <div class="invoice-screening-wrapper">
      <date-range :title="title" :reset="ifReset" @changeTime="changeTime"/>
      <hr class="hr">
      <!--发票类型-->
      <check-box :title="title1" :list="invoiceTypes" :className="class1"/>
      <!--查验状态-->
      <check-box :title="title2" :list="checkState" :className="class2"/>
      <div class="title">
        添加页签
        <select v-model="tagId" class="select flex">
          <option
            v-for="item in tags"
            :key="item.id"
            :value="item.id">{{item.tagName}}</option>
        </select>
      </div>
    </div>
    <div class="btn-wrapper flex">
      <div class="btn reset" @click="reset">重置</div>
      <div class="btn confirm" @click="sure">确定</div>
    </div>
  </mt-popup>
</template>

<script>
import { invoiceType, checkState } from '@/utils/global.js'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import checkBox from '@/components/checkBox'
import dateRange from '@/components/dateRange'

export default {
  name: 'screening',
  props: ['screenVisible'],
  computed: {
    ...mapGetters(['invoiceTagList'])
  },
  components: {
    checkBox,
    dateRange
  },
  data () {
    return {
      tagId: '',
      dateStr: '',
      title: '添加时间',
      title1: '发票类型',
      title2: '查验状态',
      class1: 'bill-type',
      class2: 'status-type',
      visible: false,
      ifReset: false,
      invoiceTypes: [],
      checkState: {},
      tags: [{ id: '', tagName: '请选择' }],
      invoiceParams: {
        startDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD')
      }
    }
  },
  watch: {
    screenVisible () {
      this.visible = this.screenVisible
    }
  },
  created () {
    this.visible = this.screenVisible
    this.checkState = checkState
    this.invoiceTypes = invoiceType
    this.$store.dispatch('getTagList').then(() => {
      this.tags = this.tags.concat(this.invoiceTagList)
    })
  },
  methods: {
    changeTime (obj) {
      Object.assign(this.invoiceParams, obj)
    },
    /**
     * 获取发票日期，发票类型，查验状态
     */
    sure () {
      this.ifReset = false
      const billTypeChecked = Array.from(document.getElementsByClassName(`bill-type checked`))
      const billTypeCheckedArr = []
      const statusTypeChecked = Array.from(document.getElementsByClassName(`status-type checked`))
      const statusTypeCheckedArr = []
      billTypeChecked.forEach(item => {
        billTypeCheckedArr.push(item.getAttribute('id'))
      })
      statusTypeChecked.forEach(item => {
        statusTypeCheckedArr.push(item.getAttribute('id'))
      })
      const params = {
        tagId: this.tagId,
        startDate: dayjs(this.invoiceParams.startDate).valueOf(),
        endDate: dayjs(this.invoiceParams.endDate).add(1, 'day').valueOf(),
        invoiceType: billTypeCheckedArr,
        checkState: statusTypeCheckedArr
      }
      this.$emit('getParams', params)
      this.popupVisible = false
    },
    reset () {
      this.ifReset = true
      const checkedArr = Array.from(document.getElementsByClassName(`checked`))
      this.tagId = ''
      checkedArr.forEach(item => {
        item.classList.remove('checked')
      })
    }
  }
}
</script>

<style lang="scss">
  .screening-wrapper {
    width: 520px;
    height: 100vh;
    padding: 0 24px 0 41px;
    background-color: #fff;
    text-align: left;
    font-family:  MicrosoftYaHei;
    box-shadow: -2px 1px 10px 0px rgba(0,0,0,0.2);
    .invoice-screening-wrapper {
      height: calc(100vh-216px);
      padding: 108px 0 0;
      overflow-y: scroll;
    }
    .title {
      margin-bottom: 32px;
      font-size: 28px;
      color: #888;
    }
    .hr {
      width: 100%;
      height: 0;
      margin: 20px 0 24px;
      border: none;
      border-bottom: 1px solid #eee;
    }
    .bill-type {
      width: 164px;
      height: 86px;
      padding: 0 24px;
      margin-right: 40px;
    }
    .status-type {
      width: 130px;
      height: 60px;
      padding: 0 10px;
      margin-right: 20px;
    }
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
    .btn-wrapper {
      width: 424px;
      position: absolute;
      bottom: 82px;
      right: 24px;
    }
    .btn {
      display: inline-flex;
      width: 200px;
      height: 64px;
      border-radius: 32px;
      font-size: 32px;
      color: #fff;
      align-items: center;
      justify-content: center;
    }
    .reset {
      margin-right: 24px;
      background: linear-gradient(270deg,rgba(86,190,255,1) 0%,rgba(120,232,254,1) 100%);
    }
    .confirm {
      background: linear-gradient(90deg,rgba(88,163,252,1) 0%,rgba(83,160,253,1) 48%,rgba(114,176,249,1) 100%);
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)){
    .invoice-screening-wrapper {
      height: calc(100vh - 216px - env(safe-area-inset-top));
      height: calc(100vh - 216px - constant(safe-area-inset-top));
      padding-top: calc(108px + env(safe-area-inset-top));
      padding-top: calc(108px + constant(safe-area-inset-top));
    }
  }
</style>
