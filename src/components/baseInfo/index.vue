<template>
  <div class="base-wrapper">
    <div class="base-title">基本信息</div>
    <div v-for="(item, index) in baseInfoList" :key="index">
      <div class="detail-items flex" v-if="(item.dataType === '05' || item.dataType === '02') && item.isShow === 'Y'">
        <span class="title-items">{{item.infoName}}</span>
        <span v-if="item.isNotEmpty === 'Y'" style="color: red">*</span>
        <input class="detail-input" v-model="baseFormData[item.arField]" :placeholder="'请输入'+item.infoName">
      </div>
      <div class="detail-items flex" v-else-if="item.dataType === '01' && item.isShow === 'Y' && item.infoId !=='CURRENCYKIND'">
        <div>
          <span class="title-items">{{item.infoName}}</span>
          <span v-if="item.isNotEmpty === 'Y'" style="color: red">*</span>
        </div>
        <input class="detail-input" v-model="baseFormData[item.arField]" :placeholder="'请输入'+item.infoName">
      </div>
      <!-- 会议计划 -->
      <div class="detail-items flex" v-else-if="item.dataType === '15' && item.isShow === 'Y'">
        <span class="title-items">{{item.infoName}}</span>
        <span v-if="item.isNotEmpty === 'Y'" style="color: red">*</span>
        <div>
          <input class="detail-input" v-model="baseFormData[item.arField]" :placeholder="'请输入'+item.infoName">
          <button type="default" class="btn-meeting" @click="toMettingPlan(item.infoId)">...</button>
        </div>
      </div>
      <!-- 开始日期和结束日期 shb -->
      <date-range v-else-if="item.dataType === '08' && (item.infoId === 'START_DATE' || item.infoId === 'END_DATE') && item.isShow === 'Y'"
      :count="1"
      :title="item.infoName"
      :default="baseFormData[item.arField]"
      :datestr="item.arField"
      :reset="ifReset"
      @changeTime="changeTime"
      v-model="baseFormData[item.arField]"
      />
      <!-- 报销日期 shb -->
      <date-range v-else-if="item.dataType === '08' && item.infoId === 'APP_DATE' && item.isShow === 'Y'"
      :count="1"
      :default="baseFormData['appDate']"
      :datestr="item.arField"
      :title="item.infoName"
      @changeTime="changeTime"
      v-model="baseFormData[item.arField]"
      />
      <!-- dataType=12 下拉框选项 -->
      <div class="detail-items flex" v-else-if="item.dataType === '12' && item.isShow === 'Y' && item.arField === 'orgCode'">
        <div>
          <span class="title-items">{{item.infoName}}</span>
          <span v-if="item.isNotEmpty === 'Y'" style="color: red">*</span>
        </div>
        <div style="position: relative">
          <input class="detail-input" :placeholder="'请输入'+item.infoName"
            v-model="baseFormData['orgName']"
            @focus="focusOrg"
            @blur="blurOrg($event)"
            @input="inputOrg(item.codeStr)">
          <div class="pay-account" v-if="ifShowOrg">
            <!--实现部门可编辑可筛选-->
            <div v-for="item in departOrg" :key="item.sourceCode" class="account-name" @touchstart="chooseDepart(item)">{{item.sourceName}}</div>
          </div>
        </div>
      </div>
      <div class="base-down" v-else-if="item.dataType === '12' && item.isShow === 'Y' && item.arField !== 'orgCode'" @change="changeAppIds(item.arField, baseFormData[item.arField])">
        <span class="title-items">{{item.infoName}}</span>
        <span v-if="item.isNotEmpty === 'Y'" style="color: red">*</span>
        <select class="selectType" dir="rtl" v-model="baseFormData[item.arField]">
          <option class="option-input" v-for="(items, index) in department[item.arField]" :key="index" :value="items.sourceCode">{{items.sourceName}}</option>
        </select>
      </div>
      <div v-else class="detail-items flex">
        <div>
          <span class="title-items">{{ item.infoName }}</span>
          <span v-if="item.isNotEmpty === 'Y'" style="color: red">*</span>
        </div>
        <input class="detail-input" :placeholder="'请选择' + item.infoName"  v-model="baseFormData[item.arField]">
      </div>
    </div>
    <popup :isShow="isShow" :meetingPlanList="meetingPlanList" :infoId="infoId"  @hideScan="hideScan"></popup>
  </div>
</template>
<script type="text/ecmascript-6">
import dateRange from '@/components/dateRange'
import { mapGetters, mapMutations } from 'vuex'
import popup from './components/Popup'
import * as Auth from '@/utils/auth'
import { watchTmp } from '@/utils/mixin.js'
import dayjs from 'dayjs'

export default {
  name: 'BaseInfo',
  mixins: [watchTmp],
  data () {
    return {
      infoId: '',
      total: '', // 综合定额
      title: '添加时间',
      diffDays: '', // 总天数
      isShow: false, // 打开会议计划组件
      ifReset: false,
      ifShowOrg: false, // 是否显示报销部门列表
      department: {}, // 报销部门信息列表
      departOrg: {},
      copyDepartment: {}, // 报销部门信息备份
      baseFormData: {},
      meetingPlanList: [], // 会议计划信息列表
      baseInfoList: [], // 基本信息列表,
      dateArr: [], // 保存日期格式
      relateWay: [] // 保存综合定额相关的数据key值
    }
  },
  components: {
    dateRange,
    popup
  },
  computed: {
    ...mapGetters(['reimburseTmpInfo', 'reimburseBillInfo'])
  },
  watch: {
    baseFormData () {
      this.CHANGEBILLINFO({ data: this.baseFormData, info: 'arBill' })
    },
    reimburseBillInfo () {
      this.fillArBill()
    }
  },
  methods: {
    ...mapMutations(['CHANGEBILLINFO', 'SAVESTANDARD']),
    fetchStandard (meetingType) {
      if (this.reimburseTmpInfo.expTypeInfo) {
        for (let key in this.reimburseTmpInfo.expTypeInfo) {
          const obj = { expenseType: key, templateCode: Auth.getStorage('templetCode') }
          if (meetingType) obj.field01 = meetingType
          this.$store.dispatch('queryTravelStandard', obj).then((data) => {
            this.SAVESTANDARD({ key: key, value: data })
          })
        }
      }
    },
    fillData () {
      this.relateWay = []
      // 平铺模式下需要先获取费对应的费用明细标准，当选中会议计划之后，根据会议/咨询计划的内容更改费用明细的对应标准
      if (this.reimburseTmpInfo.showType === '03') this.fetchStandard()
      this.baseFormData.billType = this.$route.query.billType || Auth.getStorage('billType')
      this.baseInfoList = this.reimburseTmpInfo.areaInfo[this.reimburseTmpInfo.area.BASE.areaCode]
      this.baseInfoList.forEach(item => {
        if (item.codeStr === 'days') {
          this.diffDays = item.arField
          this.relateWay.push(item.arField)
        } else if (item.codeStr === 'peopleNumber' || item.codeStr === 'quotaStandard') {
          this.relateWay.push(item.arField)
        } else if (item.codeStr === 'quotaAmount') {
          this.total = item.arField
        }
        // 保存起始日期的key值
        if (item.infoId === 'START_DATE' || item.infoId === 'END_DATE') this.dateArr.push(item.arField)
        if (item.dataType === '12' && item.arField !== 'appId') {
          let obj = {
            billType: this.$route.query.billType || Auth.getStorage('billType'),
            infoId: item.infoId,
            areaInfoCode: item.areaInfoCode
          }
          this.$store.dispatch('getDepartmentList', obj).then((data) => {
            this.$set(this.department, item.arField, data.refListData)
            if (item.arField === 'orgCode') {
              this.copyDepartment = data.refListData
              this.departOrg = data.refListData
            }
          })
        }
      })
      this.fillArBill()
    },
    fillArBill () {
      if (Object.keys(this.reimburseBillInfo).length) {
        if (this.reimburseBillInfo.arBill) {
          this.baseFormData = this.reimburseBillInfo.arBill
          if (this.baseFormData.orgCode) this.change(this.baseFormData.orgCode)
        }
      }
    },
    changeTime (obj) {
      // 对象的属性更改，监听不到，需要更改对象的引用地址
      let data = Object.assign({}, this.baseFormData, obj)
      this.baseFormData = data
      // 计算总天数和综合定额
      if (this.dateArr.length === 2 && this.dateArr.includes(Object.keys(obj)[0])) {
        // 判断起止日期是否符合标准
        const diffDays = dayjs(this.baseFormData[this.dateArr[1]]).diff(dayjs(this.baseFormData[this.dateArr[0]]), 'day') + 1
        if (diffDays <= 0) {
          this.$message('提示', '结束日期不得小于开始日期')
          this.baseFormData[this.dateArr[1]] = ''
        }
        // 设置总天数
        this.baseFormData[this.diffDays] = diffDays
        this.SAVESTANDARD({ key: 'days', value: diffDays })
        this.baseFormData[this.total] = this.baseFormData[this.relateWay[0]] * this.baseFormData[this.relateWay[1]] * this.baseFormData[this.relateWay[2]]
      }
    },
    // 获取报销人信息
    change (rgCode) {
      this.value = rgCode
      let obj = {
        orgCode: rgCode,
        billType: this.$route.query.billType || Auth.getStorage('billType'),
        areaInfoCode: 'APP_ID',
        infoId: 'APP_ID'
      }
      this.$store.dispatch('getHumanList', obj).then((res) => {
        this.$set(this.department, 'appId', res.refListData)
      })
    },
    changeAppIds (key, value) {
      if (key === 'appId' && value) {
        this.$root.Bus.$emit('changeAppId', { orgCode: this.baseFormData['orgCode'], appId: value })
      }
    },
    // 打开会议计划信息组件
    toMettingPlan (infoId) {
      let obj = {
        infoId: infoId,
        orgCode: this.value
      }
      this.infoId = infoId
      // 获取会议计划信息
      this.$store.dispatch('getMettingPlan', obj).then(res => {
        this.meetingPlanList = res.refListData
        this.isShow = true
      })
    },
    // 关闭会议计划组件
    hideScan (meetingPlan) {
      this.isShow = false
      if (!meetingPlan) return // 如果没有选中对应计划，不做如下操作
      // 根据选中的会议计划渲染其他数据
      this.baseInfoList.forEach(item => {
        if (this.reimburseTmpInfo.showType === '03') {
          // 计算参会总人数
          if (item.codeStr === 'peopleNumber') {
            this.baseFormData[item.arField] = Number(meetingPlan['repPeopleNumber']) + Number(meetingPlan['workPeopleNumber'])
            this.SAVESTANDARD({ key: 'peopleNumber', value: this.baseFormData[item.arField] })
          }
        }
        for (let key in meetingPlan) {
          if (key === item.codeStr && item.codeStr !== 'days' && item.codeStr !== 'peopleNumber') {
            this.baseFormData[item.arField] = meetingPlan[key]
            if (item.infoId === 'START_DATE') this.baseFormData[this.dateArr[1]] = meetingPlan[key]
          }
        }
      })
      if (this.reimburseTmpInfo.showType === '03') {
        // 根据会议类型/培训类型获取综合定额标准
        let type = ''
        let url = ''
        type = meetingPlan.meetingType ? meetingPlan.meetingType : meetingPlan.cultivateType
        url = meetingPlan.meetingType ? 'getRatiStandOfMeet' : 'getRatiStandOftrain'
        this.$store.dispatch(url, type).then((res) => {
          // 会议费综合定额标准
          const item = this.baseInfoList.filter(item => item.codeStr === 'quotaStandard')
          if (res[0] && res[0].quotaTotal) this.$set(this.baseFormData, [item[0].arField], res[0].quotaTotal)
        })
        this.fetchStandard(meetingPlan.meetingType || meetingPlan.cultivateType)
      }
    },
    focusOrg () {
      this.ifShowOrg = true
    },
    blurOrg (e) {
      this.ifShowOrg = false
    },
    inputOrg () {
      this.ifShowOrg = true
      const sourceName = this.baseFormData.orgName
      this.fuzzyMatch(sourceName)
    },
    // 模糊匹配
    fuzzyMatch (sourceName) {
      this.departOrg = []
      this.copyDepartment.forEach(ele => {
        if (ele.sourceName.match(sourceName)) this.departOrg.push(ele)
      })
    },
    chooseDepart (item) {
      this.baseFormData.orgName = item.sourceName
      this.baseFormData.orgCode = item.sourceCode
      this.change(item.sourceCode)
      this.ifShowAccount = false
    }
  }
}
</script>

<style lang="scss">
  .base-wrapper {
    background-color: #fff;
    padding: 48px 32px 0;
    .base-title {
      font-size: 36px;
      color: #333;
      font-weight:600;
    }
    .base-down {
      height: 105px;
      line-height: 105px;
      border-bottom: 1px solid #eee;
    }
    .time-range-wrapper {
      height: 105px;
      line-height: 105px;
      border-bottom: 1px solid #EEEEEE;
      width: 100%;
      .title {
        display: inline-flex;
        width: 200px;
        font-size:32px;
        font-weight: 400;
      }
      >div:nth-child(3) {
        display: inline-flex;
        width: 486px;
        input {
          width: 100%;
          text-align: right;
          border: none;
          font-size: 32px;
          height: 50px;
        }
      }
    }
    .selectType {
      float: right;
      width: 450px;
      height: 50px;
      margin: 25px 0;
      font-size: 32px;
      border: none;
      appearance: none;
      background: #fff;
    }
    .detail-items {
      border-bottom: 1px solid #eee;
      height: 105px;
      line-height: 105px;
      .detail-input {
        border: none;
        font-size: 32px;
        text-align: right;
        width: 360px;
        height: 50px;
      }
      .pay-account {
        max-height: 50vh;
        overflow-y: scroll;
        padding: 10px 0;
        background: #eee;
        position: absolute;
        right: 0px;
        top: 80px;
        z-index: 1000;
        text-align: right;
        .account-name {
          width: 340px;
          line-height: 50px;
          padding: 0px 30px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .btn-meeting {
      border: none;
      background: #eee;
      margin-left: 4px;
      text-align: center;
      border-radius: 2px;
    }
    .title-items {
      font-size: 32px;
    }
  }
</style>
